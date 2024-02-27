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

	// This endpoint retrieves a single column from the TestGameEndpoints table
	// localhost:8080/request/AppID
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

	// This endpoint gets collum for
	r.GET("/request/:sele/:collum/:equal", func(c *gin.Context) {
		sele := c.Param("select")
		collum := c.Param("collum")
		equal := c.Param("equal")
		
		var res []map[string]interface{}
		err := supabase.DB.From("TestGameEndpoints").Select(sele).Eq(collum, equal).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint retrieves a single game from the TestGameEndpoints table
	// localhost:8080/get-one-game/80
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

	// This endpoint retrieves a single game from the TestGameEndpoints table
	// localhost:8080/requestgame/80
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

	// This endpoint sends a game to the TestGameEndpoints table

	r.POST("/sendgame", func(c *gin.Context) {
		var res []map[string]interface{}

		var game GameBody

		// Parse JSON data from the request body |
		if err := c.BindJSON(&game); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Insert the parsed JSON data into the Supabase database | works
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
			"AppID":          id,
			"Name":           title,
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

	// This endpoint updates a game in the TestGameEndpoints table
	// tested using Thunder Client: http://localhost:8080/updategame/69/Name/UpdatedName
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
