package model

type ShopReview struct {
	ID              uint64  `gorm:"primaryKey;autoIncrement" json:"id"`
	ShopID          uint64  `json:"shop_id"`
	UserID          uint64  `json:"user_id"`
	Review          string  `json:"review"`
	Title           string  `json:"title"`
	Rating          float32 `json:"rating"`
	OntimeDelivery  float32 `json:"ontime_delivery"`
	ProductAccuracy float32 `json:"product_accuracy"`
	Satisfaction    float32 `json:"satisfaction"`
	Date            string  `json:"date"`
}
