const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const passport = require("passport");
const env = require("../config/env");
const { User } = require("../models");
const { usersService } = require("../services");
// google
passport.use("google",
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: env.GOOGLE_CALLBACK,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const { name, emails, photos, provider } = profile
                const email = emails[0].value
                const nameUser = name.givenName
                const photo = photos[0].value;
                const isConfirmed = emails[0].verified
                if (!email) return done(new Error('Failed to receive email from Google. Please try again :('));

                // const user = await User.findOne({ 'email': email });
                const user = await usersService.getUserByEmail(email)

                if (user) {
                    await user.save();//TODO: for the moment to avoid duplicate user in the database
                    return done(null, user);
                }
                const newUser = new User({
                    name: nameUser,
                    picture: photo,
                    authSocial: true,
                    email: email,
                    confirm: isConfirmed
                });


                return done(null, await usersService.createUser(newUser));
            } catch (verifyErr) {
                done(verifyErr);
            }
        }
    )
);
// gitHub
passport.use("github",
    new GithubStrategy(
        {
            clientID: env.GHUB_CLIENT_ID,
            clientSecret: env.GHUB_CLIENT_SECRET,
            callbackURL: env.GHUB_CALLBACK,
            passReqToCallback: true,
            scope: ['user:email'],

        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const { name, avatar_url, provider } = profile._json
                const email = profile.emails[0].value

                if (!email) return done(new Error('Failed to receive email from Google. Please try again :('));

                // const user = await User.findOne({ email });
                const user = await usersService.getUserByEmail(email)

                if (user) {
                    await user.save();//TODO: for the moment to avoid duplicate user in the database
                    return done(null, user);
                }
                const newUser = new User({
                    name,
                    picture: avatar_url,
                    authSocial: true,
                    email: email ? email : null,
                    confirm: true

                });
                return done(null, await usersService.createUser(newUser));

            } catch (verifyErr) {
                done(verifyErr);
            }
        }
    )
);
// local SignIn
passport.use('signin',
    new LocalStrategy(
        {
            passwordField: 'password',
            usernameField: 'email',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return done(null, false);
                }
                // user.authSocial = false;
                user.password = password;
                await usersService.createUser(user)
                return done(null, user);

            } catch (verifyErr) {
                done(verifyErr);
            }

        }
    )
);
passport.use(
    'jwt',
    new JWTStrategy({
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token')
    }, async (token, done) => {
        try {
            return done(null, token.user)
        } catch (e) {
            done(error)
        }
    }))
module.exports = passport;