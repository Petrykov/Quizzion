let router = module.exports = require('express').Router();

// all the request for here

//login/logout functionality can work fine without `Authorization` token
router.use('/user', require('./users'));
router.use('/respondent', require('./respondent'));

// no other requests can go further if the `Authorization` token was not provided
router.use( (req, rsp, next) => {
    if (req.headers.authorization === undefined) {
        rsp.status(401).json({error: "Authorization token was not provided"});
        return;
    }
    next();
});

router.use('/quizzes', require('./quizzes'));
router.use('/', require('./questions'));
router.use('/', require('./answers'));
