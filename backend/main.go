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

var resourceManager = utils.ResourceManager{}
var supabaseKey = resourceManager.GetProperty("SUPABASE_KEY")
var supabaseUrl = resourceManager.GetProperty("SUPABASE_URL")
var supabase = supa.CreateClient(supabaseUrl, supabaseKey)
var r = gin.Default()

var srv = &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

func main() {
	resourseManager := utils.ResourceManager{}
	supabaseKey := resourseManager.GetProperty("SUPABASE_KEY")
	supabaseUrl := resourseManager.GetProperty("SUPABASE_URL")
	supabase = supa.CreateClient(supabaseUrl, supabaseKey)
	r = gin.Default()

	srv = &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

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
	

	// Swagger documentation endpoint
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.GET("/ping", ping)
	r.GET("/get-all-games", getAllGames)
	r.GET("/request", request)
	r.GET("/request-game", requestGame)
	r.GET("/filter-game", filterGame)
	r.PUT("/update-game", updateGame)
	r.DELETE("/delete-game", deleteGame)
	r.POST("/send-game", sendGame)
	r.GET("/shutdown", shutdown)


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

func deleteGame(c *gin.Context) {
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
}

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

func sendGame(c *gin.Context) {
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
}

func updateGame(c *gin.Context) {
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

func filterGame(c *gin.Context) {
	var res []map[string]interface{}

	Genres := c.Query("Genres")
	Languages := c.Query("Languages")
	Year := c.Query("Year")

	Genres_array := strings.Split(Genres, ",")
	Languages_array := strings.Split(Languages, ",")

	//Get all games
	body := supabase.DB.From("TestGameEndpoints").Select()

	// Add Filters
	body.Gte("Release date", (Year+"-01-"+"01")).Lte("Release date", (Year + "-12-" + "31"))
	body.Cs("Genres", Genres_array)
	body.Cs("Supported languages", Languages_array)

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

func requestGame(c *gin.Context) {
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

func request(c *gin.Context) {
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

func getAllGames(c *gin.Context) {
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