const JiraClient = require("jira-connector");
const JiraCredentials = require("../jiraCredentials.json");
const authenticate = new JiraClient({
  host: "box007.atlassian.net",
  strictSSL: true,
  basic_auth: {
    email: JiraCredentials.email,
    api_token: JiraCredentials.api_token,
  },
});

module.exports = authenticate;
