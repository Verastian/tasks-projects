const router = require("express").Router();
const passport = require("passport");
const httpStatus = require('http-status')

const config = require('../config/env');
const { authController } = require("../controllers");
const { validateFields, validateSignUp, validateSignIn } = require("../validators/auth.validators");

router.get("/success", authController.succesAuth);
router.get("/failed", authController.failedAuth);
router.post('/signup', [validateSignUp, validateFields], authController.signUp);
router.post('/signin', [validateSignIn, validateFields], passport.authenticate('signin'), authController.succesAuth);
router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: config.CLIENT_URI,
    failureRedirect: "api/auth/failed",
})
);
router.get("/github", passport.authenticate("github", { scope: ['profile', 'user:email'] }));
router.get("/github/callback", passport.authenticate("github", {
    successRedirect: config.CLIENT_URI,
    failureRedirect: "api/auth/failed",
})
);
router.get("/logout", authController.logout);

// router.get("/someroute", passport.authenticate('jwt', { session: false }), authController.succesAuth);

module.exports = router