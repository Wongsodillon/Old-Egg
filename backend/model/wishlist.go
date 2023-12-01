package model

import (
	"time"

	"github.com/lib/pq"
)

type Wishlist struct {
	ID                  uint64        `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID              uint64        `json:"user_id"`
	WishlistName        string        `json:"wishlist_name"`
	Privacy             string        `json:"privacy"`
	WishlistRating      float32       `json:"wishlist_rating"`
	WishlistRatingCount int           `json:"wishlist_rating_count"`
	CreatedAt           time.Time     `json:"created_at" gorm:"default:current_timestamp"`
	Followers           pq.Int32Array `json:"followers" gorm:"type:int[]"`
}
