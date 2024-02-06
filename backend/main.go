package main

import (
	"github.com/gin-gonic/gin"
)

// Run server
func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.RunTLS(":8080", "cert.pem", "key.pem")
}
