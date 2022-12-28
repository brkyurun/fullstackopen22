// new file content
const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server currently running on port: ${config.PORT}`);
});

// end

//old content
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGO_URI = config.MONGODB_URI;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = MONGO_URI;
mongoose.connect(mongoUrl).then(() => console.log("Connected to DB!"));

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
