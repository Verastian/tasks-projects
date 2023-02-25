const cors = require('cors');
const express = require('express');
const routes = require('../routes')
const expressSession = require('express-session');
const errorHandler = require('../middlewares/errorHandler');
const env = require('../config/env');
const { User } = require('../models');
const passport = require('passport');
require('../utils/passport.util');

const expressRun = ({ app, db, mongoSessionStore }) => {

    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user._id);
        });
    });
    passport.deserializeUser((id, done) => {
        process.nextTick(() => {
            User.findById(id, (err, user) => {
                if (!err) done(null, user);
                else done(err, null);
            });
        });
    });

    // Set static files folder

    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json({ limit: '50mb' }));

    app.set("strict routing", true);

    // app.use(cors());

    app.use(
        cors({
            origin: "http://localhost:5173",
            methods: "GET,POST,PUT,DELETE",
            credentials: true,
        })
    );

    app.use(expressSession({
        name: env.COOKIE_NAME,
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
        cookie: {
            httpOnly: false,
            maxAge: 300000, // 5 min
        },
        store: mongoSessionStore
    }));

    // Enable passport authentication, session and plug strategies
    app.use(passport.initialize());
    app.use(passport.session());


    // configuramos nuestras rutas
    const prefix = env.API.PREFIX
    app.use(prefix, routes)


    // // Controlador de errores
    // app.use(errorHandler)

    // // Manejador de errores por defecto de Express
    // app.use((error, req, res, next) => {
    //     res.status(error.status || 500).send({ error: error.message });
    // });

    // Error handlers
    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(err.name, err.message);
        process.exit(1);
    });

    process.on('uncaughtException', (err) => {
        console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
        console.log(err.name, err.message);
        process.exit(1);
    });

}
module.exports = expressRun