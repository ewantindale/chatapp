require("dotenv").config();
const express = require("express");
const db = require("./config/database");

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/rooms", require("./routes/api/rooms"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
