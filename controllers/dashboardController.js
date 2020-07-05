const jira = require('../jira_auth/jiraAuth');
const { success } = require('toastr');
const boardId = 1;

exports.getIssues = async (req, res) => {
  console.log('fetching board...');
  try {
    const issues = await getSortedIssues();
    res.render('dashboard', { issues });
  } catch (err) {
    res.status(500).json({
      status: 'Internal Server Error',
      message: err,
    });
  }
};

exports.addWorkLog = async (req, res) => {
  console.log(req.body);
  try {
    await jira.issue.addWorkLog({
      issueKey: req.body.issueKey,
      timeSpent: req.body.timeSpent,
    });
    res.status(200).json({
      status: 'success',
      message: 'Worklogs updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message:
        'I am sure you still love me after knowing I have a problem to deal with ❤',
    });
  }
};

exports.getIssuesAPI = async (req, res) => {
  console.log('controller hit');
  var issues = await getSortedIssues();
  console.log(issues);
  res.status(200).json({
    status: 'success',
    data: issues,
  });
};

const getCurrentSprintId = async (req, res) => {
  console.log('fetching sprints...');
  const sprints = await jira.board.getAllSprints({
    boardId: boardId,
    state: 'active',
    maxResults: 1,
  });
  return sprints.values[0].id;
};

const getIssuesForSprint = async (req, res) => {
  console.log('fetching issues for current sprint...');
  const currentSprintId = await getCurrentSprintId();
  const issues = await jira.board.getIssuesForSprint({
    boardId: boardId,
    sprintId: currentSprintId,
    jql:
      'status != "Done" AND (assignee in (currentUser()) OR Owner in (currentUser()))',
  });
  return issues;
};

const getPresentableIssues = (apiResult) => {
  console.log('regenerating results');
  return apiResult.issues.map((i) => {
    return {
      issueKey: i.key,
      issueId: i.id,
      issueType: i.fields.issuetype.name,
      issueTypeIconUrl: i.fields.issuetype.iconUrl,
      isSubTask: i.fields.issuetype.subtask,
      priority: i.fields.priority.name,
      // userPic: i.fields.assignee.avatarUrls.48x48
      status: i.fields.status.name,
      summary: i.fields.summary,
      spentTime: i.fields.timetracking.timeSpent,
      remainingTime: i.fields.timetracking.remainingEstimate,
      parentKey: i.fields.parent ? i.fields.parent.key : null, //add due date as well
      parentId: i.fields.parent ? i.fields.parent.id : null,
      workLog: i.fields.worklog.worklogs.map((wlog) => {
        return {
          issueId: wlog.issueId,
          timeSpent: wlog.timeSpent,
          timeSpentSeconds: wlog.timeSpentSeconds,
        };
      }),
      subTasks: null,
    };
  });
};

const getSortedIssues = async () => {
  const issues = await getIssuesForSprint();
  const representableResult = await getPresentableIssues(issues);
  const stories = representableResult.filter(
    (item) => item.issueType == 'Story'
  );

  stories.forEach((story) => {
    var subTasks = representableResult.filter((subTask) => {
      return subTask.isSubTask && subTask.parentId == story.issueId;
    });
    story.subTasks = subTasks;
  });

  representableResult.forEach((task) => {
    if (!task.parentId && task.issueType != 'Story') {
      stories.push(task);
    }
  });

  return stories;
};
