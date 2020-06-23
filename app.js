console.log("Om Ganeshay Namah!");
const http = require("http");
const express = require("express");

var app = express();

http.createServer(app).listen(3000);

app.get("/home", (req, res) => {
  res.end("Om Ganeshay Namah!");
});
