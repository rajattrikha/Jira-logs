const jira = require('../jira_auth/jiraAuth');
const boardId = 14;

const getJiraInstance = (req) => {
  console.log(req.session);
  if (process.env.NODE_ENV === 'development') {
    return jira();
  } else {
    return jira(
      req.session.oauthAccessToken,
      req.session.oauthAccessTokenSecret
    );
  }
};

exports.getIssues = async (req, res) => {
  console.log('fetching board...');
  try {
    const issues = await getSortedIssues(req);
    const user = getUserDetails(issues);
    console.log(user);
    const data = { user, issues };
    res.render('dashboard', { data });
  } catch (err) {
    res.status(500).json({
      status: 'Internal Server Error',
      message: err,
    });
  }
};

const getCurrentUser = async (req) => {
  try {
    console.log('fetching user...');
    const user = await getJiraInstance(req).user.getUser({
      accountId: '5f01900e9d9a120029ef2de0',
    });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.addWorkLog = async (req, res) => {
  try {
    await getJiraInstance(req).issue.addWorkLog({
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
  var issues = await getSortedIssues(req);
  res.status(200).json({
    status: 'success',
    data: issues,
  });
};

const getCurrentSprintId = async (req) => {
  console.log('fetching sprints...');
  const sprints = await getJiraInstance(req).board.getAllSprints({
    boardId: boardId,
    state: 'active',
    maxResults: 1,
  });
  return sprints.values[0].id;
};

const getIssuesForSprint = async (req) => {
  console.log('fetching issues for current sprint...');
  const currentSprintId = await getCurrentSprintId(req);
  const issues = await getJiraInstance(req).board.getIssuesForSprint({
    boardId: boardId,
    sprintId: currentSprintId,
    jql:
      'status != "Done" AND (assignee in (currentUser()) OR Owner in (currentUser()))',
    expand: 'widgets',
  });
  return issues;
};

const getPresentableIssues = (issues) => {
  console.log('regenerating results');
  return issues.map((i) => {
    return {
      issueKey: i.key,
      issueId: i.id,
      issueType: i.fields.issuetype.name,
      issueTypeIconUrl: i.fields.issuetype.iconUrl,
      isSubTask: i.fields.issuetype.subtask,
      priority: i.fields.priority.name,
      assignee: i.fields.assignee,
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

const getSortedIssues = async (req) => {
  const jiraIssues = await getIssuesForSprint(req);
  const representableResult = await getPresentableIssues(jiraIssues.issues);

  const stories = representableResult.filter(
    (item) => item.issueType == 'Story'
  );

  //Add subtasks in stories
  stories.forEach((story) => {
    var subTasks = representableResult.filter((subTask) => {
      return subTask.isSubTask && subTask.parentId == story.issueId;
    });
    story.subTasks = subTasks;
  });

  const issuesToRender = stories;

  representableResult.forEach(async (task) => {
    if (!task.parentId && task.issueType != 'Story') {
      //add orphan tasks and bugs

      issuesToRender.push(task);
    } else if (task.parentId) {
      // Adds task assigned where user is neither owner nor assignee of parent story

      const taskWithParent = stories.find((story) => {
        return story.issueId == task.parentId;
      });

      if (!taskWithParent) {
        // const jiraIssue = await getJiraInstance(req).issue.getIssue({
        //   issueKey: task.parentId,
        // });
        // const story = await getPresentableIssues([jiraIssue]);
        // story[0].subTasks = [task];
        // console.log(story);
        task.summary = task.summary.concat(` | ${task.parentKey}`);
        task.parentId = null;
        issuesToRender.push(task);
      }
    }
  });
  return issuesToRender;
};

const getUserDetails = (issues) => {
  let issue = issues.find((issue) => {
    return issue.assignee && issue.issueType === 'Sub-task';
  });

  if (!issue) {
    issue = issues.find((issue) => {
      return issue.assignee && issue.subTasks.length > 0;
    });
    if (issue) {
      issue = issue.subTasks[0];
    }
  }
  if (issue) {
    return {
      displayName: issue.assignee.displayName,
      userAvatar: issue.assignee.avatarUrls['48x48'],
    };
  } else {
    return {
      displayName: 'Rock Star',
      userAvatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png',
    };
  }
};
