const JiraClient = require('jira-connector');
const jiraConfig = require('./../jiraConfig.json');
const sslConfig = require('./../privateConfig.json');
const privateKey = process.env.PRIVATEKEY;
const OAuth = require('oauth').OAuth;

exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};

var consumer = new OAuth(
  'https://' + jiraConfig.jiraHost + '/plugins/servlet/oauth/request-token',
  'https://' + jiraConfig.jiraHost + '/plugins/servlet/oauth/access-token',
  jiraConfig.consumerKey,
  // privateKey.replace(/\\n/gm, '\n'),
  JSON.parse(privateKey),
  '1.0',
  'https://jirascribe.herokuapp.com/login/callback',
  'RSA-SHA1',
  null,
  null
);

exports.requestToken = (request, response) => {
  consumer.getOAuthRequestToken(function (
    error,
    oauthToken,
    oauthTokenSecret,
    results
  ) {
    if (error) {
      console.log(error.data);
      response.send('Error getting OAuth access token');
    } else {
      request.session.oauthRequestToken = oauthToken;
      request.session.oauthRequestTokenSecret = oauthTokenSecret;
      response.redirect(
        'https://' +
          jiraConfig.jiraHost +
          '/plugins/servlet/oauth/authorize?oauth_token=' +
          oauthToken
      );
    }
  });
};

exports.jiraCallback = (request, response) => {
  consumer.getOAuthAccessToken(
    request.session.oauthRequestToken,
    request.session.oauthRequestTokenSecret,
    request.query.oauth_verifier,
    function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        console.log(error.data);
        response.send('error getting access token');
      } else {
        request.session.oauthAccessToken = oauthAccessToken;
        request.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        response.redirect('https://' + request.get('host'));
      }
    }
  );
};

// exports.requestToken = (req, res) => {
//   JiraClient.oauth_util.getAuthorizeURL(
//     {
//       host: jiraConfig.jiraHost,
//       oauth: {
//         consumer_key: jiraConfig.consumerKey,
//         private_key: JSON.parse(privateKey),
//         grant_type: 'refresh_token',
//       },
//     },
//     function (error, oauth) {
//       if (error) {
//         console.log(error.data);
//         res.send('Error getting OAuth access token');
//       } else {
//         req.session.oauthToken = oauth.token;
//         req.session.oauthTokenSecret = oauth.token_secret;
//         res.redirect(301, oauth.url);
//       }
//     }
//   );
// };

// exports.jiraCallback = (req, res) => {
//   JiraClient.oauth_util.swapRequestTokenWithAccessToken(
//     {
//       host: jiraConfig.jiraHost,
//       oauth: {
//         token: req.query.oauth_token,
//         token_secret: req.session.oauthTokenSecret,
//         oauth_verifier: req.query.oauth_verifier,
//         consumer_key: jiraConfig.consumerKey,
//         private_key: JSON.parse(privateKey),
//       },
//     },
//     function (error, accessToken) {
//       if (error) {
//         res.status(error.statusCode).send(error.data);
//       }
//       console.log(accessToken);
//       req.session.accessToken = accessToken;
//       res.redirect('https://' + req.get('host'));
//     }
//   );
// };
