const JiraClient = require("jira-connector");
const JiraCredentials = require("../jiraCredentials.json");
const authenticate = new JiraClient({
  host: "startcpw.atlassian.net",
  strictSSL: true, // One of optional parameters
  basic_auth: {
    email: JiraCredentials.email,
    api_token: JiraCredentials.api_token,
  },
});

module.exports = authenticate;
