package model

type Address struct {
	ID      uint   `gorm:"primary_key" json:"id"`
	UserID  uint   `json:"user_id"`
	Title  string `json:"title"`
	Street  string `json:"street"`
	ZipCode string `json:"zip_code"`
	City    string `json:"city"`
	Country string `json:"country"`
}
