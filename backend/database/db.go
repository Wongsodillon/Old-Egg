// database/database.go

package database

import (
	"example/backend/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetDB() *gorm.DB {
	if db == nil {
		dsn := "user=postgres password=postgres dbname=master port=5432 sslmode=disable TimeZone=Asia/Bangkok"
		newDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic(err)
		}
		db = newDB
		db.AutoMigrate(&model.User{})
		db.AutoMigrate(&model.Category{})
		db.AutoMigrate(&model.Brand{})
		db.AutoMigrate(&model.Shop{})
		db.AutoMigrate(&model.Product{})
		db.AutoMigrate(&model.ShopReview{})
		db.AutoMigrate(&model.Wishlist{})
		db.AutoMigrate(&model.WishlistDetail{})
		db.AutoMigrate(&model.Cart{})
		db.AutoMigrate(&model.Address{})
		db.AutoMigrate(&model.DeliveryProvider{})
		db.AutoMigrate(&model.Order{})
		db.AutoMigrate(&model.OrderDetail{})
	}
	return db
}
