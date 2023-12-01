package model

type DeliveryProvider struct {
	ID   uint   `gorm:"primary_key" json:"id"`
	Name string `json:"name"`
	Days int    `json:"days"`
	Multiplier float64 `json:"multiplier"`
}
