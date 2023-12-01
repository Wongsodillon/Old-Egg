package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var user model.User
	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to hash password"})
		return
	}

	// validate unique email
	var existingUserEmail model.User
	if err := database.GetDB().Where("email = ?", user.Email).Find(&existingUserEmail).Error; err == nil {
		c.String(http.StatusOK, "Email already exists")
		return
	}

	var existingUserPhone model.User
	if err := database.GetDB().Where("phone_number = ?", user.PhoneNumber).Find(&existingUserPhone).Error; err == nil {
		c.String(http.StatusOK, "Phone number already exists")
		return
	}

	user.Password = string(hashedPassword)

	// database.GetDB().Create(&user)
	c.JSON(http.StatusOK, gin.H{"datas": user})
}

func Login(c *gin.Context) {
	var loginRequest model.Credential
	if err := c.BindJSON(&loginRequest); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user model.User
	if err := database.GetDB().Where("email = ?", loginRequest.Email).First(&user).Error; err != nil {
		c.String(400, "Email doesn't exist")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password)); err != nil {
		c.String(400, "Invalid password")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.String(500, "Unable to generate token")
		return
	}

	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", true, true)

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func GetUserFromJWT(c *gin.Context) {
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.String(http.StatusUnauthorized, tokenString)
		return
	}

	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET")), nil
	})

	if err != nil {
		c.String(http.StatusUnauthorized, "Error parsing token")
		return
	}

	var user model.User
	database.GetDB().Find(&user, "id = ?", claims["id"])
	c.JSON(http.StatusOK, user)
}

func GetUserAddress(c *gin.Context) {

	var address []model.Address

	err := database.GetDB().Where("user_id = ?", c.Param("id")).Find(&address).Error
	if err != nil {
		c.String(http.StatusBadRequest, "Unable to get address")
		return
	}

	c.JSON(http.StatusOK, address)
}