const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
});

// io.use((socket, next) => {
//   console.log(socket.request);
//  });

io.on('connection', (socket) => {

// restart data kalo misalkan ada data pokonya begitulah, jadi kalo ada room baru bakalan ke refersh
  socket.on('restart-room', function (data) {
    socket.broadcast.emit("restart-room", true);
  });


  socket.on("chat-group", function (data) {
    socket.broadcast.emit("chat-group", data);
  })


  socket.on("join-room", function (data) {

    console.log("Berhasil masuk dengan room", data);
    socket.join(`${data}`);
  })

  socket.on('message-chat', ({room, text, role}) => {
    console.log(room, text, role);

    io.to(`${room}`).emit("chat-message", {text, role});
  });


});

server.listen(3000, () => {
  console.log('listening on *:3000');
});