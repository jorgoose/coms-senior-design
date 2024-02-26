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

	// This endpoint deletes a game in the TestGameEndpoints table
	// tested using Thunder Client: http://localhost:8080/delete-game/69
	// This runs based off of the AppID, which frontend needs to somehow obtain.
	// Or we just use title since title will always be unique, but then we have to
	// deal with spaces and stuff. :(
	r.DELETE("/delete-game/:id", func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Param("id")

		err := supabase.DB.From("TestGameEndpoints").Delete().Eq("AppID", id).Execute(&res)
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