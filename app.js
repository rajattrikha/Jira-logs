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

app.get("/user", async (req, res) => {
  const issue = await jira.search.search({
    'jql': 'project = S4 AND status in ("In Progress", "In QA Review", "In Review", Open, Reopened, Resolved) AND Sprint = 182 AND assignee in (currentUser()) order by lastViewed DESC'
  });
  res.json(issue);
});

app.get("/board", async (req, res) => {
  const issue = await jira.board.getBoard({
    boardId: 14,
  });
  res.json(issue);
});

app.get("/projects", async (req, res) => {
  const issue = await jira.board.getProjects({
    boardId: 14,
  });
  res.json(issue);
});

app.get("/sprint", async (req, res) => {
  const issue = await jira.board.getAllSprints({
    boardId: 14,
    "jql": "Project = 'START 4' AND sprint in openSprints()"
  });
  res.json(issue);
});


