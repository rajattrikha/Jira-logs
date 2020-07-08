const JiraClient = require('jira-connector');
const jiraConfig = require('./../jiraConfig.json');
const sslConfig = require('./../privateConfig.json');
const privateKey = process.env.PRIVATEKEY || sslConfig.privateKey;

module.exports = (token, token_secret) => {
  console.log(token_secret, token);
  return new JiraClient({
    host: jiraConfig.jiraHost,
    oauth: {
      consumer_key: jiraConfig.consumerKey,
      private_key: JSON.parse(privateKey),
      token: token,
      token_secret: token_secret,
    },
  });
};
