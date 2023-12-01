package model

type User struct {
	ID          uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}
