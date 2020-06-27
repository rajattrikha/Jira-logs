console.log("Om Ganeshay Namah!");
const express = require("express");
const dashboardRouter = require("./routes/dashboardRoutes");

var app = express();
app.use(express.json());

app.use("/", dashboardRouter);

app.listen(3000, () => {
  console.log(`Server is running at localhost:3000/ `);
});
