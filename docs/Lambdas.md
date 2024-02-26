# Lambda Functions with AWS Lambda

<!-- Image -->
![AWS Lambda](https://upload.wikimedia.org/wikipedia/commons/e/e9/Amazon_Lambda_architecture_logo.png)

# What is a Lambda Function?

An AWS Lambda function is a service provided by AWS that lets you run a segment of code (a function), without having to manage any servers or infrastructure. Lambda functions are event-driven, meaning they are triggered by events such as changes to data in an AWS storage bucket, an HTTP request via AWS API Gateway, or something else.

# What do we need Lambda Functions for?

For our project, Lambda functions will be useful for handling certain backend logic that does not need to be initialized by a user on the frontend. For example, if we want to re-train the machine learning model once a month, no user needs to be involved in that process. We can set up a Lambda function to handle that logic and have it run on a schedule.

This is just one example of how Lambda functions can be used. They can also be used to handle HTTP requests, process data, and more.

# How do I create a Lambda Function within the project?

To create a new Lambda function:

1. Navigate to the `lambdas` directory in the root of the project.
2. Create a new directory with the name of the Lambda function you want to create (i.e. "example-lambda")
3. Inside the new directory, create a file called `index.js` (i.e. `example-lambda/index.js`)
4. Write your Lambda function handler code in the `index.js` file.

Here's an example of what the `index.js` file might look like:

```javascript
exports.handler = async (event) => {
    // Your custom Lambda function code would go in here
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

# I've added my Lambda function code, now what?

__Creating a Lambda function in AWS is automatically handled by our CI/CD pipeline.__

We have CI/CD set up via GitHub actions that will take care of the deployment of your Lambda function. Once you've added your Lambda function code, simply push your changes to the repository and the CI/CD will take care of the rest. You can view the YAML file that completes this action in the `.github/workflows` directory in `lambda.yml`.

# How do I update my Lambda function code?

__Updates to AWS Lambda are automatically handled by our CI/CD pipeline.__

The CI/CD pipeline also automatically updates your function when changes are made. Just push your changes to the repository and the CI/CD will take care of the rest.