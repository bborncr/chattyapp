// server.js
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {

  // wss.clients is a Set not an Array, use .size to find the number of clients connected
  console.log("Clients connected:", wss.clients.size);

  ws.on('message', function incoming(data) {
    console.log("Incoming data", data);
    data = JSON.parse(data);
    // Receive message and modify their type
    switch (data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        break;
      case "postNotification":
        data.type = "incomingNotification";
        break;
      default:
      // throw new Error("Unknown message type:", data.type);
    }
    // Change the id to avoid duplication
    data.id = uuidv1();
    data = JSON.stringify(data);
    console.log("Outgoing data", data);
    // Broadcast the data
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});


