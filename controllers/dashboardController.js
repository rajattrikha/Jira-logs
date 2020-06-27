const jira = require("../jira_auth/jiraAuth");
const boardId = 14;

exports.getIssues = async (req, res) => {
  console.log("fetching board...");
  const issues = await getIssuesForSprint();

  res.json(issues);
};

exports.addWorkLog = async (req, res) => {
  console.log("add worklogs");
  console.log(req.body);
  // await jira.issue.addWorkLog({
  //   issueKey: req.body,
  //   timeSpent: req.body,
  // });
  res.json(true);
};

const getCurrentSprintId = async (req, res) => {
  console.log("fetching sprints...");
  const sprints = await jira.board.getAllSprints({
    boardId: boardId,
    state: "active",
    maxResults: 1,
  });
  return sprints.values[0].id;
};

const getIssuesForSprint = async (req, res) => {
  console.log("fetching issues for current sprint...");
  const currentSprintId = await getCurrentSprintId();
  const issues = await jira.board.getIssuesForSprint({
    boardId: boardId,
    sprintId: currentSprintId,
    jql: "assignee in (currentUser())",
  });
  return issues;
};
