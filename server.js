/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./database/connect");
const indexRoute = require("./routes");
const contactsRoute = require("./routes/contactsRoute")
const utilities = require("./middleware/")

/* ***********************
 * Middleware
 * ************************/
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

/* ***********************
 * Routes
 *************************/
app.use ("/", indexRoute);

// Route to get contacts info
app.use("/contacts", contactsRoute);

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});


/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
});

/* ***********************
 * Node.js Error Handler
 * Place after all other middleware
 *************************/
process.on("uncaughtException", (error, origin) => {
  console.error(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
  if (!utilities.isOperationalError(error)) {
    process.exit(1);
  }
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, ()  => {
      console.log(`Connected to DB and listening on http://${host}:${port}`);
    });
  }
});
