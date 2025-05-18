const swaggerJSDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");
dotenv.config();


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notification System  Api",
            version: "1.0.0",
            description: "A description of your API",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/`,
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    name: "authorization", // Specify the header name
                    in: "header", // Specify the location of the token
                },
            },
        },
    },
    apis: ["./src/presentation/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
