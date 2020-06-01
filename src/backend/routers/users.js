// const fs = require("fs");
// const jwt = require("jsonwebtoken");
let router = module.exports = require('express').Router();
const md5 = require('md5');
const axios = require('axios');

/**
 * @api {post} /user/login To login to the server
 * @apiName Login
 * @apiGroup User
*
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} password  Password of the User.
 */

router.post('/login', (req, rsp) => {
    var token;
    var uid;
    var authenticateUser;

    if (req.body.username == undefined) { rsp.status(500).json({ error: "Missing username" }) };
    if (req.body.password == undefined) { rsp.status(500).json({ error: "Missing password" }) };

    var hashPassword = md5(req.body.password)
    axios.post('https://lab.dev.easion.nl/backend/api/v5/account/access', {
        username: req.body.username,
        password: hashPassword
    })
        .then(function (res) {
            token = res.data.token
            uid = res.data.authenticate.uid
            axios.defaults.headers.common['X-CSRFToken'] = token;
            axios.defaults.headers.common['X-Database'] = 'lab';
            axios.get(`https://lab.dev.easion.nl/backend/api/v5/user/${uid}`)
                .then( function(res){
                    authenticateUser = res.data.user
                    rsp.status(200).send(authenticateUser)
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error));
});
