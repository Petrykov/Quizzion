let router = module.exports = require('express').Router();

/**
 * @api {get} /user/login To login to the server
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {some_parameter} for example: id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.get('/login', (req, rsp) => {
    rsp.status(200).send("Good");
});
