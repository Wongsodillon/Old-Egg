package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func GetFeaturedBrands(c *gin.Context) {
	var brands []model.Brand
	database.GetDB().Limit(3).Find(&brands)
	c.JSON(http.StatusOK, &brands)
}

func GetFeaturedProducts(c *gin.Context) {
	type FeaturedProducts struct {
		ProductID            uint64  `json:"product_id"`
		ProductName          string  `json:"product_name"`
		ProductStock         int     `json:"product_stock"`
		ProductPrice         float32 `json:"product_price"`
		ProductShippingPrice float32 `json:"product_shipping_price"`
		ProductRating        float32 `json:"product_rating"`
		ProductRatingCount   int     `json:"product_rating_count"`
		ProductURL           string  `json:"product_url"`
		ProductCategory      string  `json:"product_category"`
	}
	var featured []FeaturedProducts
	// database.GetDB().Joins("categories").Limit(20).Find(&featured)
	database.GetDB().Table("products").
		Select("product_id, product_name, product_stock, product_price, product_shipping_price, product_rating, product_rating_count, product_url[1] as product_url, category_name as product_category").
		Joins("JOIN categories ON categories.id = products.category_id").Order("RANDOM()").Limit(8).Find(&featured)
	c.JSON(http.StatusOK, &featured)
}

func GetSearchedProducts(c *gin.Context) {

	type RequestBody struct {
		Keyword string `json:"keyword" binding:"required"`
	}

	var requestBody RequestBody

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error parsing request body"})
		return
	}

	keyword := requestBody.Keyword

	if keyword == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No search query"})
		return
	}

	type SearchedProducts struct {
		ProductID            uint64  `json:"product_id"`
		ProductName          string  `json:"product_name"`
		ProductStock         int     `json:"product_stock"`
		ProductPrice         float32 `json:"product_price"`
		ProductShippingPrice float32 `json:"product_shipping_price"`
		ProductRating        float32 `json:"product_rating"`
		ProductRatingCount   int     `json:"product_rating_count"`
		ProductURL           string  `json:"product_url"`
		ProductShopID        uint64  `json:"product_shop_id"`
		ProductShop          string  `json:"product_shop"`
		ProductCategory      string  `json:"product_category"`
	}

	var search []SearchedProducts
	database.GetDB().Table("products").
		Select("product_id, product_name, product_stock, product_price, product_shipping_price, product_rating, product_rating_count, product_url[1] as product_url, shops.id as product_shop_id, shop_name as product_shop, category_name as product_category").
		Joins("JOIN shops ON shops.id = products.shop_id").
		Joins("JOIN categories ON categories.id = products.category_id").
		Where("LOWER(product_name) LIKE ?", "%"+keyword+"%").
		Find(&search)
	c.JSON(http.StatusOK, &search)
}

func GetProductsByShopID(c *gin.Context) {
	type ShopProducts struct {
		ProductID            uint64  `json:"product_id"`
		ProductName          string  `json:"product_name"`
		ProductStock         int     `json:"product_stock"`
		ProductPrice         float32 `json:"product_price"`
		ProductShippingPrice float32 `json:"product_shipping_price"`
		ProductRating        float32 `json:"product_rating"`
		ProductRatingCount   int     `json:"product_rating_count"`
		ProductURL           string  `json:"product_url"`
		ProductBrand         string  `json:"product_brand"`
		ProductCategoryID    uint64  `json:"product_category_id"`
		ProductCategory      string  `json:"product_category"`
	}

	var shopProducts []ShopProducts
	shopID := c.Param("id")
	database.GetDB().Table("products").
		Select("product_id, product_name, product_stock, product_price, product_shipping_price, product_rating, product_rating_count, product_url[1] as product_url, brand_logo_url as product_brand, category_id as product_category_id, category_name as product_category").
		Joins("JOIN brands ON brands.id = products.brand_id").
		Joins("JOIN categories ON categories.id = products.category_id").
		Where("shop_id = ?", shopID).
		Find(&shopProducts)
	c.JSON(http.StatusOK, &shopProducts)
}

func GetProductByID(c *gin.Context) {
	c.Param("id")
	type DetailBody struct {
		ProductID            uint64         `json:"product_id"`
		ProductName          string         `json:"product_name"`
		ProductStock         int            `json:"product_stock"`
		ProductPrice         float32        `json:"product_price"`
		ProductShippingPrice float32        `json:"product_shipping_price"`
		ProductRating        float32        `json:"product_rating"`
		ProductRatingCount   int            `json:"product_rating_count"`
		ProductURL           pq.StringArray `json:"product_url" gorm:"type:text[]"`
		ProductShopID        uint64         `json:"product_shop_id"`
		ProductShop          string         `json:"product_shop"`
		ProductCategoryID    uint64         `json:"product_category_id"`
		ProductCategory      string         `json:"product_category"`
		ProductBrand         string         `json:"product_brand"`
		ProductBrandURL      string         `json:"product_brand_url"`
	}

	var detail DetailBody

	err := database.GetDB().Table("products").
		Joins("JOIN shops ON shops.id = products.shop_id").
		Joins("JOIN categories ON categories.id = products.category_id").
		Joins("JOIN brands ON brands.id = products.brand_id").
		Select("products.product_id as product_id, product_name, product_stock, product_price, product_shipping_price, product_rating, product_rating_count, product_url, shops.id as product_shop_id, shop_name as product_shop, category_id as product_category_id, category_name as product_category, brand_name as product_brand, brand_logo_url as product_brand_url").
		Where("products.product_id = ?", c.Param("id")).
		First(&detail).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, &detail)

}
