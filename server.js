require("dotenv").config();
const express = require("express");
const db = require("./config/database");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
