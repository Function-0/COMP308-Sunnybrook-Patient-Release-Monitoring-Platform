//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    // db: 'mongodb://localhost/courses-db',
    db: 'mongodb+srv://admin:michaelishere@function-0.ab0ua.mongodb.net/comp308-sunnybrook-db?retryWrites=true&w=majority',
    sessionSecret: 'developmentSessionSecret',
    secretKey: 'real_secret'
};
