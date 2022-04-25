const express = require("express");
const app = express();
const path = require("path");
require("express-async-errors");
const expressApiVersioning = require("express-api-versioning");
const route1 = require("./routes/V1/v1");
const route2 = require("./routes/V2/v2");
const notFound = require("./routes/middlewares/notfound");
const error = require("./routes/middlewares/error");
import AuthController from './routes/v2/Controllers/AuthController'
import verifyToken from './routes/middleware/verifyToken'

//  Catch Errors in the start
process.on("uncaughtException", function (err) {
  console.log(err.message);
});

//  middleware
app.use(express.json());

// index Route
app.get("/", (req, res) => {
  res.send("Hello 🎉");
});
// ROUTES
app.use("/api/v1/Restaurants", route1);

app.use('/api/auth/', AuthController) //apply authentication only to version 2

app.use(verifyToken) // middleware to verify token

app.use("/api/v2/Restaurants", route2);
// Middelware Error
app.use(notFound);
app.use(error);

//  Reset PORT env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started on PORT " + PORT);
});
