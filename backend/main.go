package main

import (
	"backend/utils"
	"fmt"
	"context"
	"net/http"
	"github.com/gin-gonic/gin"
 	supa "github.com/nedpals/supabase-go"
)


func main() {
	r := gin.Default()
	resourceManager := utils.ResourceManager{};
	supabaseKey := resourceManager.GetProperty("SUPABASE_KEY")
	supabaseUrl := resourceManager.GetProperty("SUPABASE_URL")
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)


	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong, plus sweet this is actually deploying live now",
		})
	})

	r.GET("/getAllGames", func(c *gin.Context) {
		var allGames map[string]interface{}
		err := supabase.DB.from("TestGameEndpoints").Select("*").Execute(&allGames)
		if err != nil {
			panic(err)
		}
		c.JSON(200, allGames)
		fmt.Println(allGames)
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

	if err := srv.ListenAndServeTLS("cert.pem", "key.pem"); err != nil && err != http.ErrServerClosed {
		panic(err)
	}
}


