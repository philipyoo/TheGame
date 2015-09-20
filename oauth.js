var ids = {
  facebook: {
    ENV
    clientID: ENV['FACEBOOK_CLIENT_ID'],
    clientSecret: ENV['FACEBOOK_CLIENT_SECRET'],
    callbackURL: 'http://localhost:4000/auth/facebook/callback'
  },

  google: {
    returnURL: 'http://localhost:4000/auth/google/callback',
    realm: 'http://localhost:4000'
  }
};

module.exports = ids;


