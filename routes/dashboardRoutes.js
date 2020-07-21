const express = require('express');
const dashboardController = require('./../controllers/dashboardController');

const router = express.Router();

router
  .route('/')
  .get(dashboardController.getIssues)
  .post(dashboardController.addWorkLog);

router
  .route('/transitions')
  .get(dashboardController.getTransitions)
  .post(dashboardController.changeTransition);

module.exports = router;
