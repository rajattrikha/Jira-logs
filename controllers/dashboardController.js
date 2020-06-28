const jira = require("../jira_auth/jiraAuth");
const boardId = 14;

exports.getIssues = async (req, res) => {
  console.log("fetching board...");
  try {
    const issues = await getIssuesForSprint();
    const representableResult = getPresentableIssues(issues);
    res.status(200).json({
      status: "Success",
      data: representableResult,
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err,
    });
  }
};

exports.addWorkLog = async (req, res) => {
  console.log("add worklogs");
  console.log(req.body);
  try {
    await jira.issue.addWorkLog({
      issueKey: req.body.issueKey,
      timeSpent: req.body.timeSpent,
    });
    res.status(200).json({
      status: "success",
      message: "Worklogs updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err,
    });
  }
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

const getPresentableIssues = (apiResult) => {
  console.log("regenerating results");
  return apiResult.issues.map((i) => {
    console.log(i.fields.parent);
    return {
      issueKey: i.key,
      issueId: i.id,
      issueType: i.fields.issuetype.name,
      isSubTask: i.fields.issuetype.subtask,
      priority: i.fields.priority.name,
      // userPic: i.fields.assignee.avatarUrls.48x48
      status: i.fields.status.name,
      summary: i.fields.summary,
      timeTracking: i.fields.timetracking.timeSpent,
      parentKey: i.fields.parent ? i.fields.parent.key : null,
      parentId: i.fields.parent ? i.fields.parent.id : null,
      workLog: i.fields.worklog.worklogs.map((wlog) => {
        return {
          issueId: wlog.issueId,
          timeSpent: wlog.timeSpent,
          timeSpentSeconds: wlog.timeSpentSeconds,
        };
      }),
    };
  });
};
