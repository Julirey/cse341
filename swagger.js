// Needed Resources
const swaggerAutogen = require("swagger-autogen")();

// File parameters 
const doc = {
  info: {
    title: "music API",
    description: "Interaction with music database.",
  },
  host: "localhost:8080",
  schemes: ["http","https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Create swagger file
swaggerAutogen(outputFile, endpointsFiles, doc);
