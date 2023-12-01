package model

type Shop struct {
	ID            uint64  `gorm:"primaryKey;autoIncrement" json:"id"`
	ShopName      string  `json:"name"`
	ShopAboutUs   string  `json:"about_us"`
	ShopEmail     string  `json:"email"`
	ShopBannerURL string  `json:"shop_banner_url"`
	ShopSales     int     `json:"sales"`
	ShopRating    float32 `json:"rating"`
	ShopRatingCount int   `json:"rating_count"`
	Followers     int     `json:"followers"`
	ShopURL       string  `json:"shop_url"`
	OntimeDelivery float32 `json:"ontime_delivery"`
	ProductAccuracy float32 `json:"product_accuracy"`
	Satisfaction float32 `json:"satisfaction"`
}
