# Websockets in Quizzion
## Reasoning

Our implementation of Quizzion application includes concurrently playing quiz with all respondents who are connected. So, whenever quiz starts, all the respondents start the quiz at the same time.

And to archive this synchronization of different clients, we have used the most efficient solution - *websockets*

## The communication under the hood

First of all every user of Quizzion application connects to websocket server. 
Using the same URL and port as for our backend server. It's because our websocket and express servers are sharing the same port listener.

Connection happens automatically when Vue application starts running in browser window.

### Server setup

Our websocket server is always listening for new users to connect.

Server is storing necessary data in the `db` object with `quizzes` array of quizzes.

Example of `quiz` element inside the `quizzes` array

<pre>
{
  quizMaster: (string) (id of socket of quiz master for particular quiz)
  quizId: (integer) (id if quiz)
  started: (boolean) (if quiz has started)
  users: (array) (the name and socket id of quiz respondent)
  [ 
    {
      name: (string) (Name of respondent),
      id: (string) (socket id of respondent)
    } 
  ]
</pre>

The server stores all the data inside the variable, so if server crashes and relaunches all the data gets lost.

We have decided to leave it like this, because for us, websocket server is something live.
If server crashes, then everyone can reconnect to websocket server again easily.

### Client setup

The initialization of websocket client instance is in `quizzion/src/boot/socket.io.js` There we create instance of websocket client and pass to the Vue instance.

After that socket is available to use in evey component

Example: 
<pre>
this.$socket.client.emit('test-smth');
this.$socket.client.on('test-smth' , () => {});
</pre>

## The Implementation

#### Connecting to the same quiz (moderator and respondent)

##### Quiz master
First user who connects is *quiz master* when he presses button `Get Link` inside the `DashboardRight` component.

The message he sends: 
<pre>
this.$socket.client.emit('connect-t', {quizId: this.currentQuiz.id});
</pre>
Quiz master only has to specify the quiz id. Server creates a new quiz for it and waits for respondents to join it.

##### Respondent
When respondent opens a page `Invitation`, the client socket sends:
<pre>
this.$socket.client.emit('client-connected', {quizId: this.quizId});
</pre>

The server recognizes that new client wants to participate in quiz and checks:

- If quiz has already started - server sends back `quiz-already-started` message. Means that it is not possible to join quiz any more because it has started
- If quiz has already maximum clients connected - server sends back `max-client` message.

Respondent enters his/her name and presses the button start. Via socket the message is sent:
<pre>
this.$socket.client.emit('connect-t', {quizId: this.invitedQuiz.id, name: this.playerName});
</pre>

Now server stores new respondent of quiz in his `db` and send s message to master of that particular quiz with a name of respondent connected to it.
<pre>
serverSocket.to(quizMasterId).emit('user-connected', {
          name: data.name
        });
</pre>

##### Quiz master receives the names of joined participants
Quiz master is listening for the respondent names who joined the quiz.
<pre>
this.$socket.client.on('user-connected', (data) => {});
</pre>

Now, quiz master has 2 options:

- `Start a quiz` Sends a message to server `this.$socket.client.emit('start');` and all the participants now will start doing the quiz
- `Cancel the quiz` Sends a message to server `this.$socket.client.emit('stop');` and now all the respondents will have to close the window

### Quiz started

Now all the respondents are filling in answers of quiz and when they are done, the message to server is sent:
<pre>
this.$socket.client.emit('quiz-done', {quizId: this.quizId});
</pre>

Quiz master can immediately see who has finished the quiz and who has not. Master receives a message about respondents who are done with their quiz.
<pre>
this.$socket.client.on('user-done-quiz', (data) => {});
</pre>

### Some not proper behaviour

If respondent for some reason closes the tab with quiz to play (at any stage) the server detects it in `disconnect` listeners.

Server checks if user was a participant of some quiz, if so, server sends a message to master of that quiz with a message that some user has disconnected
<pre>
this.$socket.client.on('user-disconnected', (data) => {});
</pre>
