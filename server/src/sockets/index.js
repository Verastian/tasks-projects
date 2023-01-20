// src/sockets/index.js

const socketio = require('socket.io')

const io = socketio()

io.on('connection', (socket) => {
    // nuestra lógica de Socket.io va aquí
})

module.exports = io
