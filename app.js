console.log("Om Ganeshay Namah!");
const express = require("express");
const path = require("path");
const dashboardRouter = require("./routes/dashboardRoutes");
const aboutRouter = require("./routes/aboutRoutes");

var app = express();
app.use(express.json());

app.use(express.static("assets"));
app.use(express.static(path.join("node_modules/bootstrap/dist/css")));
app.use(express.static(path.join("node_modules/toastr/build")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", dashboardRouter);
app.use("/about", aboutRouter);

app.listen(3000, () => {
  console.log(`Server is running at localhost:3000/ `);
});
