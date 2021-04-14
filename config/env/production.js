//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    // db: 'mongodb://localhost/courses-db',
    db: process.env.HEROKU_MONGODB_CONNECTION_PRODUCTION,
    sessionSecret: 'developmentSessionSecret',
    secretKey: 'real_secret'
};
