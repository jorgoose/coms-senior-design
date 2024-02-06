package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Run server
func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	// Use http.ListenAndServeTLS() instead of r.Run(), use files
	r.RunTLS(":443", "cert.pem", "key.pem")
}
