package main

import (
	// Stdlib imports
	"backend/utils"
	"context"
	"fmt"
	"net/http"

	// External dependencies
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"
	"github.com/gin-contrib/cors"

	// Docs
	"github.com/swaggo/gin-swagger" // gin-swagger middleware
	"github.com/swaggo/files"       // swagger embed files
	_ "backend/docs"               // This is where the docs are found
)

// To start the server: "go run .". This will start the server on port 8080 by default, with a shutdown endpoint at /shutdown.

func main() {
	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		fmt.Println("Error loading .env file")
	}

	r := gin.Default()

	// CORS (Allows all origins)
	r.Use(cors.Default())
	
	resourceManager := utils.ResourceManager{}
	supabaseKey := resourceManager.GetProperty("SUPABASE_KEY")
	supabaseUrl := resourceManager.GetProperty("SUPABASE_URL")
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)

	// Swagger documentation endpoint
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Example of using a handler function "ping" to handle the request
	r.GET("/ping", ping)

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

	// This endpoint selects all elements where its collum == equal
	r.GET("/request/:sele/:collum/:equal", func(c *gin.Context) {
		sele := c.Param("sele")
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
	// localhost:8080/request-game/80
	r.GET("/request-game/:AppID", func(c *gin.Context) {
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

	// This endpoint retrieves a single game form the TestGamesEndpoints table
	// This will use a query string parameter instead of the URL parameter
	// localhost:8080/request-game?AppID=80
	r.GET("/request-game", func(c *gin.Context) {
		id := c.Query("AppID")
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
	r.DELETE("/delete-game/:AppID", func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Param("AppID")

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

// @Summary Ping the server
// @Description Check if the server is up and running
// @Produce json
// @Success 200 {object} string
// @Router /ping [get]
func ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
