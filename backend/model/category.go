package model

type Category struct {
	ID   uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	CategoryName string `json:"category_name"`
}
