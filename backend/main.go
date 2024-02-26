package main

import (
	"backend/utils"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"
)

// go run .

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

	r.GET("/example-get-request", func(c *gin.Context) {
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

	r.GET("/request/:collum", func(c *gin.Context) {
		collum := c.Param("collum")
		var res []map[string]interface{}
		err := supabase.DB.From("TestGameEndpoints").Select(collum).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	r.GET("/requestgame/:AppID", func(c *gin.Context) {
		id := c.Param("AppID")
		var res []map[string]interface{}
		err := supabase.DB.From("TestGameEndpoints").Select().Eq("AppID", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	r.POST("/sendgame", func(c *gin.Context) {
		var res []map[string]interface{}

		var game GameBody

		// Parse JSON data from the request body | works
		if err := c.BindJSON(&game); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Insert the parsed JSON data into the Supabase database
		insertResult := supabase.DB.From("TestGameEndpoints").Insert(map[string]interface{}{
			"AppID":                      game.AppID,
			"Name":                       game.Name,
			"Release date":               game.Release_date,
			"Estimated owners":           game.Estimated_owners,
			"Peak CCU":                   game.Peak_CCU,
			"Required age":               game.Required_age,
			"Price":                      game.Price,
			"DLC count":                  game.DLC_count,
			"About the game":             game.About_the_game,
			"Supported languages":        game.Supported_languages,
			"Full audio languages":       game.Full_audio_languages,
			"Reviews":                    game.Reviews,
			"Header image":               game.Header_image,
			"Website":                    game.Website,
			"Support url":                game.Support_url,
			"Support email":              game.Support_email,
			"Windows":                    game.Windows,
			"Mac":                        game.Mac,
			"Linux":                      game.Linux,
			"Metacritic score":           game.Metacritic_score,
			"Metacritic url":             game.Metacritic_url,
			"User score":                 game.User_score,
			"Positive":                   game.Positive,
			"Negative":                   game.Negative,
			"Score rank":                 game.Score_rank,
			"Achievements":               game.Achievements,
			"Recommendations":            game.Recommendations,
			"Notes":                      game.Notes,
			"Average playtime forever":   game.Average_playtime_forever,
			"Average playtime two weeks": game.Average_playtime_two_weeks,
			"Median playtime forever":    game.Median_playtime_forever,
			"Median playtime two weeks":  game.Median_playtime_two_weeks,
			"Developers":                 game.Developers,
			"Publishers":                 game.Publishers,
			"Categories":                 game.Categories,
			"Genres":                     game.Genres,
			"Tags":                       game.Tags,
			"Screenshots":                game.Screenshots,
			"Movies":                     game.Movies,
		}).Execute(&res)

		if insertResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": insertResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	r.DELETE("/deletegame/:AppID", func(c *gin.Context) {
		var res []map[string]interface{}

		id := c.Param("AppID")

		// delete the parsed JSON data into the Supabase database
		deleteResult := supabase.DB.From("TestGameEndpoints").Delete().Eq("AppID", id).Execute(&res)

		if deleteResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": deleteResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	r.PUT("/updategame/:id/:collum/:value", func(c *gin.Context) {
		var res []map[string]interface{}

		// Get the ID from the URL parameter
		id := c.Param("id")
		collum := c.Param("collum")
		value := c.Param("value")

		// Update the specified record in the Supabase database
		updateResult := supabase.DB.From("TestGameEndpoints").Update(map[string]interface{}{
			collum: value, // Update
		}).Eq("AppID", id).Execute(&res)

		if updateResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": updateResult.Error(),
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
