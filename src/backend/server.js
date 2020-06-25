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

const MAX_CLIENTS = 5;

server_socket.on('connection', (socket) => {

    socket.on('connect-t', function (data) {
        console.log("New user connected to TCP socket");
        console.log(data);
        console.log('----');
        let quizmaster = false;
        if (data.name === undefined) quizmaster = true;

        if (quizmaster) {
            db.quizzes.push({
                quizMaster: socket.id,
                quiz_id: data.quiz_id,
                started: false,
                users: []
            });
        } else {
            let quiz_master_id = '-';
            for (let i = 0; i < db.quizzes.length; i++) {
                if (db.quizzes[i].quiz_id === data.quiz_id) {

                    if(db.quizzes[i].started) {
                        server_socket.to(socket.id).emit('max-clients');
                        return;
                    }

                    for (let j = 0; j < db.quizzes[i].users.length; j++) {
                        if (db.quizzes[i].users[j].id === socket.id) {
                            db.quizzes[i].users[j].name = data.name;
                        }
                    }

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

    socket.on('client-connected', function (data) {
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quiz_id === data.quiz_id) {

                if (db.quizzes[i].users.length >= MAX_CLIENTS) {
                    server_socket.to(socket.id).emit('max-clients');
                    return;
                }

                if (db.quizzes[i].started) {
                    server_socket.to(socket.id).emit('quiz-already-started');
                    return;
                }

                db.quizzes[i].users.push({
                    id: socket.id
                });
            }
        }
    })

    socket.on('start', function () {
        console.log(".on START ");
        console.log('----');
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quizMaster === socket.id) {
                db.quizzes[i].started = true;
                for (let j = 0; j < db.quizzes[i].users.length; j++) {
                    server_socket.to(db.quizzes[i].users[j].id).emit('start');
                }
            }
        }
    });

    socket.on('stop', function () {
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quizMaster === socket.id) {
                for (let j = 0; j < db.quizzes[i].users.length; j++) {
                    server_socket.to(db.quizzes[i].users[j].id).emit('stop');
                    console.log('Stop to resp. to ' + db.quizzes[i].users[j].id + " name: " + db.quizzes[i].users[j].name);
                }
            }
            db.quizzes.splice(i,1);
        }
    });

    socket.on('quiz-done', function (data) {
        console.log(".on QUIZ DONE");
        console.log(data);
        console.log('----');
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quiz_id === data.quiz_id) {

                for (let j = 0; j < db.quizzes[i].users.length; j++) {
                    if (db.quizzes[i].users[j].id === socket.id) {
                        server_socket.to(db.quizzes[i].quizMaster).emit('user-done-quiz', {name: db.quizzes[i].users[j].name});
                    }
                }
            }
        }
    })

    socket.on('show-results', function (data) {
        console.log(".on SHOW-RESULTS");
        console.log(data);
        console.log('----');
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
        for (let i = 0; i < db.quizzes.length; i++) {
            if (db.quizzes[i].quizMaster === socket.id) {
                db.quizzes.splice(i,1);
                return;
            }

            for (let j = 0; j < db.quizzes[i].users.length; j++) {
                if (db.quizzes[i].users[j].id === socket.id) {
                    server_socket.to(db.quizzes[i].quizMaster).emit('user-disconnected', {name: db.quizzes[i].users[j].name})
                    db.quizzes[i].users.splice(i,1);
                }
            }

        }
    })
});

//all the requests in
app.use('/api', require('./routers/index'));

module.exports = app;
