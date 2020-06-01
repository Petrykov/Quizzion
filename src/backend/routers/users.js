// const fs = require("fs");
// const jwt = require("jsonwebtoken");
let router = module.exports = require('express').Router();
const md5 = require('md5');
const axios = require('axios');
var authenticateUser;
var token;
var uid;
const baseUrl="https://lab.dev.easion.nl/backend/api/v5"

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

    if (req.body.username == undefined) { rsp.status(500).json({ error: "Missing username" }) };
    if (req.body.password == undefined) { rsp.status(500).json({ error: "Missing password" }) };

    var hashPassword = md5(req.body.password)
    axios.post(`${baseUrl}/account/access`, {
        username: req.body.username,
        password: hashPassword
    })
        .then(function (res) {
            token = res.data.token
            uid = res.data.authenticate.uid
            axios.defaults.headers.common['X-CSRFToken'] = token;
            axios.defaults.headers.common['X-Database'] = 'lab';
            axios.get(`${baseUrl}/user/${uid}`)
                .then( function(res){
                    authenticateUser = res.data.user
                    rsp.status(200).send(authenticateUser)
                })
                .catch(error => rsp.status(500).send(error))
        })
        .catch(error => rsp.status(500).send(error));
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
    if(authenticateUser==null){
        rsp.status(400).send("no user logged in")
    }
    axios.defaults.headers.common['X-CSRFToken'] = token;
    axios.delete(`${baseUrl}/account/access`)
    .then(res => rsp.status(200).send(res.data.messages))
    .catch(error => rsp.status(500).send(error))
})
