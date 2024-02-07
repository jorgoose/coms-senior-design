package main

import (
	"github.com/gin-gonic/gin"
)

// Run server with (unsigned) certificate w/ perm and key
func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong, please just work ;[",
		})
	})
	
	r.RunTLS(":8080", "cert.pem", "key.pem")
}
