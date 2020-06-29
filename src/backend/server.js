const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');

//Create an express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

//Start accepting requests
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Quizzion backend listening on port ' + listener.address().port);
});

const serverSocket = io(listener);

const db = {
  quizzes: []
};

const MAX_CLIENTS = 20;

serverSocket.on('connection', (socket) => {
  socket.on('connect-t', function(data) {
    let quizmaster = false;
    if (data.name === undefined) quizmaster = true;

    if (quizmaster) {
      console.log("Quiz master created a quiz room: " + data.quizId);
      db.quizzes.push({
        quizMaster: socket.id,
        quizId: data.quizId,
        started: false,
        users: []
      });
    } else {
      let quizMasterId = '-';
      for (let i = 0; i < db.quizzes.length; i++) {
        if (db.quizzes[i].quizId === data.quizId) {
          if (db.quizzes[i].started) {
            console.log('User ' + data.name + ' could not connect to quiz: ' + data.quizId + " because quiz has started");
            serverSocket.to(socket.id).emit('quiz-already-started');
            return;
          }

          for (let j = 0; j < db.quizzes[i].users.length; j++) {
            if (db.quizzes[i].users[j].id === socket.id) {
              db.quizzes[i].users[j].name = data.name;
              console.log('User ' + data.name + ' is assigned to quiz: ' + data.quizId);
            }
          }

          quizMasterId = db.quizzes[i].quizMaster;
        }
      }
      if (quizMasterId !== '-') {
        serverSocket.to(quizMasterId).emit('user-connected', {
          name: data.name
        });
      }
    }
  });

  socket.on('client-connected', function(data) {
    for (let i = 0; i < db.quizzes.length; i++) {
      if (db.quizzes[i].quizId === data.quizId) {
        if (db.quizzes[i].users.length >= MAX_CLIENTS) {
          console.log('New client that maximum number of clients exceeded');
          serverSocket.to(socket.id).emit('max-clients');
          return;
        }

        if (db.quizzes[i].started) {
          console.log('New client that quiz has started');
          serverSocket.to(socket.id).emit('quiz-already-started');
          return;
        }

        db.quizzes[i].users.push({
          id: socket.id
        });
      }
    }
  });

  socket.on('start', function() {
    for (let i = 0; i < db.quizzes.length; i++) {
      if (db.quizzes[i].quizMaster === socket.id) {
        db.quizzes[i].started = true;
        for (let j = 0; j < db.quizzes[i].users.length; j++) {
          console.log('Starting quiz to client: ' + db.quizzes[i].users[j].name + " quiz id : " + db.quizzes[i].quizId);
          serverSocket.to(db.quizzes[i].users[j].id).emit('start');
        }
      }
    }
  });

  socket.on('stop', function() {
    for (let i = 0; i < db.quizzes.length; i++) {
      if (db.quizzes[i].quizMaster === socket.id) {
        for (let j = 0; j < db.quizzes[i].users.length; j++) {
          serverSocket.to(db.quizzes[i].users[j].id).emit('stop');
          console.log('Stop the quiz to: ' + db.quizzes[i].users[j].name + ' with quizId: ' + db.quizzes[i].quizId)
         }
      }
      db.quizzes.splice(i, 1);
    }
  });

  socket.on('quiz-done', function(data) {
    for (let i = 0; i < db.quizzes.length; i++) {
      if (db.quizzes[i].quizId === data.quizId) {
        for (let j = 0; j < db.quizzes[i].users.length; j++) {
          if (db.quizzes[i].users[j].id === socket.id) {
            console.log('User ' + db.quizzes[i].users[j].name + " finished a quiz");
            serverSocket.to(db.quizzes[i].quizMaster).emit('user-done-quiz', {name: db.quizzes[i].users[j].name});
          }
        }
      }
    }
  });

  socket.on('show-results', function(data) {
    for (let i = 0; i < db.quizzes.length; i++) {
      if (db.quizzes[i].quizId === data.quizId) {
        for (let j = 0; j < db.quizzes[i].users.length; j++) {
          serverSocket.to(db.quizzes[i].users[j].id).emit('show-results');
        }
      }
    }
  });

  socket.on('disconnect', function() {
    for (let i = 0; i < db.quizzes.length; i++) {
      if (db.quizzes[i].quizMaster === socket.id) {
        console.log("Quiz master of quiz: " + db.quizzes[i].quizId + ' has disconnected. Removing the quiz room');
        db.quizzes.splice(i, 1);
        return;
      }

      for (let j = 0; j < db.quizzes[i].users.length; j++) {
        if (db.quizzes[i].users[j].id === socket.id) {
          if (db.quizzes[i].users[j].name !== undefined) {
            console.log("Client " + db.quizzes[i].users[j].name + " disconnected from room: " + db.quizzes[i].quizId);
            serverSocket.to(db.quizzes[i].quizMaster).emit('user-disconnected', {name: db.quizzes[i].users[j].name});
            db.quizzes[i].users.splice(j, 1);
          } else {
            db.quizzes[i].users.splice(j, 1);
          }
        }
      }
    }
  });
});

//all the requests in
app.use('/api', require('./routers/index'));

module.exports = app;
