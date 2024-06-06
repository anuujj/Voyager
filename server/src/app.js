const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://voyager-anuujj.vercel.app/",
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(express.json(), cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", require("./routes"));

module.exports = app;
