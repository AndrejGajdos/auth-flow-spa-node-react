const includes = require('lodash/includes');

const url =
  includes(process.env.NODE_ENV, 'prod')
    ? 'https://auth-flow-in-spa.herokuapp.com'
    : `http://localhost:${process.env.PORT || 1337}`;

module.exports.facebookAuth = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${url}/auth/facebook/callback`,
};

module.exports.redisConfig = {
  host: process.env.REDIS_HOST,
  port: 14939,
  password: process.env.REDIS_PASSWORD,
};
