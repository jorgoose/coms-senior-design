package main

import (
	"backend/utils"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	supa "github.com/nedpals/supabase-go"
	"github.com/joho/godotenv"

	// Docs
	"github.com/swaggo/gin-swagger" // gin-swagger middleware
	"github.com/swaggo/files"       // swagger embed files
	_ "backend/docs"               // This is where the docs are found
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

	// Swagger documentation endpoint
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Example of using a handler function "ping" to handle the request
	r.GET("/ping", ping)

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