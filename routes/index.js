// Needed Resources
const routes = require("express").Router();
const temple = require("./temple");

// Route to call swagger
routes.use("/", require("./swagger"));

// Route to call temple functions
routes.use("/temples", temple);

// Route to send documentation
routes.use(
  "/",
  (docData = (req, res) => {
    let docData = {
      documentationURL: "https://nathanbirch.github.io/nathan-byui-api-docs",
    };
    res.send(docData);
  })
);

module.exports = routes;
