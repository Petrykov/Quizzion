// const fs = require("fs");
// const jwt = require("jsonwebtoken");
let router = module.exports = require('express').Router();
const axios = require('axios');
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5"

/**
 * @api {post} /user/login Login access for customer
 * @apiName Login
 * @apiGroup User
*
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} password  Password of the User.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

router.post('/login', (req, rsp) => {
    var authenticateUser;
    var token;
    var uid;

    if (req.body.username == undefined) { rsp.status(400).json({ error: "Missing username" }) };
    if (req.body.password == undefined) { rsp.status(400).json({ error: "Missing password" }) };

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
                    rsp.status(200).send(authenticateUser)
                })
                .catch(error => rsp.status(400).send(error))
        })
        .catch(error => rsp.status(400).send(error)); //wrong credential
});

/**
 * @api {delete} /user/logout Logout access for customer
 * @apiName Logout
 * @apiGroup User
*
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} password  Password of the User.
 */

router.delete('/logout', (req, rsp) => {

    //need to verify the token if it's a correct one

    if (req == null) {
        rsp.status(400).send("no user logged in")
    }
    axios.delete(`${baseUrl}/account/access`, {
        headers: {
            'X-CSRFToken': req.token
        }
    })
        .then(res => rsp.status(200).send(res.data.messages))
        .catch(error => rsp.send(error))

})
