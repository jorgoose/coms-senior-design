package main

import (
	"backend/utils"
	"fmt"
	"context"
	// "log"
	"net/http"
	"github.com/gin-gonic/gin"
	// "github.com/gofiber/fiber/v2"
 	supa "github.com/nedpals/supabase-go"
)

type Config struct {
	supabaseKey string
	supabaseUrl string
}

type User struct {
	Username string `json:"username"` 
	// AccountType int    `json:"account_type"` 
}

func main() {
	r := gin.Default()
	resourceManager := utils.ResourceManager{};
	supabaseKey := resourceManager.GetProperty("SUPABASE_KEY")
	supabaseUrl := resourceManager.GetProperty("SUPABASE_URL")
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)
	// fmt.Printf("%s", msg)
	// config := ReadConfig()
	// fmt.Printf("%s: %s\n", config.supabaseKey, config.supabaseURL)

	r.GET("/register", func(c *gin.Context) {
		user, err := supabase.Auth.SignUp(context.Background(), supa.UserCredentials{
			Email:    "test1@iastate.edu",
			Password: "test123wow",
		})
		 
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"user": user,
		})
	})

	r.POST("/register", func(c *gin.Context) {
		var row User
		if err := c.BindJSON(&row); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		  var results []User
		  err := supabase.DB.From("Games").Insert(row).Execute(&results)
		  if err != nil {
			panic(err)
		  }
		
		  fmt.Println(results) // Inserted rows
	})


	r.PUT("/update", func(c *gin.Context) {
		var row User
		if err := c.BindJSON(&row); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		  var results []User
		// Adjust this to match how your Supabase client expects to perform an update operation.
		err := supabase.DB.From("Users").Update(row).Eq("id", "2a24fb8f-9bd6-4734-99d7-775becf4ec4d").Execute(&results)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	
		c.JSON(http.StatusOK, results)
	})

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong, plus sweet this is actually deploying live now",
		})
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
		panic(err)
	}
}


