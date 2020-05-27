let router = module.exports = require('express').Router();

router.get('/test', (req, rsp) => {
    rsp.status(200).send("Good");
});
