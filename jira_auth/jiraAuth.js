const JiraClient = require('jira-connector');
const jiraConfig = require('./../jiraConfig.json');
const privateKey = process.env.PRIVATEKEY;

if (process.env.NODE_ENV === 'development') {
  const jiraCredentials = require('./../jiraCredentials.json');
  const jiraHost = "box007.atlassian.net";
  module.exports = () => {
    return new JiraClient({
      host: jiraHost,
      basic_auth: {
        email: jiraCredentials.email,
        api_token: jiraCredentials.api_token,
      },
    });
  };
} else {
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
}
