const http = require('http')
const express = require("express");
// const { initExpress, connectDB, disconnectDB } = require('./src/loaders')
const app = express();
const { PORT } = require('./src/config/env')
const loaders = require('./src/loaders')


async function run() {
    // const app = express();
  
    await loaders({ expressApp: app });
  
    const server = app.listen(PORT, () => {
      const port = server.address().port;
      console.info(`Server listening on port: ${port} 🛡️`);
    }).on('error', err => {
      console.error(err);
      process.exit(1);
    });
  }
  run();

// habilitamos cors
// const corsOptions = {
//     origin: env.CLIENT_URI,
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
// }

// creamos el servidor
// const server = http.createServer(app)


// Socket.io
// const io = require('socket.io')(server, {
//     pingTimeout: 60000,
//     cors: corsOptions
// });
// io.on("connection", (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);
    // definir los eventos 
    // socket.on('test', (projects) => {
    //     console.log('PROJECTS FROM CLIENT: ', projects)
    // })
    // socket.emit('response', { msg: 'emitiendo respuesta desde el servidor' })

    // socket.on('open-Project', (project) => {
    //     socket.join(project._id)
        // socket.emit("response", { msg: 'hola' })
    // });
    // socket.on('new-project', (project) => {
    //     // const project = project;
    //     socket.to(project._id).emit('project-added', project)
    // })
    // socket.on('delete-task', task => {
    //     const project = task.project
    //     socket.to(project).emit('delete-task', task)
    // })
    // socket.on('update-task', task => {
    //     const project = task.project
    //     socket.to(project).emit('update-task', task)
    // })
    // socket.on('change-state-task', task => {
    //     console.log(task.project)
    //     const project = task.project._id
    //     socket.to(project).emit('new-state-task', task)
    // })
// })