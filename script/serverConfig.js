const includes = require('lodash/includes');

const url =
  includes(process.env.NODE_ENV, 'prod')
    ? 'https://auth-flow-in-spa.herokuapp.com'
    : `http://localhost:${process.env.PORT || 1337}`;

module.exports.facebookAuth = {
  clientID: '',
  clientSecret: '',
  callbackURL: `${url}/auth/facebook/callback`,
};

module.exports.redisConfig = {
  host: '',
  port: 14939,
  password: '',
};

module.exports.sK = '';
