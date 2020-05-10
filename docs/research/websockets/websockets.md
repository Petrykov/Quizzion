# Websockets

### Table of contents

1. [Introduction to websockets](#introduction) <br>
<!-- *`(note to myself: where they are used, how they are important, so on)`* -->
2. [Socket.io](#socket.io)
3. [How to use](#how-to-use)
    1. [Client side](#use-client)
    2. [Server side](#use-server)
4. [Chatserver - example of websocket implementation](#example)
5. [Sources](#sources)

## Introduction

### WebSocket
 `WebSocket` is a computer communications protocol, which provide a point-to-point system composed of two or more connected parties (devices) communicated via a single `TCP connection`. Websocker works different than HTTP, but to intergrate with HTTP protocols, uses `HTTP Upgrade header`.
 
  Websocket provides a two-way connection between a client (web browser or another application) and server (web server). The messages can be passed back and forth while keeping the connection open. What is so important: the server can sand a message to the client without being requested first by the client. It allows a client (or server) to send a message to one or multiple users.


 #### How do they work?
 To start a WebSocket connection, the client must send a WebSocket handshake request, then the server will return the Websocket handshake response. The handshake includes `HTTP request/response`, so the Websocket can also handle HTTP connection.
 When the connection is established, communications is proceeded via `bidirectional binary protocols`. In addition, a client sends a `Sec-WebSocket-Key` header (base64-encoded random bytes) and the server replies with a hash of the key in the `Sec-WebSocket-Accept` header. After that the data are passed without any extra features. Every time, a message is sent -it includes a small header, followed by payload. 
 
 #### Security aspect
  WebSocket connection is not as secure as HTTP connection, but to avoid Cross-Side WebSocket Hijacking -> use tokens to authenticate the WebSocker connection.
 
**** optional: research about encryption, if our client required


## Socket.io
 Native `WebSockets` are powerfull, but sometimes they are not able to handle request (they do not support all browsers). To solve the problem, the best solution is to use `Socket.io`. It is a WebSocket framework, which contains a lot of tools and help to build a large application. The framework is supported in every browser.
 `Socket.io` has an event-driven architecture.
  It has two parts: a client side library, which runs in the browser (usually written in Javascript) and a server-side library for Node.js.

Because the `Socket.io` is part of the `Node Package Manager`, we can use `npm` to install the framework. 
#### Installation:
- `npm init -y` (for package.json)
- `npm isocket.io`

#### Server side
- create a server file (for example socket-server.js). Because the sockets should also work with HTTP, it is important to use `const { createServer} = require('http')` and of course `const socketIO = require("socket.io")`. After that we should define the method for HTTP: `const server = createServer().listen(3000)`. Thank to this method, all the browsers which do not support Websockets, will be able to use our application (via HTTP).
At the end we have to 'add' HTTP server to the socket: `const io = socketIO(server)`.
Now we can use the server (go to `How to use`).

#### Client side
- create a client file (for example client-server.js). 
 We should connect the client with the server via: `const io = require("socket.io-client")` and create a new socket for a client `const socket = io("http://localhost:3000")`. The host number must be the same as for the server.
 Now we can use the client (go to `How to use`).


<!-- (Both server and client)
(about `socket.io` library) -->

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

### Sources:
https://www.npmjs.com/package/socket.io
https://en.wikipedia.org/wiki/Socket.IO
https://en.wikipedia.org/wiki/WebSocket

Useful course on LinkedIn learning:
https://www.linkedin.com/learning-login/share?forceAccount=false&redirect=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Fnode-js-essential-training-web-servers-tests-and-deployment%3Ftrk%3Dshare_ent_url&account=57689577