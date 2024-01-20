// main.go

package main

import (
	"example/backend/controller"
	"example/backend/database"
	"example/backend/model"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var db *gorm.DB = database.GetDB()

func getUsers(c *gin.Context) {
	var users []model.User
	db.Find(&users)
	c.JSON(http.StatusOK, &users)
}

// func tempSeeding() {
// 	categories := []model.Category{
// 		{Name: "Components & Storage"},
// 		{Name: "Computer Systems"},
// 		{Name: "Computer Peripherals"},
// 		{Name: "Electronics"},
// 		{Name: "Gaming"},
// 		{Name: "Software & Services"},
// 		{Name: "Office Solutions"},
// 		{Name: "Automotive & Industrial"},
// 		{Name: "Home & Tools"},
// 		{Name: "Health & Sports"},
// 		{Name: "Apparel & Accessories"},
// 		{Name: "Toys, Drones & Maker"},
// 	}

// 	for _, category := range categories {
// 		db.Create(&category)
// 	}

// 	db.Create(&model.Category{Name: "Components & Storage"})
// }

func main() {
	config := cors.DefaultConfig()
	router := gin.Default()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowCredentials = true
	router.Use(cors.New(config))
	// router.Use(func(c *gin.Context) {
	// 	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	// 	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	// 	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	// 	c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, Authorization")
	// 	c.Next()
	// })
	// tempSeeding()
	router.GET("/users", getUsers)
	router.POST("/users", controller.CreateUser)
	router.GET("/getauth", controller.GetUserFromJWT)
	router.POST("/login", controller.Login)
	router.GET("/categories", controller.GetCategories)
	router.GET("/logout", controller.Logout)
	router.POST("/search-products", controller.GetSearchedProducts)
	router.GET("/featured-brands", controller.GetFeaturedBrands)
	router.GET("/featured-products", controller.GetFeaturedProducts)
	router.GET("/product/:id", controller.GetProductByID)
	router.GET("/shop/:id", controller.GetShopByID)
	router.GET("/shop-products/:id", controller.GetProductsByShopID)
	router.GET("/shop-categories/:id", controller.GetCategoriesForShop)
	router.GET("/shop-reviews/:id", controller.GetShopReview)
	router.GET("/my-wishlist/:id", controller.GetUserWishlist)
	router.GET("/public-wishlist/:id", controller.GetPublicWishlist)
	router.GET("/followed-wishlist/:id", controller.GetFollowedWishlist)
	router.GET("/wishlist-detail/:id", controller.GetWishlistDetail)
	router.POST("/follow-wishlist/:id/:user_id", controller.FollowWishlist)
	router.POST("/unfollow-wishlist/:id/:user_id", controller.UnfollowWishlist)
	router.DELETE("/remove-product-from-wishlist/:id/:product_id", controller.RemoveProductFromWishlist)
	router.GET("/duplicate-wishlist/:id/:user_id", controller.DuplicateWishlist)
	router.POST("/create-wishlist", controller.CreateWishlist)
	router.POST("/add-product-to-wishlist", controller.AddProductToWishlist)
	router.GET("/get-cart/:id", controller.GetUserCart)
	router.DELETE("/remove-product-from-cart/:user_id/:product_id", controller.RemoveProductFromCart)
	router.DELETE("/remove-all-products-from-cart/:user_id", controller.RemoveAllProductsFromCart)
	router.POST("/add-to-cart", controller.AddToCart)
	router.DELETE("/remove-all-products-from-wishlist/:id", controller.RemoveAllProductsFromWishlist)
	router.GET("/get-address/:id", controller.GetUserAddress)
	router.GET("/delivery-providers", controller.GetPaymentMethods)
	router.GET("/get-orders/:user_id", controller.GetOrders)
	router.Run("localhost:8080")
}
