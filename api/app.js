"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
// routes
const usersRoutes = require("./routes/users-routes");
const coursesRoutes = require("./routes/courses-routes");

// cors
const cors = require("cors");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "false";

// create the Express app
const app = express();

// setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// allow cross-origin resource sharing
app.use(
  cors({
    origin: "*", // allows all origins
    methods: "GET,PUT,POST,DELETE", // methods allowed
  })
);

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// external routes
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Successful connection to database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
})();

// Sequelize model synchronization, then start listening on our port.
sequelize.sync().then(() => {
  // start listening on our port
  const server = app.listen(app.get("port"), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  });
});