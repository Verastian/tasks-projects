const { body, param, validationResult } = require('express-validator');
const httpStatus = require("http-status");
const { usersService } = require('../services');


module.exports = {
    validateSignUp: [
        body('*.name').exists().notEmpty(),
        body('*.password').exists().isLength({ min: 6, max: 10 }).withMessage('password less than 6 characters').isAlphanumeric(),
        body('*.password_confirm').exists().custom((value, { req }) => {
            if (value !== req.body.user.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
        body('*.email').exists().isEmail().custom(async (value) => {
            const user = await usersService.getUserByEmail(value)
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        }),
    ],

    validateSignIn: [
        body('email')
            .exists()
            .notEmpty()
            .withMessage('you must enter a email')
            .if((value) => value)
            .isEmail()
            .withMessage('The email is invalid')
            .custom(async (value) => {
                const user = await usersService.getUserByEmail(value)
                if (!user) {
                    return Promise.reject('The email of the entered user is not registered.');
                }
                return true;
            }),
        body('password')
            .if(body('email').notEmpty().custom(async (value) => {
                const user = await usersService.getUserByEmail(value)
                if (!user) {
                    return false
                }
                return true;
            }))
            .trim()
            .exists()
            .notEmpty()
            .withMessage('you must enter a password')
            .custom(async (value, { req }) => {
                const { email } = req.body
                // if (!email) {
                //     return Promise.reject(`You must first enter a valid email`);
                // }
                const userFound = await usersService.getUserByEmail(email);
                userFound.authSocial = false;
                if (userFound && userFound.password === null) {
                    return true
                }
                const matchPassword = await userFound.verifyPassword(value);
                if (!matchPassword && value !== '') {
                    return Promise.reject(`Enter the correct password for the user ${email}`);
                }
                return true;
            }),
    ],
    validateToken: [
        param("token")
            .exists()
            .notEmpty()
            .custom(async (value) => {
                const user = await usersService.getUser({ token: value });

                if (!user) {
                    return Promise.reject("invalid token");
                }
            }),
    ],


    validateFields: (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            // console.log(error.errors)
            res.status(httpStatus.BAD_REQUEST);
            res.send({
                message: error.array()
            });
        }
    },
};
