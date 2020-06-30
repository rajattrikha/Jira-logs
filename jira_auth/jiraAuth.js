const JiraClient = require("jira-connector");
// const JiraCredentials = require("../jiraCredentials.json");
const authenticate = new JiraClient({
  host: "startcpw.atlassian.net",
  strictSSL: true,
  basic_auth: {
    email: process.env.EMAIL || ``, // JiraCredentials.email,
    api_token: process.env.API_TOKEN || ``, // JiraCredentials.api_token,
  },
});

module.exports = authenticate;
