const JiraClient = require('jira-connector');
const jiraConfig = require('./../jiraConfig.json');
const sslConfig = require('./../privateConfig.json');
const privateKey = process.env.PRIVATEKEY || sslConfig.privateKey;

exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};

exports.requestToken = (req, res) => {
  JiraClient.oauth_util.getAuthorizeURL(
    {
      host: jiraConfig.jiraHost,
      oauth: {
        consumer_key: jiraConfig.consumerKey,
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          privateKey +
          '-----END RSA PRIVATE KEY-----',
      },
    },
    function (error, oauth) {
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
};

exports.jiraCallback = (req, res) => {
  JiraClient.oauth_util.swapRequestTokenWithAccessToken(
    {
      host: jiraConfig.jiraHost,
      oauth: {
        token: req.query.oauth_token,
        token_secret: req.session.oauthTokenSecret,
        oauth_verifier: req.query.oauth_verifier,
        consumer_key: jiraConfig.consumerKey,
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          privateKey +
          '-----END RSA PRIVATE KEY-----',
      },
    },
    function (error, accessToken) {
      if (error) {
        res.status(error.statusCode).send(error.data);
      }
      console.log(accessToken);
      req.session.accessToken = accessToken;
      res.redirect('http://localhost:3000/');
    }
  );
};
