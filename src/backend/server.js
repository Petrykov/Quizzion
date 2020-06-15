const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');

// Create an express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Start accepting requests
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Quizzion backend listening on port ' + listener.address().port);
});

const server_socket = io(listener);

const db = {
    quizzes: []
};

server_socket.on('connection', (socket) => {

    socket.on('connect-t', function (data) {
        console.log("New user connected to TCP socket");
        let quizmaster = false;
        if (data.name === undefined) quizmaster = true;

        if (quizmaster) {
            db.quizzes.push({
                quizMaster: socket.id,
                quiz_id: data.quiz_id,
                users: []
            });
        } else {
            let quiz_master_id = '-';
            for (let i = 0; i < db.quizzes.length; i++) {
                if (db.quizzes[i].quiz_id === data.quiz_id) {
                    db.quizzes[i].users.push({
                        name: data.name,
                        id: socket.id
                    });
                    quiz_master_id = db.quizzes[i].quizMaster;
                }
            }
            if (quiz_master_id !== '-') {
                console.log('sending to quiz master');
                server_socket.to(quiz_master_id).emit('user-connected', {
                    name: data.name
                })
            }
        }
    });

    socket.on('start', function () {
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quizMaster === socket.id) {
                for (let j = 0; j < db.quizzes[i].users.length; j++) {
                    server_socket.to(db.quizzes[i].users[j].id).emit('start');
                }
            }
        }
    });

    socket.on('quiz-done', function (data) {
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quiz_id === data.quiz_id) {

                server_socket.to(db.quizzes[i].quizMaster).emit('user-done-quiz', {name: data.name});
            }
        }
    })

    socket.on('show-results', function (data) {
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quiz_id === data.quiz_id) {
                for (let j = 0; j < db.quizzes[i].users.length; j++) {
                    server_socket.to(db.quizzes[i].users[j].id).emit('show-results')
                }
            }
        }
    })

    socket.on('disconnect', function () {
        console.log("client disconnected");
    })
});

app.use('/', require('./routers/websocket'));

//all the requests in
app.use('/api', require('./routers/index'));

module.exports = app;
