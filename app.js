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
          'key\n' +
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
          'key\n' +
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
