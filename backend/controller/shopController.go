package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetShopByID(c *gin.Context) {
	var shop model.Shop
	shopID := c.Param("id")
	database.GetDB().Where("id = ?", shopID).First(&shop)
	c.JSON(http.StatusOK, &shop)
}

func GetCategoriesForShop(c *gin.Context) {
	type body struct {
		ProductID       uint64 `json:"product_id"`
		ProductName     string `json:"product_name"`
		ProductURL      string `json:"product_url"`
		ProductCategory string `json:"product_category"`
	}

	var products []body
	database.GetDB().Table("products").
    Joins("JOIN categories ON categories.id = products.category_id").
    Joins("JOIN shops ON shops.id = products.shop_id").
    Select("DISTINCT ON (categories.id) products.product_id as product_id, product_name, product_url[1] as product_url, category_name as product_category").
    Where("shops.id = ?", c.Param("id")).
		Order("categories.id, products.product_id DESC").
    Find(&products)
	
	c.JSON(http.StatusOK, &products)

}

func GetShopReview(c *gin.Context) {
	type ShopReviewResponse struct {
		model.ShopReview
		UserName string `json:"user_name"`
	}
	var shopReviewResponse []ShopReviewResponse
	database.GetDB().Table("users").
	Joins("JOIN shop_reviews ON shop_reviews.user_id = users.id").
	Joins("JOIN shops ON shops.id = shop_reviews.shop_id").
	Select("users.name as user_name, shop_reviews.*").
	Where("shops.id = ?", c.Param("id")).
	Find(&shopReviewResponse)
	c.JSON(http.StatusOK, &shopReviewResponse)
}