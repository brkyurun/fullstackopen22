const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log("Error: ", err));

module.exports = app;
