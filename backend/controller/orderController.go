package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetOrders(c *gin.Context) {
	var orders []model.Order
	database.GetDB().
		Where("user_id = ?", c.Param("user_id")).
		Find(&orders)
	c.JSON(http.StatusOK, gin.H{"data": orders})
}
