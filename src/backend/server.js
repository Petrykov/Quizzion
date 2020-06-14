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

let sock = 'empty';
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
        console.log(db);
    });
    socket.on('disconnect', function () {
        console.log("client disconnected");
    })
});

// app.use((req, rsp, next) => {
//     req.server_socket = server_socket;
//     server_socket.on('connection', (socket) => {
//
//         console.log("Established connection");
//         console.log(socket);
//
//         socket.on('connect', (data) => {
//             console.log('connected someone');
//             console.log("data:");
//             console.log(data);
//
//         });
//     });
//     next();
//     next();
// });

app.get('/sosok', (req, rsp) => {
    rsp.status(200).send(sock);
})

app.use('/', require('./routers/websocket'));

//all the requests in
app.use('/api', require('./routers/index'));

module.exports = app;
