package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"sport-center-management-system/entity"
)

func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":    "ok",
		"service":   "sport-center-api",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}

func Readiness(c *gin.Context) {
	sqlDB, err := entity.DB().DB()
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status":    "error",
			"service":   "sport-center-api",
			"database":  "unavailable",
			"error":     err.Error(),
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
		return
	}

	if err := sqlDB.Ping(); err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status":    "error",
			"service":   "sport-center-api",
			"database":  "unreachable",
			"error":     err.Error(),
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":    "ok",
		"service":   "sport-center-api",
		"database":  "ok",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}
