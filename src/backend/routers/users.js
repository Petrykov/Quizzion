let router = module.exports = require('express').Router();
const axios = require('axios');
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5";

/**
 * @api {post} /user/login Login for quiz master
 * @apiGroup User
 * @apiParam {String} username Username of the User.
 * @apiParam {String} password  Password hash of the User.
 * @apiSuccess {Object} user Authenticated User
 * @apiSuccess {String} user.uh User hash of authenticated User
 * @apiSuccess {String} user.username  Username of authenticated User
 * @apiSuccess {String} user.email Email of authenticated User
 * @apiSuccess {String} user.middlename Middle name of authenticated User
 * @apiSuccess {String} user.lastname Last name of authenticated User
 * @apiSuccess {String} user.token Token of authenticated User
 * @apiError (400) {String} message Bad request
 */

router.post('/login', (req, rsp) => {
    var authenticateUser;
    var token;
    var uid;

    if (req.body.username == undefined) { rsp.status(400).json({ error: "Missing username" }); return;};
    if (req.body.password == undefined) { rsp.status(400).json({ error: "Missing password" }); return;};

    axios.post(`${baseUrl}/account/access`, {
        username: req.body.username,
        password: req.body.password
    })
        .then(function (res) {
            token = res.data.token
            uid = res.data.authenticate.uid

            axios.get(`${baseUrl}/user/${uid}`, {
                headers: {
                    'X-CSRFToken': token,
                    'X-Database': 'lab'
                }
            })
                .then(function (res) {
                    authenticateUser = res.data.user[0]
                    authenticateUser.token = token
                    rsp.status(200).send(authenticateUser)
                })
                .catch(error => rsp.status(400).send(error))
        })
        .catch(error => rsp.status(400).send(error)); //wrong credential
});

/**
 * @api {delete} /user/logout Logout for quiz master
 * @apiGroup User
 * @apiHeader {String} authorization Quiz master's token.
 * @apiSuccess {Object} message Log out successfully!
 * @apiError (400) {String} message Bad Request
 */
router.delete('/logout', (req, rsp) => {

    //need to verify the token if it's a correct one

    axios.delete(`${baseUrl}/account/access`, {
        headers: {
            'X-CSRFToken': req.headers.authorization
        }
    })
        .then(res => rsp.status(200).send({message: "log out successfully!"}))
        .catch(error => rsp.status(400).send(error))

})
