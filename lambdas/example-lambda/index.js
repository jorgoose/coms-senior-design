// Default AWS Lambda index.js code
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Auto deployments for Lambda functions are cool'),
    };
    return response;
}