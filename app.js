console.log('Om Ganeshay Namah!');
const express = require('express');
const path = require('path');
const JiraClient = require('jira-connector');
var session = require('express-session');

const dashboardRouter = require('./routes/dashboardRoutes');
const aboutRouter = require('./routes/aboutRoutes');
const apiRouter = require('./routes/apiRoutes');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(express.static('assets'));
app.use(express.static(path.join('node_modules/bootstrap/dist/css')));
app.use(express.static(path.join('node_modules/toastr/build')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/login/connect', (req, res) => {
  JiraClient.oauth_util.getAuthorizeURL(
    {
      host: 'box007.atlassian.net',
      oauth: {
        consumer_key: 'Jscriber',
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          'MIICXAIBAAKBgQCkEF7VPHG9/MayKFj6Jp6TM6yx97jYW+sFEFH1E/+40XQ+xTyeEiqaNeK61SCQm7J+sH4WuO6/xDawp0o2NMh6OTgqgerJyBcs3Calnq9gh/Ucs6CLD0uk3tXub2PqDiU75W+Y0eQGNerI6WA4t5zPHemWH6oTtcLvrKXFUkL6ewIDAQABAoGAHFsT+Ojkg8CvmtUsY7fPCoQQ4gV9ti9U1GA4uhIFzayt2bd/PZbINDUCBeaWJUgztn/MmyLFaPGBvlB7nBjNWUOb8wUYrRfqUpMyE1gwMn/LHTZV6KM9I8vlRzTGl4O+g3b4rqVLoDOrs9IlEogyw0dEDrXYjkUO3iEnQ6SccMkCQQDY2WsF2Qw5g3fn/yXb+uiBlx8nG2dICPTmtAR/mK/Mk/q/JMeYr5huynaaJV0aeS/etd/E8z2gk8u7vQjw1BifAkEAwa9CuhIB43qhpBCR0AzBQHuTKA52lagYvv7s5Wy0RUX3XpCpoJM0otqhxw/mow3NK9NR9qd3DgoGiW73jW9kpQJAVenF4ho9Iqg4oFzRNhdxeK5T9F2CDOMnjCO0SI1I0Uerp4E95vti7DogxS+adHuhAJ6UGma4et8zb50UZr3RRwJAZvJS0zfTDSgXVm8AMcc1yKJmOzpEyZMJZCt3mxJGVzOzIe5eWt0jcxQmPPo0qqIhVZQC0sl8PFgT1WTH68MziQJBALfCg9QJKLf6XDZOvPUJlZGD1PY0Zcmkl455x6vZRNXtblh+rgaLnqMmKBiB8vjXNsuLql/h7pcIux6QeC5amvc=\n' +
          '-----END RSA PRIVATE KEY-----',
      },
    },
    function (error, oauth) {
      console.log(oauth);
      if (error) {
        console.log(error.data);
        res.send('Error getting OAuth access token');
      } else {
        req.session.oauthToken = oauth.token;
        req.session.oauthTokenSecret = oauth.token_secret;
        res.redirect(301, oauth.url);
      }
    }
  );
});

app.post('/authorize', (req, res) => {
  console.log(req.body);
  JiraClient.oauth_util.swapRequestTokenWithAccessToken(
    {
      host: 'box007.atlassian.net',
      oauth: {
        token: req.session.oauthToken,
        token_secret: req.session.oauthTokenSecret,
        oauth_verifier: req.body.oauth_verifier,
        consumer_key: 'Jscriber',
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          'MIICXAIBAAKBgQCkEF7VPHG9/MayKFj6Jp6TM6yx97jYW+sFEFH1E/+40XQ+xTyeEiqaNeK61SCQm7J+sH4WuO6/xDawp0o2NMh6OTgqgerJyBcs3Calnq9gh/Ucs6CLD0uk3tXub2PqDiU75W+Y0eQGNerI6WA4t5zPHemWH6oTtcLvrKXFUkL6ewIDAQABAoGAHFsT+Ojkg8CvmtUsY7fPCoQQ4gV9ti9U1GA4uhIFzayt2bd/PZbINDUCBeaWJUgztn/MmyLFaPGBvlB7nBjNWUOb8wUYrRfqUpMyE1gwMn/LHTZV6KM9I8vlRzTGl4O+g3b4rqVLoDOrs9IlEogyw0dEDrXYjkUO3iEnQ6SccMkCQQDY2WsF2Qw5g3fn/yXb+uiBlx8nG2dICPTmtAR/mK/Mk/q/JMeYr5huynaaJV0aeS/etd/E8z2gk8u7vQjw1BifAkEAwa9CuhIB43qhpBCR0AzBQHuTKA52lagYvv7s5Wy0RUX3XpCpoJM0otqhxw/mow3NK9NR9qd3DgoGiW73jW9kpQJAVenF4ho9Iqg4oFzRNhdxeK5T9F2CDOMnjCO0SI1I0Uerp4E95vti7DogxS+adHuhAJ6UGma4et8zb50UZr3RRwJAZvJS0zfTDSgXVm8AMcc1yKJmOzpEyZMJZCt3mxJGVzOzIe5eWt0jcxQmPPo0qqIhVZQC0sl8PFgT1WTH68MziQJBALfCg9QJKLf6XDZOvPUJlZGD1PY0Zcmkl455x6vZRNXtblh+rgaLnqMmKBiB8vjXNsuLql/h7pcIux6QeC5amvc=\n' +
          '-----END RSA PRIVATE KEY-----',
      },
    },
    function (error, accessToken) {
      console.log(accessToken);
      req.session.accessToken = accessToken;
      console.log(req.session);
    }
  );
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.use('/', dashboardRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}/`);
});
