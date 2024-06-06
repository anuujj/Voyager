const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://voyager-anuujj.vercel.app/",
  "http://localhost:5173",
  "http://localhost:5174",
  // add more origins as needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(express.json(), cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", require("./routes"));

module.exports = app;
