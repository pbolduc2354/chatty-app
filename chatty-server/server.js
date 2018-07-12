// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};
let userOnline ={
  count: 0,
  type: "userOnline"
} ;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  userOnline.count ++;
  wss.broadcast(JSON.stringify(userOnline))
  console.log(userOnline);


// When a client send a message with the nav bar 
    ws.on('message', (data) => {
        let msg = JSON.parse(data);
        

        switch (msg.type) {
          case "postMessage" :
            msg.id = uuidv4()
            msg.type = "incomingMessage"
            console.log(`User ${msg.username} said ${msg.content}`);
            console.log(msg)
            wss.broadcast(JSON.stringify(msg))
          break;

          case "postNotification":
            msg.id = uuidv4()
            msg.type = "incomingNotification"
            wss.broadcast(JSON.stringify(msg))
          break;
        }
    })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    userOnline.count --;
    wss.broadcast(JSON.stringify(userOnline))
    console.log(userOnline)
  });
});
