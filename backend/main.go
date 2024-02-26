package main

import (
	"backend/utils"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	supa "github.com/nedpals/supabase-go"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		fmt.Println("Error loading .env file")
	}

	r := gin.Default()
	resourceManager := utils.ResourceManager{}
	supabaseKey := resourceManager.GetProperty("SUPABASE_KEY")
	supabaseUrl := resourceManager.GetProperty("SUPABASE_URL")
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// Why do we need "var res []map[string]interface{}"?
	// ===================================================
	// 1. Go needs a type for the response of the query
	// 2. The beginning "[]" defines a slice, which is just Go's way of defining a list / dynamic array
	// 3. "map[string]interface{}" is a map with string keys and interface{} values (interface{} just basically means "any type")

	// Ex: If you used a query like ... .Select("*").Single(), you would use "var res map[string]interface{}" instead since it's only one row

	// r.GET("/example-get-request", func(c *gin.Context) {
	// 	var res []map[string]interface{}
	// 	err := supabase.DB.From("TestGameEndpoints").Select("*").Execute(&res)
	// 	if err != nil {
	// 		c.JSON(http.StatusInternalServerError, gin.H{
	// 			"error": err.Error(),
	// 		})
	// 		return
	// 	}
	
	// 	c.JSON(http.StatusOK, res)
	// })

	// This endpoint retrieves all games from the TestGameEndpoints table
	r.GET("/get-all-games", func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("TestGameEndpoints").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint retrieves a single game from the TestGameEndpoints table
	r.GET("/get-one-game/:id", func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Param("id")
		err := supabase.DB.From("TestGameEndpoints").Select("*").Eq("AppID", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint creates a new game in the TestGameEndpoints table
	// tested using Thunder Client: http://localhost:8080/create-game/69/ayy/lmao
	// This is still "incomplete", since we don't know what our tables are going to end
	// up holding. easily adjustable.
	r.POST("/create-game/:id/:title/:desc", func(c *gin.Context) {
		var res []map[string]interface{}
		title := c.Param("title")
		desc := c.Param("desc")
		id := c.Param("id")
		
		err := supabase.DB.From("TestGameEndpoints").Insert(map[string]interface{}{
			"AppID": id,
			"Name": title,
			"About the game": desc,
		}).Execute(&res)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
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
		panic(err) // General server failure
	}
}