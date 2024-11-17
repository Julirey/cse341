// Needed Resources
const swaggerAutogen = require("swagger-autogen")();

// File parameters 
const doc = {
  info: {
    title: "My API",
    description: "Temple API",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Create swagger file
swaggerAutogen(outputFile, endpointsFiles, doc);
