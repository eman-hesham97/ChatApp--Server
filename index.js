const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);

const { Server } = require("socket.io");
const users = [];
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
    }
});

io.on('connection', (socket) => {
    const user = socket.id;
    
    socket.emit('CONNECTED_USERS', users);
    users.push(user);
    socket.broadcast.emit('new-user', socket.id);
  console.log('a user connected', socket.id);
  socket.on('message',(message) => {
    console.log(message, socket.id);
    console.log('users:',users);
    socket.to(message.id).emit('new-message', {message:message.message, id:socket.id});
    
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});