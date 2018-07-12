// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');
const randomColor = require('random-color');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// This is the function that we can call when we want to send data to the app.js page.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};


// userOnline Create is the object that count the number of user that are online.
// Every time a user connect the counter add 1 and every time a user disconnect the counter delete 1
let userOnline ={
  count: 0,
  type: "userOnline"
} 



let userColor = {
  color: "",
  type: "userColor"
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let color = randomColor();

  console.log('Client connected');
  userOnline.count ++;
  wss.broadcast(JSON.stringify(userOnline))

  userColor.color = randomColor().hexString();
  wss.broadcast(JSON.stringify(userColor))


// this is the section that receive every message send by app.jsx. Depending of the type of the message, it will resend it a certain way
 
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
  });
});
