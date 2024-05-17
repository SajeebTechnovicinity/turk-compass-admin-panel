// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Allow requests from all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});