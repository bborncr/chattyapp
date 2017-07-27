const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001 to avoid conflict with the app on port 3000
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log("Connected clients:", wss.clients.size);
  // wss.clients is a Set not an Array, use .size to find the number of clients connected
  // Broadcast the number of current connected clients
  let counter = {
    counter: wss.clients.size,
    type: "usersOnline"
  }
  counter.id = uuidv1();
  counter = JSON.stringify(counter);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(counter);
    }
  });

  ws.on('message', function incoming(data) {
    // Converts stringified JSON data to objects
    data = JSON.parse(data);
    // Receive message and modify the type
    switch (data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        break;
      case "postNotification":
        data.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown message type:", data.type);
    }
    // Change the id to avoid duplication of keys
    data.id = uuidv1();
    // Convert JSON objects to strings for transmission AKA serialization
    data = JSON.stringify(data);
    // Broadcast the data
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  // Set up a callback for when a client closes the socket.
  ws.on('close', () => console.log('Client disconnected'));
});


