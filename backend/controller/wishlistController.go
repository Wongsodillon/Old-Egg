package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

type WishlistBody struct {
	ID           int            `json:"id"`
	WishlistName string         `json:"name"`
	UserName     string         `json:"user_name"`
	Privacy      string         `json:"privacy"`
	ProductID    pq.Int32Array  `json:"product_id" gorm:"type:int[]"`
	ProductName  pq.StringArray `json:"product_name" gorm:"type:text[]"`
	ProductURL   pq.StringArray `json:"product_url" gorm:"type:text[]"`
	TotalPrice   float64        `json:"total_price"`
	CreatedAt    time.Time      `json:"created_at"`
}

type WishlistDetailBody struct {
	ID                   int           `json:"id"`
	WishlistName         string        `json:"name"`
	UserID               int           `json:"user_id"`
	UserName             string        `json:"user_name"`
	Privacy              string        `json:"privacy"`
	Followers            int           `json:"followers"`
	FollowerList         pq.Int32Array `json:"follower_list" gorm:"type:int[]"`
	ProductID            int           `json:"product_id"`
	ProductName          string        `json:"product_name"`
	ProductURL           string        `json:"product_url"`
	ProductPrice         float64       `json:"product_price"`
	ProductShippingPrice float64       `json:"product_shipping_price"`
	ProductRating        float64       `json:"product_rating"`
	ProductRatingCount   int           `json:"product_rating_count"`
	BrandName            string        `json:"brand_name"`
	BrandURL             string        `json:"brand_url"`
	Quantity             int           `json:"quantity"`
	DateAdded            string        `json:"date_added"`
}

func GetUserWishlist(c *gin.Context) {
	var myWishlist []WishlistBody

	var user_id = c.Param("id")

	err := database.GetDB().Table("users").
		Joins("LEFT JOIN wishlists ON users.id = wishlists.user_id").
		Joins("LEFT JOIN wishlist_details ON wishlists.id = wishlist_details.wishlist_id").
		Joins("LEFT JOIN products ON wishlist_details.product_id = products.product_id").
		Group("wishlists.id, wishlists.wishlist_name, users.name").
		Select("wishlists.id as id, wishlist_name, privacy, users.name as user_name, ARRAY_REMOVE(ARRAY_AGG(products.product_id), NULL) as product_id, ARRAY_REMOVE(ARRAY_AGG(product_name), NULL) as product_name, ARRAY_REMOVE(ARRAY_AGG(product_url[1]), NULL) as product_url, SUM(product_price) as total_price").
		Where("users.id = ?", user_id).Find(&myWishlist).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wishlist not found!"})
		return
	}

	c.JSON(http.StatusOK, &myWishlist)
}

func GetPublicWishlist(c *gin.Context) {
	var publicWishlist []WishlistBody

	database.GetDB().Table("users").
		Joins("JOIN wishlists ON users.id = wishlists.user_id").
		Joins("LEFT JOIN wishlist_details ON wishlists.id = wishlist_details.wishlist_id").
		Joins("JOIN products ON wishlist_details.product_id = products.product_id").
		Group("wishlists.id, wishlists.wishlist_name, users.name").
		Select("wishlists.id as id, wishlist_name, privacy, users.name as user_name, ARRAY_AGG(products.product_id) as product_id, ARRAY_AGG(products.product_name) as product_name, ARRAY_AGG(products.product_url[1]) as product_url, SUM(products.product_price) as total_price, created_at").
		Where("wishlists.privacy = ?", "Public").
		Where("users.id != ?", c.Param("id")).
		Order("created_at DESC").
		Find(&publicWishlist)

	c.JSON(http.StatusOK, &publicWishlist)
}

func GetFollowedWishlist(c *gin.Context) {
	var followedWishlist []WishlistBody

	database.GetDB().Table("users").
		Joins("JOIN wishlists ON users.id = wishlists.user_id").
		Joins("LEFT JOIN wishlist_details ON wishlists.id = wishlist_details.wishlist_id").
		Joins("JOIN products ON wishlist_details.product_id = products.product_id").
		Group("wishlists.id, wishlists.wishlist_name, users.name").
		Select("wishlists.id as id, wishlist_name, privacy, users.name as user_name, ARRAY_AGG(products.product_id) as product_id, ARRAY_AGG(products.product_name) as product_name, ARRAY_AGG(products.product_url[1]) as product_url, SUM(products.product_price) as total_price").
		Where("? = ANY(followers)", c.Param("id")).
		Find(&followedWishlist)

	c.JSON(http.StatusOK, &followedWishlist)
}

func GetWishlistDetail(c *gin.Context) {
	var wishlistDetail []WishlistDetailBody

	database.GetDB().Table("users").
		Joins("JOIN wishlists ON users.id = wishlists.user_id").
		Joins("JOIN wishlist_details ON wishlists.id = wishlist_details.wishlist_id").
		Joins("JOIN products ON wishlist_details.product_id = products.product_id").
		Joins("JOIN brands ON products.brand_id = brands.id").
		Select("wishlists.id as id, wishlist_name, users.id as user_id, users.name as user_name, privacy, followers as follower_list, CARDINALITY(followers) as followers, products.product_id as product_id, product_name, product_url[1] as product_url, product_price, product_shipping_price, product_rating, product_rating_count, brand_name, brand_logo_url as brand_url, quantity, date_added").
		Where("wishlists.id = ?", c.Param("id")).Find(&wishlistDetail)

	c.JSON(http.StatusOK, &wishlistDetail)
}

func FollowWishlist(c *gin.Context) {
	var wishlist model.Wishlist
	if err := database.GetDB().First(&wishlist, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wishlist not found!"})
		return
	}

	user_id, err := strconv.ParseInt(c.Param("user_id"), 10, 32)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse user_id"})
		return
	}

	wishlist.Followers = append(wishlist.Followers, int32(user_id))

	if err := database.GetDB().Save(&wishlist).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to update wishlist"})
		return
	}

	c.String(http.StatusOK, "Successfully followed wishlist")
}

func UnfollowWishlist(c *gin.Context) {
	var wishlist model.Wishlist
	if err := database.GetDB().First(&wishlist, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wishlist not found!"})
		return
	}

	user_id, err := strconv.ParseInt(c.Param("user_id"), 10, 32)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse user_id"})
		return
	}

	index := -1
	for i, id := range wishlist.Followers {
		if id == int32(user_id) {
			index = i
			break
		}
	}

	if index != -1 {
		wishlist.Followers = append(wishlist.Followers[:index], wishlist.Followers[index+1:]...)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found in followers"})
		return
	}

	if err := database.GetDB().Save(&wishlist).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to update wishlist"})
		return
	}

	c.String(http.StatusOK, "Successfully unfollowed wishlist")
}

func RemoveProductFromWishlist(c *gin.Context) {
	var wishlist model.Wishlist
	if err := database.GetDB().First(&wishlist, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wishlist not found!"})
		return
	}

	wishlist_id, err := strconv.ParseInt(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse wishlist_id"})
		return
	}

	product_id, err := strconv.ParseInt(c.Param("product_id"), 10, 32)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse product_id"})
		return
	}

	database.GetDB().Delete(&model.WishlistDetail{}, "wishlist_id = ? AND product_id = ?", wishlist_id, product_id)

	c.String(http.StatusOK, "Successfully removed product from wishlist")
}

func DuplicateWishlist(c *gin.Context) {
	user_id, err := strconv.ParseUint(c.Param("user_id"), 10, 64)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse user_id"})
		return
	}

	wishlist_id, err := strconv.ParseInt(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse wishlist_id"})
		return
	}

	var wishlist model.Wishlist
	var user model.User
	var wishlist_details []model.WishlistDetail
	var last model.Wishlist

	database.GetDB().
		Order("id desc").
		First(&last)

	database.GetDB().First(&wishlist, wishlist_id)
	database.GetDB().First(&user, user_id)
	database.GetDB().Table("wishlist_details").Where("wishlist_id = ?", wishlist_id).Find(&wishlist_details)

	for i := 0; i < len(wishlist_details); i++ {
		wishlist_details[i].DateAdded = time.Now()
		wishlist_details[i].WishlistID = last.ID + 1
	}

	duplicate := model.Wishlist{
		ID:                  last.ID + 1,
		UserID:              user_id,
		WishlistName:        wishlist.WishlistName,
		Privacy:             "Public",
		WishlistRating:      0,
		WishlistRatingCount: 0,
		CreatedAt:           time.Now(),
		Followers:           []int32{},
	}

	if err := database.GetDB().Create(&duplicate).Error; err != nil {
		c.String(http.StatusInternalServerError, "Failed to duplicate wishlist")
	}

	if err := database.GetDB().Create(&wishlist_details).Error; err != nil {
		c.String(http.StatusInternalServerError, "Failed to duplicate wishlist")
	}

	c.JSON(http.StatusOK, gin.H{"data": duplicate, "details": wishlist_details})
}

func CreateWishlist(c *gin.Context) {
	var wishlist model.Wishlist

	if err := c.BindJSON(&wishlist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var last model.Wishlist

	database.GetDB().
		Order("id desc").
		First(&last)

	wishlist.ID = last.ID + 1
	wishlist.CreatedAt = time.Now()

	if err := database.GetDB().Create(&wishlist).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create wishlist"})
		return
	}

	c.JSON(http.StatusOK, "Created a new wishlist")
}

func AddProductToWishlist(c *gin.Context) {
	var item model.WishlistDetail

	if err := c.BindJSON(&item); err != nil {
		c.String(http.StatusBadRequest, "cant bind json")
		return
	}

	err := database.GetDB().Create(&item).Error
	if err != nil {
		c.String(http.StatusInternalServerError, "Can't add product to wishlist")
		return
	}

	c.JSON(http.StatusOK, "Successfully added product to wishlist")
}

func RemoveAllProductsFromWishlist(c *gin.Context) {
	wishlist_id, err := strconv.ParseInt(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse wishlist_id"})
		return
	}

	database.GetDB().Delete(&model.WishlistDetail{}, "wishlist_id = ?", wishlist_id)

	c.String(http.StatusOK, "Successfully removed all products from wishlist")
}