# MERN Authentication Boilerplate
This repo is a basic Mongo, Express, React & Redux, and Node authentication. See the instructions below for configuration.

# Setup Instructions
* Clone Repo
* cd MERN-Authentication-Boilerplace
* npm i
* cd client && npm i
* return to root dir. and then mkdir config && cd config && touch keys.js passport.js

## /config/keys.js
```
module.exports = {
    mongoURI: "mongodb://localhost:27017/db-name",
    secretOrKey: "secretkeyforauthentication"
  };
```

## /config/passport.js
```
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");

const keys = require("../config/keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
```
