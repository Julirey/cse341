// Needed Resources
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Route to serve swaggger UI files
router.use("/api-docs", swaggerUi.serve);

// Route to setup swaggger UI files
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
