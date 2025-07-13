const swaggerConfig = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "User Auth API",
            description: "API for user registration, authentication (JWT), and user listing",
            version: "1.0.0"
        }
    },
    apis: [
        "./routes/*.js",
        "./controllers/*.js"
    ]
};

const swaggerAPIOptions = swaggerConfig(options);
module.exports = swaggerAPIOptions;