const jiraConfig = require('./../jiraConfig.json');
const OAuth = require('oauth').OAuth;

let privateKey;
if (process.env.NODE_ENV === 'development') {
  const privateConfig = require('./../privateConfig.json');
  privateKey = privateConfig.privateKey;
}
else {
  privateKey = JSON.parse(process.env.PRIVATEKEY);
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};

var consumer = new OAuth(
  'https://' + jiraConfig.jiraHost + '/plugins/servlet/oauth/request-token',
  'https://' + jiraConfig.jiraHost + '/plugins/servlet/oauth/access-token',
  jiraConfig.consumerKey,
  privateKey,
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
