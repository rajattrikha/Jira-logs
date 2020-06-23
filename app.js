console.log("Om Ganeshay Namah!");
const http = require("http");
const express = require("express");
const JiraClient = require("jira-connector");

var app = express();

const jira = new JiraClient({
  host: "startcpw.atlassian.net",
  strictSSL: true, // One of optional parameters
  basic_auth: {
    email: "rajat.sharma@quovantis.com",
    api_token: "bHNZ5tbMKbHvSSMfblVvD9C0",
  },
});

http.createServer(app).listen(3000);

app.get("/home", (req, res) => {
  res.send("Om Ganeshay Namah!");
});

app.get("/issues", async (req, res) => {
  const issue = await jira.issue.getIssue({ issueKey: "S4-6776" });
  res.json(issue);
});
