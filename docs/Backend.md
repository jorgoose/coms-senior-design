# Backend

## Technologies
- Go
- Gin Framework
- AWS EC2

### What is Go?

<!-- TODO: Overview of Go language -->

### What is Gin?

#### Data Type Example with Gin Endpoint

```{go}
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
```

### What is AWS EC2?
