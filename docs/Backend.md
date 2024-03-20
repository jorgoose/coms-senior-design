# Backend

## Technologies
- Go
- Gin Framework
- AWS EC2

### What is Go?


Go, commonly referred to as Golang, is an open-source programming language developed by Google. It was created by Robert Griesemer, Rob Pike, and Ken Thompson and first released in 2009. Go is designed for simplicity, efficiency, and reliability. It has features such as strong typing, garbage collection, memory safety, concurrency support through goroutines and channels, and a rich standard library.

Go is often used for building scalable and efficient software systems, including web servers, distributed systems, cloud services, and command-line tools. Its simplicity and performance make it popular among developers for a wide range of applications.

### What is Gin?

Go-Gin is a web framework for the Go programming language. Gin is a lightweight framework that provides a fast HTTP router and middleware for building web applications in Go. It is designed to be minimalistic yet powerful, allowing developers to quickly create efficient and scalable web services.

Gin provides features such as routing, middleware support, JSON rendering, parameter binding, and more. It's widely used in the Go community for developing APIs and web applications due to its simplicity and performance.

#### Data Type Example with Gin Endpoint and Explanation

r.GET("example-get-request", exampleGetRequest(supabase))

func exampleGetRequest(supabase *supa.Client) gin.HandlerFunc {
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


Why do we need "var res []map[string]interface{}"? Go needs a type for the response of the query. The beginning "[]" defines a slice,
which is just Go's way of defining a list / dynamic array. "map[string]interface{}" is a map with string keys and interface{} values (interface{} just
basically means "any type"). Example: If you used a query like ... .Select("*").Single(), you would use "var res map[string]interface{}" instead since it's only
one row.

In the example above, the first line is simply the endpoint, which references the function handler, in this case exampleGetRequest. You'll see a parameter for exampleGetRequest of type supabase called *supa.Client. This is the client information from our main function to connect to Supabase. This is required for any backend function dealing with Supabase.

The second code snippet is the actual handler, which will reside OUTSIDE of main. It's a function within a function here, jank I know, but it works great. So that first line is the function declaration, and the return in the second line is the actual backend code running; it's kinda like a MITM function but not really, it just works. 

### What is AWS EC2?

Amazon Elastic Compute Cloud (EC2) is a web service provided by Amazon Web Services (AWS) that offers resizable compute capacity in the cloud. It allows users to rent virtual machines (referred to as instances) on which they can run their applications. EC2 instances provide a wide range of compute capabilities, from small and cost-effective instances suitable for low-traffic websites or development environments to powerful instances optimized for high-performance computing or data-intensive workloads.