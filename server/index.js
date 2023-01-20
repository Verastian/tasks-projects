const http = require('http')
const env = require('./src/config/env')
const { initExpress, connectDB, disconnectDB } = require('./src/loaders')

// inicializamos express
const app = initExpress()

// habilitamos cors
const corsOptions = {
    origin: env.CLIENT_URI,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}

// creamos el servidor
const server = http.createServer(app)

// iniciamos el servidor
server.listen(env.PORT, () => {
    console.log(`Server listening on PORT ${env.PORT}`)
})

// conectamos a la base de datos al iniciar el servidor
connectDB()

// cerramos la conexión a la base de datos al apagar el servidor
process.on('SIGINT', () => {
    disconnectDB()
})

// Socket.io
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: corsOptions
});
io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    // definir los eventos 
    // socket.on('test', (projects) => {
    //     console.log('PROJECTS FROM CLIENT: ', projects)
    // })
    socket.emit('response', { msg: 'emitiendo respuesta desde el servidor' })

    socket.on('open-Project', (project) => {
        socket.join(project._id)
        // socket.emit("response", { msg: 'hola' })
    });
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
})