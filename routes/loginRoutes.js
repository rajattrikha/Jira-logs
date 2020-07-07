const express = require('express');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.route('/').get(accountController.getLoginPage);
router.route('/requesttoken').get(accountController.requestToken);
router.route('/callback').get(accountController.jiraCallback);

module.exports = router;
