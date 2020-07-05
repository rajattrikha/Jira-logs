// const JiraClient = require('jira-connector');

// const jiraTokens = JiraClient.oauth_util.getAuthorizeURL(
//   {
//     host: 'box007.atlassian.net',
//     oauth: {
//       consumer_key: 'Jscriber',
//       private_key:
//         '-----BEGIN RSA PRIVATE KEY-----\n' +
//         'MIICXAIBAAKBgQCkEF7VPHG9/MayKFj6Jp6TM6yx97jYW+sFEFH1E/+40XQ+xTyeEiqaNeK61SCQm7J+sH4WuO6/xDawp0o2NMh6OTgqgerJyBcs3Calnq9gh/Ucs6CLD0uk3tXub2PqDiU75W+Y0eQGNerI6WA4t5zPHemWH6oTtcLvrKXFUkL6ewIDAQABAoGAHFsT+Ojkg8CvmtUsY7fPCoQQ4gV9ti9U1GA4uhIFzayt2bd/PZbINDUCBeaWJUgztn/MmyLFaPGBvlB7nBjNWUOb8wUYrRfqUpMyE1gwMn/LHTZV6KM9I8vlRzTGl4O+g3b4rqVLoDOrs9IlEogyw0dEDrXYjkUO3iEnQ6SccMkCQQDY2WsF2Qw5g3fn/yXb+uiBlx8nG2dICPTmtAR/mK/Mk/q/JMeYr5huynaaJV0aeS/etd/E8z2gk8u7vQjw1BifAkEAwa9CuhIB43qhpBCR0AzBQHuTKA52lagYvv7s5Wy0RUX3XpCpoJM0otqhxw/mow3NK9NR9qd3DgoGiW73jW9kpQJAVenF4ho9Iqg4oFzRNhdxeK5T9F2CDOMnjCO0SI1I0Uerp4E95vti7DogxS+adHuhAJ6UGma4et8zb50UZr3RRwJAZvJS0zfTDSgXVm8AMcc1yKJmOzpEyZMJZCt3mxJGVzOzIe5eWt0jcxQmPPo0qqIhVZQC0sl8PFgT1WTH68MziQJBALfCg9QJKLf6XDZOvPUJlZGD1PY0Zcmkl455x6vZRNXtblh+rgaLnqMmKBiB8vjXNsuLql/h7pcIux6QeC5amvc=\n' +
//         '-----END RSA PRIVATE KEY-----',
//     },
//   },
//   function (error, oauth) {
//     console.log(oauth);

//   }
// );

// const jira_access_token = JiraClient.oauth_util.swapRequestTokenWithAccessToken(
//   {
//     host: 'box007.atlassian.net',
//     oauth: {
//       token: 'NYTFwTxYDYwXzZaRYWExh3yCy2iRjG4t',
//       token_secret: 'miPlYFlmJRtshRxNLNfWtg94MsjdjVYE',
//       oauth_verifier: 'WRg4sK',
//       consumer_key: 'Jscriber',
//       private_key:
//         '-----BEGIN RSA PRIVATE KEY-----\n' +
//         'MIICXAIBAAKBgQCkEF7VPHG9/MayKFj6Jp6TM6yx97jYW+sFEFH1E/+40XQ+xTyeEiqaNeK61SCQm7J+sH4WuO6/xDawp0o2NMh6OTgqgerJyBcs3Calnq9gh/Ucs6CLD0uk3tXub2PqDiU75W+Y0eQGNerI6WA4t5zPHemWH6oTtcLvrKXFUkL6ewIDAQABAoGAHFsT+Ojkg8CvmtUsY7fPCoQQ4gV9ti9U1GA4uhIFzayt2bd/PZbINDUCBeaWJUgztn/MmyLFaPGBvlB7nBjNWUOb8wUYrRfqUpMyE1gwMn/LHTZV6KM9I8vlRzTGl4O+g3b4rqVLoDOrs9IlEogyw0dEDrXYjkUO3iEnQ6SccMkCQQDY2WsF2Qw5g3fn/yXb+uiBlx8nG2dICPTmtAR/mK/Mk/q/JMeYr5huynaaJV0aeS/etd/E8z2gk8u7vQjw1BifAkEAwa9CuhIB43qhpBCR0AzBQHuTKA52lagYvv7s5Wy0RUX3XpCpoJM0otqhxw/mow3NK9NR9qd3DgoGiW73jW9kpQJAVenF4ho9Iqg4oFzRNhdxeK5T9F2CDOMnjCO0SI1I0Uerp4E95vti7DogxS+adHuhAJ6UGma4et8zb50UZr3RRwJAZvJS0zfTDSgXVm8AMcc1yKJmOzpEyZMJZCt3mxJGVzOzIe5eWt0jcxQmPPo0qqIhVZQC0sl8PFgT1WTH68MziQJBALfCg9QJKLf6XDZOvPUJlZGD1PY0Zcmkl455x6vZRNXtblh+rgaLnqMmKBiB8vjXNsuLql/h7pcIux6QeC5amvc=\n' +
//         '-----END RSA PRIVATE KEY-----',
//     },
//   },
//   function (error, accessToken) {
//     console.log(accessToken);
//   }
// );

// console.log(jira_access_token);

// var jira = new JiraClient({
//   host: 'box007.atlassian.net',
//   oauth: {
//     consumer_key: 'Jscriber',
//     private_key:
//       '-----BEGIN RSA PRIVATE KEY-----\n' +
//       'MIICXAIBAAKBgQCkEF7VPHG9/MayKFj6Jp6TM6yx97jYW+sFEFH1E/+40XQ+xTyeEiqaNeK61SCQm7J+sH4WuO6/xDawp0o2NMh6OTgqgerJyBcs3Calnq9gh/Ucs6CLD0uk3tXub2PqDiU75W+Y0eQGNerI6WA4t5zPHemWH6oTtcLvrKXFUkL6ewIDAQABAoGAHFsT+Ojkg8CvmtUsY7fPCoQQ4gV9ti9U1GA4uhIFzayt2bd/PZbINDUCBeaWJUgztn/MmyLFaPGBvlB7nBjNWUOb8wUYrRfqUpMyE1gwMn/LHTZV6KM9I8vlRzTGl4O+g3b4rqVLoDOrs9IlEogyw0dEDrXYjkUO3iEnQ6SccMkCQQDY2WsF2Qw5g3fn/yXb+uiBlx8nG2dICPTmtAR/mK/Mk/q/JMeYr5huynaaJV0aeS/etd/E8z2gk8u7vQjw1BifAkEAwa9CuhIB43qhpBCR0AzBQHuTKA52lagYvv7s5Wy0RUX3XpCpoJM0otqhxw/mow3NK9NR9qd3DgoGiW73jW9kpQJAVenF4ho9Iqg4oFzRNhdxeK5T9F2CDOMnjCO0SI1I0Uerp4E95vti7DogxS+adHuhAJ6UGma4et8zb50UZr3RRwJAZvJS0zfTDSgXVm8AMcc1yKJmOzpEyZMJZCt3mxJGVzOzIe5eWt0jcxQmPPo0qqIhVZQC0sl8PFgT1WTH68MziQJBALfCg9QJKLf6XDZOvPUJlZGD1PY0Zcmkl455x6vZRNXtblh+rgaLnqMmKBiB8vjXNsuLql/h7pcIux6QeC5amvc=\n' +
//       '-----END RSA PRIVATE KEY-----',
//     token: jiraAccess.accessToken,
//     token_secret: oAuth.token_secret,
//   },
// });

// module.exports = jira;

// // const JiraCredentials = require('../jiraCredentials.json');
// const authenticate = new JiraClient({
//   host: 'box007.atlassian.net',
//   strictSSL: true,
//   basic_auth: {
//     email: process.env.EMAIL || '', // JiraCredentials.email,
//     api_token: process.env.API_TOKEN || '', // JiraCredentials.api_token,
//   },
// });

// module.exports = authenticate;
