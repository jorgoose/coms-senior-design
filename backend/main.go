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

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

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

	// This endpoint retrieves all data for all favorite games from the FavoriteGames table
	// with a query param called UserID
	// localhost:8080/get-favorite-games?UserID=3df99dfd-4b2a-40e7-8369-bd50e27cd92b
	r.GET("/get-favorite-games", func(c *gin.Context) {
		var res []map[string]interface{}
		userID := c.Query("UserID")
		//err := supabase.DB.From("FavoriteGames").Select("*").Execute(&res)
		err := supabase.DB.From("FavoriteGames").Select("*").Eq("UserID", userID).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// post endpoint that takes in a GameID and UserID to store in a table called
	// Favorite Games.
	r.POST("/favorite-game", func(c *gin.Context) {
		var res []map[string]interface{}

		var favorite FavoriteGame

		// Parse JSON data from the request body
		if err := c.BindJSON(&favorite); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Insert the parsed JSON data into the Supabase database
		insertResult := supabase.DB.From("FavoriteGames").Insert(map[string]interface{}{
			"AppID":  favorite.AppID,
			"UserID": favorite.UserID,
		}).Execute(&res)

		if insertResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": insertResult.Error(),
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

	// Gets all games that fit the given query
	// TODO : need to add more filters when nessessary
	// Ex. http://localhost:8080/Filter-Game/?Genres=Free to Play,Action&Languages='English'&Year=2007
	r.GET("/filter-Game", func(c *gin.Context) {
		var res []map[string]interface{}

		Genres := c.Query("Genres")
		Languages := c.Query("Languages")
		Year := c.Query("Year")

		Genres_array := strings.Split(Genres, ",")
		Languages_array := strings.Split(Languages, ",")

		//Get all games
		body := supabase.DB.From("TestGameEndpoints").Select()

		// Add Filters
		if len(Year) > 0 {
			body.Gte("Release date", (Year+"-01-"+"01")).Lte("Release date", (Year + "-12-" + "31"))
		}
		if len(Genres_array) > 0 {
			body.Cs("Genres", Genres_array)
		}
		if len(Languages_array) > 0 {
			body.Cs("Supported languages", Languages_array)
		}

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

	// This endpoint retrieves all data for all games from the Game Concepts table
	r.GET("/get-all-game-concepts", func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("GameConcepts").Select("*").Execute(&res)
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
	r.POST("/send-game-concept", func(c *gin.Context) {
		var res []map[string]interface{}

		var game GameConcepts

		// Parse JSON data from the request body |
		if err := c.BindJSON(&game); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Insert the parsed JSON data into the Supabase database | works
		insertResult := supabase.DB.From("GameConcepts").Insert(map[string]interface{}{
			"title":        game.Title,
			"developer_id": game.Developer_id,
			"description":  game.Description,
			"genre":        game.Genre,
			"tags":         game.Tags,
		}).Execute(&res)

		if insertResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": insertResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint deletes a game in the GameConcept table
	// using query string parameters instead of URL parameters
	r.DELETE("/delete-game-concept", func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Query("id")

		err := supabase.DB.From("GameConcepts").Delete().Eq("id", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint updates a game in the GameConcepts table
	// using query string parameters instead of URL parameters
	r.PUT("/update-game-concept", func(c *gin.Context) {
		var res []map[string]interface{}

		// Get the ID from the URL parameter
		id := c.Query("id")
		collum := c.Query("collum")
		value := c.Query("value")

		// Update the specified record in the Supabase database
		updateResult := supabase.DB.From("GameConcepts").Update(map[string]interface{}{
			collum: value, // Update
		}).Eq("id", id).Execute(&res)

		if updateResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": updateResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// Gets all games concepts that fit the given query
	// TODO : need to add more filters when nessessary
	// Ex. http://localhost:8080/filter-game-concept/?Genre=Free to Play,Action&...
	r.GET("/filter-game-concept", func(c *gin.Context) {
		var res []map[string]interface{}

		Genres := c.Query("Genre")
		Tags := c.Query("tags")
		title := c.Query("title")

		Genres_array := strings.Split(Genres, ",")
		Tags_array := strings.Split(Tags, ",")

		//Get all games
		body := supabase.DB.From("GameConcepts").Select()

		// Add Filters
		if len(Genres_array) > 0 {
			body.Cs("genre", Genres_array)
		}
		if len(Tags_array) > 0 {
			body.Cs("tags", Tags_array)
		}
		if len(title) > 0 {
			body.Eq("title", title)
		}

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

	// This endpoint retrieves all data for all games from the Comments table
	r.GET("/get-all-comments", func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("Comments").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint sends a game to the Comments table
	// using a JSON body, pinned in #backend in the Discord server
	// note, the JSON body is subject to change once steam data is available.
	r.POST("/send-comment", func(c *gin.Context) {
		var res []map[string]interface{}

		var comment Comment

		// Parse JSON data from the request body |
		if err := c.BindJSON(&comment); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if comment.AppID == 0 && len(comment.ConceptID) <= 0 {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "comment must belong to game",
			})
			return
		}

		// Insert the parsed JSON data into the Supabase database | works
		insertResult := supabase.DB.From("Comment").Insert(map[string]interface{}{
			"Game":        comment.AppID,
			"GameConcept": comment.ConceptID,
			"user":        comment.UserID,
			"Parent_id":   comment.ParentID,
			"comment":     comment.Comment,
		}).Execute(&res)

		if insertResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": insertResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	})

	// This endpoint deletes a game in the comment table
	// using query string parameters instead of URL parameters
	r.DELETE("/delete-comment", func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Query("id")

		err := supabase.DB.From("Comments").Delete().Eq("id", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
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
		panic(err) // failure/timeout starting the server
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
