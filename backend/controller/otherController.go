package controller

import (
	"example/backend/database"
	"example/backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPaymentMethods(c *gin.Context) {
	var providers []model.DeliveryProvider
	database.GetDB().Find(&providers)
	c.JSON(http.StatusOK, &providers)
}