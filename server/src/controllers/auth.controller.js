const { usersService } = require("../services/");
const httpStatus = require("http-status");
const { wrapperAsync } = require("../utils/wrappers.util");
const { createToken } = require("../utils/token.util");
const { CLIENT_URI } = require("../config/env");
const { User } = require("../models");

module.exports = {
    signUp: wrapperAsync(async (req, res) => {
        const user = new User(req.body.user)
        user.authSocial = false
        const newUser = await usersService.createUser(user)

        if (!newUser) {
            const error = new Error('Could not create user!')
            return res.status(httpStatus.BAD_REQUEST)
                .json({
                    success: false,
                    message: error.message,
                });
        }
        res.status(httpStatus.OK)
            .json({
                success: true,
                message: "The User was successfuly created"
            });
    }),
    succesAuth: wrapperAsync(async (req, res) => {
        if (!req.user) {
            const error = new Error('User is not registered')
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: error.message,
                user: req.user,

            });
        }
        const { email } = req.user
        const expiresIn = 60 * 60 * 24;
        const token = createToken({ email }, expiresIn);
        res.status(httpStatus.OK).json({
            success: true,
            message: "successfull",
            user: req.user,
            token
            //   cookies: req.cookies
        });

    }),
    failedAuth: wrapperAsync(async (req, res) => {
        const error = new Error('failure')
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: error.message,
            user: req.user,
        });
    }),
    logout: wrapperAsync(async (req, res) => {
        // console.log('logout')
        // req.logout();
        // res.redirect(CLIENT_URI);
        req.logout(function (err) {
            if (err) { return next(err); }
            // handle success
            res.redirect(CLIENT_URI);
        });
    }),
    // 

}

