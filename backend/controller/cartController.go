package controller

import (
	"example/backend/database"
	"example/backend/model"

	"github.com/gin-gonic/gin"
)

type CartBody struct {
	UserID               string  `json:"user_id"`
	ProductID            string  `json:"product_id"`
	ProductName          string  `json:"product_name"`
	ProductPrice         float64 `json:"product_price"`
	ProductShippingPrice float64 `json:"shipping_price"`
	ProductURL           string  `json:"product_url"`
	Quantity             int     `json:"quantity"`
}

func GetUserCart(c *gin.Context) {
	var cart []CartBody
	err := database.GetDB().Table("carts").
		Joins("JOIN products ON products.product_id = carts.product_id").
		Select("user_id, products.product_id as product_id, product_name, product_price, product_shipping_price, product_url[1] as product_url, quantity").
		Where("user_id = ?", c.Param("id")).
		Find(&cart).Error
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, cart)
}

func RemoveProductFromCart(c *gin.Context) {
	err := database.GetDB().Table("carts").
		Where("user_id = ? AND product_id = ?", c.Param("user_id"), c.Param("product_id")).
		Delete(nil).Error
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.String(200, "Product removed from cart")
}

func RemoveAllProductsFromCart(c *gin.Context) {
	err := database.GetDB().Table("carts").
		Where("user_id = ?", c.Param("user_id")).
		Delete(nil).Error
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.String(200, "All products removed from cart")
}

func AddToCart(c *gin.Context) {
	var cart model.Cart
	if err := c.ShouldBindJSON(&cart); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err := database.GetDB().Table("carts").
		Create(&cart).Error
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.String(200, "Product added to cart")
}