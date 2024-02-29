// Default AWS Lambda index.js code
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('La Lambda habla en Español ahora!'),
    };
    return response;
}