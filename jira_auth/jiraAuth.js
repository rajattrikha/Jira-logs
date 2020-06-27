const JiraClient = require("jira-connector");

const authenticate = new JiraClient({
  host: "startcpw.atlassian.net",
  strictSSL: true, // One of optional parameters
  basic_auth: {
    email: "rajat.sharma@quovantis.com",
    api_token: "htCtyukJ3Cs5fZG8hQCwD817",
  },
});

module.exports = authenticate;
