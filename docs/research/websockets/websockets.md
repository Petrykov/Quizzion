# Websockets

### Table of contents

1. [Introduction to websockets](#introduction) <br>
*`(note to myself: where they are used, how they are important, so on)`*
2. [How to install](#How-to-install)
3. [How to use](#how-to-use)
    1. [Client side](#use-client)
    2. [Server side](#use-server)
4. [Chatserver - example of websocket implementation](#example)

## Introduction


## How to install
(Both server and client)

(about `socket.io` library)

## How to use

*__Beforehand__* *: All the implementation details are explained how to use using React.js framework,
so some of the details may differ while using Vue.js*

### Client

As far as we are using Vue.js framework to develop, we need to create instance of socket.io

`import io from 'socket.io-client';`

Hint: All the implementation after the best to write inside `componentDidMount()` method, because on that stage,
all the DOM html elements are rendered.

To establish the connection, we need to create instance of socket connection

`let socket = io('host:port');`

There are some listeners to put the socket on:

* `connect` calls when connection is established
* `disconnect` calls when the socket connection with server is down
* *custom* are called when server sent some data with custom listener name

#### Listening for messages from server

Example of how to listen socket on particular listener

<pre>
socket.on('connect', function() {
    console.log("Connected");
});
</pre>

Also, with custom listeners, server may send some data with it.

<pre>
socket.on('message',  (data) => {
   this.state.messages.push(data);
});
</pre>

*data* is regular JSON object.

#### Sending data to server

Sending is a bit easier. 

Basically, whenever you need to send something to the server, just call a method and specify there
a name of the listener and possibly data.

Sending something over socket connection with no data in.

`socket.emit(<listener-name>);`

Sending some data over the socket connection.

`socket.emit(<listener-name>, <data>);`

*data* is a JSON object.

### Server

With server implementation it`s a bit more complex.

Here below I will show how to use websockets with **express** server of Node.js framework. Different server types also can be connected with 
sockets, it`s just a bit of googling to do.

First is to make an instance of socket.io.
`const io = require('socket.io');`

The important part here is to make both express and socket connections to accept on the same port.

We need to save `app.listen` to a `server` variable, because then we can pass this as an argument for socket.io constructor.

<pre>
const express = require('express');
const app = express();
const server = app.listen(5000, function(){
     console.log('listening for requests on port 5000');
});
</pre>

`const server_socket = io(server);`

So now the setup of express and socket.io is done.

#### Creating socket with client
While someone is connecting to the server_socket, an instance of *socket* connection is open with that particular client.

`server_socket.on('connection', (socket) => {});`

The name of of a listener which establishes the connection is `connection`

Inside the method, socket (from server) can be set on listeners (as client part does) those listeners are called and executed
when client sends data with that particular listener name

<pre>
server_socket.on('connection', (socket) => {
    console.log("Created 1 connection");
    socket.on('data', function(data) {
         console.log("Data received: " + JSON.stringify(data));
    });
    socket.on('disconnect', function () {
         console.log("Closed 1 connection");
    });
});
</pre>

#### Sending data to client 

There are 2 ways to send data:

- Only to 1 client
- To everyone

##### Send data only to 1 client

`socket.emit(<listener>, <data>)`;

Usually socket instance is only available inside the `connection` listener.


##### Send data to everyone

To send data to everyone connected to the sockets.

`server_socket.sockets.emit(<listener>,<data>);`

Can be called everywhere where `server_socket` is declared.



## Example

As for example of using the websockets I have created a chat web application, where everyone can send and see the list 
of messages all the user have sent.

It consists of frontend and backend folders. And to run the project, you need to run frontend and backend simultaneously. 

You can pull the project from Git.
 
`git clone https://gitlab.com/markKravchuk/websockets-demo.git`

#### To run backend

1 Go to backend folder

`cd backend/`
 
2 Install the dependencies

`npm install`

3 Run the backend

`npm run run`

#### To run frontend

1 Go to frontend folder

`cd frontend/`

2 Install the dependencies

`npm install`

3 Run the frontend

`npm run start`

#### Interact the project

After you run frontend (with or without backend) navigate in your browser to `http://localhost:3000/`.