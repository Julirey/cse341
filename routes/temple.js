// Needed Resources
const routes = require("express").Router();
const temples = require("../controllers/temple.js");

// Route to get data of all tempels
routes.get("/", temples.findAll);

// Route to get data of a temple by id
routes.get("/:temple_id", temples.findOne);

// Route to create temple data entry
routes.post("/", temples.create);

// Route to update temple info
routes.put("/:id", temples.update);

// Route to delete temple by id
routes.delete("/:id", temples.delete);

// Route to delete every temple
routes.delete("/", temples.deleteAll);

// Route to get all published temples
routes.get("/published", temples.findAllPublished);

module.exports = routes;
