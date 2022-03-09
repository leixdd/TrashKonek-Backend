const passport = require('passport')
const passportJWT = require("passport-jwt")
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const userRepository = require('../repositories/userRepository');

const _env = require('dotenv');
_env.config();

module.exports.initPassport = (app) => {
    app.use(passport.initialize());

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET // Specify a JWT secret in .env file
    }, (payload, done) => {
        userRepository.getUserID(payload._id, (err, user) => {
            if (err) return done(err, false);

            if (user) return done(null, user);

            return done(null, false);
        })
    }));

    passport.use('signin', new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: false
    },  (email, password, done) => {
         userRepository.getUserUsingEmail(email, (err, user) => {

            if (!user) return done(null, false, { message: "User is not existing" });

             userRepository.comparePassword(password, user.loginDetails.password, (err, match) => {
                 if (!match) return done(null, false, { message: "Login credentials are not matched" });
                 
                 return done(null, user, { message: "Login Successfuly" });
            });
            
        })
    }));

}