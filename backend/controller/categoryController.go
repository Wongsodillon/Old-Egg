package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func createCategory(c *gin.Context) {
	var category model.Category
	if err := c.BindJSON(&category); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.GetDB().Create(&category)
	c.JSON(http.StatusOK, gin.H{"data": category})
}

func GetCategories(c *gin.Context) {
	var categories []model.Category
	if err := database.GetDB().Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving categories"})
		return
	}

	c.JSON(http.StatusOK, categories)
}
