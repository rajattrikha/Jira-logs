const express = require("express");
const dashboardController = require("./../controllers/dashboardController");

const router = express.Router();

router
  .route("/")
  .get(dashboardController.getIssues)
  .post(dashboardController.addWorkLog);

router.route("/change-transition").post(dashboardController.changeTransition);

module.exports = router;
