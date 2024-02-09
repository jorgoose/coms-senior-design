package main

import (
	"backend/utils"
	"fmt"
	"context"
	"net/http"
	"github.com/gin-gonic/gin"
)

type Config struct {
	supabaseKey string
	supabaseURL string
}

func main() {
	r := gin.Default()
	resourceManager := utils.ResourceManager{};
	msg := resourceManager.GetProperty("SUPABASE_KEY")
	fmt.Printf("%s", msg)
	// config := ReadConfig()
	// fmt.Printf("%s: %s\n", config.supabaseKey, config.supabaseURL)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong, plus sweet this is actually deploying live now",
		})
	})

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	r.GET("/shutdown", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "shutting down",
		})
		go func() {
			if err := srv.Shutdown(context.Background()); err != nil {
				panic(err) // failure/timeout shutting down the server gracefully
			}
		}()
	})

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		panic(err)
	}
}


