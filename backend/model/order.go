package model

import (
	"time"
)

type Order struct {
	ID          uint64    `gorm:"primary_key;auto_increment" json:"id"`
	UserID      uint64    `json:"user_id"`
	InvoiceCode string    `json:"invoice_code"`
	OrderDate   time.Time `json:"order_date" gorm:"default:current_timestamp"`
	Status      bool      `json:"status"`
}

type OrderDetail struct {
	OrderID   uint64 `json:"order_id"`
	ProductID uint64 `json:"product_id"`
}
