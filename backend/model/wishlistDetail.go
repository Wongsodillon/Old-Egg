package model

import (
	"time"
)

type WishlistDetail struct {
	WishlistID uint64    `json:"wishlist_id"`
	ProductID  uint64    `json:"product_id"`
	Quantity   int       `json:"quantity"`
	DateAdded  time.Time `json:"date_added" gorm:"default:current_timestamp"`
}
