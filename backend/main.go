package main

import (
	// Stdlib imports
	"backend/utils"
	"context"
	"encoding/json"
	"fmt"
	"io"
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

var r = gin.Default()
var srv = &http.Server{
	Addr:    ":8080",
	Handler: r,
}

func main() {
	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		fmt.Println("Error loading .env file")
	}

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

	// Swagger documentation endpoint
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Users table
	r.GET("/get-one-user", getOneUser(supabase))
	r.GET("/get-all-users", getAllUsers(supabase))
	r.DELETE("/delete-user", deleteUser(supabase))
	r.PUT("/update-user", updateUser(supabase))

	// TestGameEndpoints table
	r.GET("/get-all-games", getAllGames(supabase))
	r.GET("/get-favorite-games", getFavoriteGames(supabase))
	r.GET("/request", request(supabase))
	r.GET("/request-game", requestGame(supabase))
	r.GET("/filter-game", filterGame(supabase))
	r.PUT("/update-game", updateGame(supabase))
	r.DELETE("/delete-game", deleteGame(supabase))
	r.POST("/send-game", sendGame(supabase))

	// FavoriteGames table
	r.POST("/favorite-game", favoriteGame(supabase))
	r.DELETE("/unfavorite-game", unfavoriteGame(supabase))

	// GameConcepts table
	r.GET("/get-all-game-concepts", getAllGameConcepts(supabase))
	r.POST("/send-game-concept", sendGameConcept(supabase))
	r.DELETE("/delete-game-concept", deleteGameConcept(supabase))
	r.PUT("/update-game-concept", updateGameConcept(supabase))
	r.GET("/filter-game-concept", filterGameConcept(supabase))

	// Comments table
	r.GET("/get-all-comments", getAllComments(supabase))
	r.POST("/send-comment", sendComments(supabase))
	r.GET("/get-comments", getComments(supabase))
	r.GET("/get-reply", getReply(supabase))
	r.DELETE("/delete-comment", deleteComments(supabase))
	r.PUT("/update-comment", updateComments(supabase))
	r.GET("/get-all-replies", getAllReplies(supabase))

	// Reviews table
	r.GET("/get-all-reviews", getAllReviews(supabase))
	r.GET("/get-reviews", getReviews(supabase))
	r.POST("/send-review", sendReview(supabase))
	r.DELETE("/delete-review", deleteReview(supabase))
	r.GET("/get-vote", getVote(supabase))
	r.PUT("/update-vote", updateVote(supabase))

	// Server control
	r.GET("/get-news", getNews())
	r.GET("/shutdown", shutdown)
	r.GET("/ping", ping)

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		panic(err) // failure/timeout starting the server
	}
}

// @Summary Get user
// @Description Get user by ID
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /get-one-user [get]
func getOneUser(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Query("id")
		var res []map[string]interface{}
		err := supabase.DB.From("Users").Select("*").Eq("id", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get all users
// @Description Get all users
// @Produce json
// @Success 200 {object} string
// @Router /get-all-users [get]
func getAllUsers(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("Users").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Delete user
// @Description Deletes a user
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /delete-user [delete]
func deleteUser(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Query("id")
		var res []map[string]interface{}
		err := supabase.DB.From("Users").Delete().Eq("id", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Update user
// @Description Updates a user after creation
// @Produce json
// @Param email query string true "email"
// @Param collum query string true "collum"
// @Param value query string true "value"
// @Success 200 {object} string
// @Router /update-user [put]
func updateUser(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Query("id")
		collum := c.Query("collum")
		value := c.Query("value")
		var res []map[string]interface{}
		err := supabase.DB.From("Users").Update(map[string]interface{}{collum: value}).Eq("id", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get all games
// @Description Get all games
// @Produce json
// @Success 200 {object} string
// @Router /get-all-games [get]
func getAllGames(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("TestGameEndpoints").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get favorite games
// @Description Get favorite games by UserID
// @Produce json
// @Param UserID query string true "UserID"
// @Success 200 {object} string
// @Router /get-favorite-games [get]
func getFavoriteGames(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		userID := c.Query("UserID")
		err := supabase.DB.From("FavoriteGames").Select("*").Eq("UserID", userID).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Favorite a game
// @Description Favorite a game
// @Produce json
// @Param AppID body int true "AppID"
// @Param UserID body string true "UserID"
// @Success 200 {object} string
// @Router /favorite-game [post]
func favoriteGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Unfavorite a game
// @Description Unfavorite a game
// @Produce json
// @Param AppID query string true "AppID"
// @Param UserID query string true "UserID"
// @Success 200 {object} string
// @Router /unfavorite-game [delete]
func unfavoriteGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		AppID := c.Query("AppID")
		UserID := c.Query("UserID")

		// const { data, error } = await supabase .from('businesses') .select(*, chain ( * )) .eq('owner_id', 2) .or('chain.owner_id.eq.2');
		err := supabase.DB.From("FavoriteGames").Delete().Eq("AppID", AppID).Eq("UserID", UserID).Execute(&res)
		//err := supabase.DB.From("FavoriteGames").Delete().Eq("id", id).and("").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary request
// @Description select all of one value that matches a column
// @Produce json
// @Param sele query string true "sele"
// @Param collum query string true "collum"
// @Param equal query string true "equal"
// @Success 200 {object} string
// @Router /request [get]
func request(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary request a game
// @Description request a game by AppID
// @Produce json
// @Param AppID query string true "AppID"
// @Success 200 {object} string
// @Router /request-game [get]
func requestGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Filter games
// @Description Filters games (currently by Genres, Languages, and Year)
// @Produce json
// @Param Genres query string false "Genres"
// @Param Languages query string false "Languages"
// @Param Year query string false "Year"
// @Success 200 {object} string
// @Router /filter-game [get]
func filterGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Update game
// @Description Updates a game after creation
// @Produce json
// @Param AppID query string true "AppID"
// @Param collum query string true "collum"
// @Param value query string true "value"
// @Success 200 {object} string
// @Router /update-game [put]
func updateGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Delete game
// @Description Deletes a game
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /delete-game [delete]
func deleteGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Query("id")

		err := supabase.DB.From("TestGameEndpoints").Delete().Eq("AppID", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Send game
// @Description Sends a game to the database
// @Produce json
// @Param AppID body int true "AppID"
// @Param Name body string true "Name"
// @Param Release_date body string true "Release_date"
// @Param Estimated_owners body string true "Estimated_owners"
// @Param Peak_CCU body int true "Peak_CCU"
// @Param Required_age body int true "Required_age"
// @Param Price body float32 true "Price"
// @Param DLC_count body int true "DLC_count"
// @Param About_the_game body string true "About_the_game"
// @Param Supported_languages body string true "Supported_languages"
// @Param Full_audio_languages body string true "Full_audio_languages"
// @Param Reviews body string true "Reviews"
// @Param Header_image body string true "Header_image"
// @Param Website body string true "Website"
// @Param Support_url body string true "Support_url"
// @Param Support_email body string true "Support_email"
// @Param Windows body bool true "Windows"
// @Param Mac body bool true "Mac"
// @Param Linux body bool true "Linux"
// @Param Metacritic_score body int true "Metacritic_score"
// @Param Metacritic_url body string true "Metacritic_url"
// @Param User_score body int true "User_score"
// @Param Positive body int true "Positive"
// @Param Negative body int true "Negative"
// @Param Score_rank body string true "Score_rank"
// @Param Achievements body int true "Achievements"
// @Param Recommendations body int true "Recommendations"
// @Param Notes body string true "Notes"
// @Param Average_playtime_forever body int true "Average_playtime_forever"
// @Param Average_playtime_two_weeks body int true "Average_playtime_two_weeks"
// @Param Median_playtime_forever body int true "Median_playtime_forever"
// @Param Median_playtime_two_weeks body int true "Median_playtime_two_weeks"
// @Param Developers body string true "Developers"
// @Param Publishers body string true "Publishers"
// @Param Categories body string true "Categories"
// @Param Genres body string true "Genres"
// @Param Tags body string true "Tags"
// @Param Screenshots body string true "Screenshots"
// @Param Movies body string true "Movies"
// @Success 200 {object} string
// @Router /send-game [post]
func sendGame(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		var game GameBody

		// Parse JSON data from the request body
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
	}
}

// @Summary Get all game concepts
// @Description Get all game concepts
// @Produce json
// @Success 200 {object} string
// @Router /get-all-game-concepts [get]
func getAllGameConcepts(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("GameConcepts").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Send game concept
// @Description Sends a game concept to the database
// @Produce json
// @Param title body string true "title"
// @Param developer_id body string true "developer_id"
// @Param description body string true "description"
// @Param genre body string true "genre"
// @Param tags body string true "tags"
// @Success 200 {object} string
// @Router /send-game-concept [post]
func sendGameConcept(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		var game GameConcepts

		// Parse JSON data from the request body
		if err := c.BindJSON(&game); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Insert the parsed JSON data into the Supabase database
		insertResult := supabase.DB.From("GameConcepts").Insert(map[string]interface{}{
			"title":       game.title,
			"UserID":      game.UserID,
			"description": game.description,
			"genre":       game.genre,
			"tags":        game.tags,
		}).Execute(&res)

		if insertResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": insertResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Delete game concept
// @Description Deletes a game concept
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /delete-game-concept [delete]
func deleteGameConcept(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Update game concept
// @Description Updates a game concept after creation
// @Produce json
// @Param id query string true "id"
// @Param collum query string true "collum"
// @Param value query string true "value"
// @Success 200 {object} string
// @Router /update-game-concept [put]
func updateGameConcept(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Filter games
// @Description Filters games (currently by Genre, Tags, and Title)
// @Produce json
// @Param Genre query string false "Genre"
// @Param tags query string false "tags"
// @Param title query string false "title"
// @Success 200 {object} string
// @Router /filter-game [get]
func filterGameConcept(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		Genres := c.Query("genre")
		Tags := c.Query("tags")
		title := c.Query("title")
		UserID := c.Query("UserID")

		Genres_array := strings.Split(Genres, ",")
		Tags_array := strings.Split(Tags, ",")

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
		if len(UserID) > 0 {
			body.Eq("UserID", UserID)
		}

		err := body.Execute(&res)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get all comments
// @Description Get all comments
// @Produce json
// @Success 200 {object} string
// @Router /get-all-comments [get]
func getAllComments(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("Comments").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

func getComments(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		game := c.Query("id")
		err := supabase.DB.From("Comments").Select("*").Eq("Game", game).Eq("reply", "0").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

func getReply(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		comment := c.Query("id")
		err := supabase.DB.From("Comments").Select("*").Eq("Parent_id", comment).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Send comment
// @Description Sends a comment to the database
// @Produce json
// @Param AppID body int true "AppID"
// @Param UserID body string true "UserID"
// @Param Comment body string true "Comment"
// @Success 200 {object} string
// @Router /send-comment [post]
func sendComments(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		var comment Comment

		if err := c.BindJSON(&comment); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if comment.AppID == 0 {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "comment must belong to game",
			})
			return
		}

		if len(comment.ParentID) == 0 {
			insertResult := supabase.DB.From("Comments").Insert(map[string]interface{}{
				"Game":    comment.AppID,
				"user":    comment.UserID,
				"reply":   0,
				"comment": comment.Comment,
			}).Execute(&res)
			if insertResult != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": insertResult.Error(),
				})
				return
			}
		} else {
			insertResult := supabase.DB.From("Comments").Insert(map[string]interface{}{
				"Game":      comment.AppID,
				"user":      comment.UserID,
				"Parent_id": comment.ParentID,
				"reply":     1,
				"comment":   comment.Comment,
			}).Execute(&res)
			if insertResult != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": insertResult.Error(),
				})
				return
			}
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Delete comment
// @Description Deletes a comment
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /delete-comment [delete]
func deleteComments(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
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
	}
}

// @Summary Update comment
// @Description Updates a comment after creation
// @Produce json
// @Param id query string true "id"
// @Param collum query string true "collum"
// @Param value query string true "value"
// @Success 200 {object} string
// @Router /update-comment [put]
func updateComments(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		id := c.Query("id")
		collum := c.Query("collum")
		value := c.Query("value")

		updateResult := supabase.DB.From("Comments").Update(map[string]interface{}{collum: value}).Eq("id", id).Execute(&res)

		if updateResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": updateResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get all replies
// @Description Get all replies
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /get-all-replies [get]
func getAllReplies(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		parent := c.Query("id")

		err := supabase.DB.From("Comments").Select("*").Eq("Parent_id", parent).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

func getReviews(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		game := c.Query("id")
		err := supabase.DB.From("Reviews").Select("*").Eq("ConceptID", game).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get all reviews
// @Description Get all reviews
// @Produce json
// @Success 200 {object} string
// @Router /get-all-reviews [get]
func getAllReviews(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		err := supabase.DB.From("Reviews").Select("*").Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Send review
// @Description Sends a review to the database
// @Produce json
// @Param ConceptID body string true "ConceptID"
// @Param UserID body string true "UserID"
// @Param Comment body string true "Comment"
// @Success 200 {object} string
// @Router /send-review [post]
func sendReview(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		var review Review

		if err := c.BindJSON(&review); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		review.vote = 0

		insertResult := supabase.DB.From("Reviews").Insert(map[string]interface{}{
			"ConceptID": review.ConceptID,
			"user":      review.UserID,
			"comment":   review.comment,
			"vote":      review.vote,
		}).Execute(&res)

		if insertResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": insertResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Delete review
// @Description Deletes a review
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /delete-review [delete]
func deleteReview(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}
		id := c.Query("id")

		err := supabase.DB.From("Reviews").Delete().Eq("id", id).Execute(&res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get vote
// @Description Get vote by ID
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /get-vote [get]
func getVote(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		id := c.Query("id")

		// Update the specified record in the Supabase database
		updateResult := supabase.DB.From("Reviews").Select("vote").Eq("id", id).Execute(&res)

		if updateResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": updateResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Update vote
// @Description Update vote by ID
// @Produce json
// @Param id query string true "id"
// @Param vote query string true "vote"
// @Success 200 {object} string
// @Router /update-vote [put]
func updateVote(supabase *supa.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var res []map[string]interface{}

		id := c.Query("id")
		vote := c.Query("vote")

		// Update the specified record in the Supabase database
		updateResult := supabase.DB.From("Reviews").Update(map[string]interface{}{"vote": vote}).Eq("id", id).Execute(&res)

		if updateResult != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": updateResult.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, res)
	}
}

// @Summary Get news
// @Description Get news by ID
// @Produce json
// @Param id query string true "id"
// @Success 200 {object} string
// @Router /get-news [get]
func getNews() gin.HandlerFunc {
	return func(c *gin.Context) {

		var news News

		id := c.Query("id")

		resp, err := http.Get("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/" + "?appid=" + id)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		defer resp.Body.Close()
		body, err2 := io.ReadAll(resp.Body)

		if err2 != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err2.Error(),
			})
			return
		}

		json.Unmarshal(body, &news)

		c.JSON(http.StatusOK, news.Appnews.Newsitems)
		resp.Body.Close()
	}
}

// @Summary Shutdown the server
// @Description Shutdown the server
// @Produce json
// @Success 200 {object} string
// @Router /shutdown [get]
func shutdown(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "shutting down",
	})
	go func() {
		if err := srv.Shutdown(context.Background()); err != nil {
			panic(err) // failure/timeout shutting down the server gracefully
		}
	}()
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
