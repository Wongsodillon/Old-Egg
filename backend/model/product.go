package model

import (
	"github.com/lib/pq"
)

type Product struct {
	ProductID            uint64         `gorm:"primaryKey;autoIncrement" json:"id"`
	ProductName          string         `json:"product_name"`
	ProductStock         int            `json:"product_stock"`
	ProductPrice         float32        `json:"product_price"`
	ProductShippingPrice float32        `json:"product_shipping_price"`
	ProductRating        float32        `json:"product_rating"`
	ProductRatingCount   int            `json:"product_rating_count"`
	ProductURL           pq.StringArray `json:"product_url" gorm:"type:text[]"`
	ShopID               uint64         `json:"shop_id"`
	BrandID              uint64         `json:"brand_id"`
	CategoryID           uint64         `json:"category_id"`
	ProductCategory      Category       `gorm:"foreignKey:CategoryID"`
}
