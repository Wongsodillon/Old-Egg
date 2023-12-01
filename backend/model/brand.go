package model

type Brand struct {
	ID           uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	BrandName    string `json:"name"`
	BrandLogoURL string `json:"brand_url"`
}
