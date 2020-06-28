# RFC document

### This document describes all the communication protocol between server and different type of clients

## The implementation
All our websocket communication is done via websocket using `socket.io` library.

In socket.io library the type of communication is following: 

- To send the data via socket:
<pre>
socket.emit('listener_name', 'data');
</pre>

- To listen for incoming data via socket:
<pre>
socket.on('listener_name', function('data');
</pre>

## The RFC will contain:

1) Name of the listener
2) Data to pass

## RFC

**1)** Every user of frontend application is connected automatically to the server by `connection` listener with no data in it

**2)** `client-connected` data: `{ quizId: (string)}`. When respondent firstly sees the Inivitation page, the message is sent for server to reserve a space for that particular user.

**3)** `connect-t` connect to websocket server. Data to pass:
- `{quizId: (string)}` Quiz master connects and creates a new room with the `quizId` value
- `{quizId: (), name: (string)}` Respondent connects and to the room with same `quizId` value new `name` value is assigned to understand who is connected.

**4)** `user-connected` data: `{ name : (string)}`. A listener for quiz master, who created a room for quiz receives this messages to indicate who of visitors joined the quiz

**5)** `start` with no data. Quiz master sends this message to start the quiz, every respondent of that quiz receives same message from server and the quiz starts.

**6)** `stop` with no data. Quiz master sends this message to stop the current quiz, every connected respondent sees a message that quiz can not be played anymore.

**7)** `quiz-done` data: `{ quizId: (string)}`. Respondent sends a message when the quiz is done, so quiz master will be able to see who connected.

**8)** `disconnect` with no data. If someone disconnects from the websocket server, the server removes all the records saved with that person.

**9)** `user-disconnected` data: `{ name: (string) }`. The message which quiz master receives if someone of his quiz respondents closed the tab with the quiz.

**10)** `user-done-quiz` data: `{ name: (string) }`. The message which quiz master receives after the respondent finished his quiz.

**11)** `max-clients` with no data. Respondent receives the message if maximum number of clients have connected to the quiz.

**12)** `quiz-already-started` with no data. Respondent receives the message if the quiz has started before the user opened a page to connect to the quiz.

**13)** `show-results` data: `{ quizId: (string)}`. Quiz master sends this message to every participant of that quiz to show the results page at the same time.
