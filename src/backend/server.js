const express = require('express');
const bodyParser = require('body-parser');

// Create an express app
const app = express();

app.use(bodyParser.json());

// Start accepting requests
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Quizzion backend listening on port ' + listener.address().port);
});

//all the requests in
app.use('/api',require('./routers/index'));

module.exports = app;