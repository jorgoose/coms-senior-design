package main

import (
	// Stdlib imports
	"backend/utils"
	"context"
	"fmt"
	"net/http"
	"strings"

	// External dependencies
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"

	// Docs
	_ "backend/docs" // This is where the docs are found

	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
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

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	// Swagger documentation endpoint
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Example of using a handler function "ping" to handle the request
	r.GET("/ping", ping)

	// This endpoint retrieves all data for all games from the TestGameEndpoints table
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
	// using query string parameters instead of URL parameters
	// lhttp://localhost:8080/request?sele=AppID&collum=Name&equal=Portal%202
	// the above endpoint returns the AppID of the game named Portal 2,
	// note that the game name has a space in it, so it is encoded as %20
	r.GET("/request", func(c *gin.Context) {
		sele := c.Query("sele")
		collum := c.Query("collum")
		equal := c.Query("equal")

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

	// This endpoint retrieves a single game form the TestGamesEndpoints table
	// This will use a query string parameter instead of the URL parameter
	// localhost:8080/request-game?AppID=80
	r.GET("/request-game", func(c *gin.Context) {
		appID := c.Query("AppID")
		var res []map[string]interface{}
		err := supabase.DB.From("TestGameEndpoints").Select().Eq("AppID", appID).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// Gets genres that exactly match whats given | needs more testing
	r.GET("/request-game-genres", func(c *gin.Context) {
		Genres := c.Query("Genres")
		var res []map[string]interface{}

		Genres_array := strings.Split(Genres, ",")

		//Filter for what we want
		body := supabase.DB.From("TestGameEndpoints").Select()

		fmt.Print(Genres_array)

		// TODO
		body.Cd("Genres", Genres_array)

		// Execute Filter
		err := body.Execute(&res)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// get games allowed for ages > age
	r.GET("/request-game-age", func(c *gin.Context) {
		age := c.Query("age")
		var res []map[string]interface{}

		//Filter for what we want
		body := supabase.DB.From("TestGameEndpoints").Select()

		body.Gt("Required age", age)

		// Execute Filter
		err := body.Execute(&res)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// get games released between two dates
	r.GET("/request-game-date", func(c *gin.Context) {
		from := c.Query("from")
		to := c.Query("to")
		var res []map[string]interface{}

		//Filter for what we want
		body := supabase.DB.From("TestGameEndpoints").Select()

		body.Gt("Release date", from).Lt("Release date", to)

		// Execute Filter
		err := body.Execute(&res)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// get games released between two dates
	r.GET("/request-game-price", func(c *gin.Context) {
		from := c.Query("from")
		to := c.Query("to")
		var res []map[string]interface{}

		//Filter for what we want
		body := supabase.DB.From("TestGameEndpoints").Select()

		body.Gt("Price", from).Lt("Price", to)

		// Execute Filter
		err := body.Execute(&res)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint updates a game in the TestGameEndpoints table
	// using query string parameters instead of URL parameters
	// tested using Thunder Client: http://localhost:8080/update-game?AppID=620&collum=Name&value=Test
	r.PUT("/update-game", func(c *gin.Context) {
		var res []map[string]interface{}

		// Get the ID from the URL parameter
		id := c.Query("AppID")
		collum := c.Query("collum")
		value := c.Query("value")

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
	// using query string parameters instead of URL parameters
	// tested using Thunder Client: http://localhost:8080/delete-game?AppID=620
	r.DELETE("/delete-game", func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Query("AppID")

		err := supabase.DB.From("TestGameEndpoints").Delete().Eq("AppID", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint sends a game to the TestGameEndpoints table
	// using a JSON body, pinned in #backend in the Discord server
	// note, the JSON body is subject to change once steam data is available.
	r.POST("/send-game", func(c *gin.Context) {
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
