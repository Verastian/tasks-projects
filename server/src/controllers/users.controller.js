const httpStatus = require('http-status')
const { usersService, tasksService, columnsService } = require('../services')
const io = require('../sockets')

module.exports = {
    // código para obtener los proyectos de la base de datos
    getUsers: async (req, res) => {
        try {
            const users = await usersService.getUsers({});
            res.status(200).json({ data: users });

        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params
        try {
            const user = await usersService.getUserById(id)
            // io.emit('user:obtained', user)
            return res.status(httpStatus.OK).json({ data: user })
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });

        }
    },

    // código para crear un proyecto en la base de datos
    createUser: async (req, res) => {
        try {
            const user = await usersService.createUser(req.body)
            // io.emit('user:created', user)
            return res.status(httpStatus.CREATED).json({ data: user })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para actualizar un proyecto en la base de datos
    updateUser: async (req, res) => {
        try {
            const user = await usersService.updateUser(req.params.id, req.body)
            if (!user) return res.sendStatus(httpStatus.NOT_FOUND)
            // Emitimos evento a través de socket.io
            // io.emit('updateuser', { data: user })
            return res.status(httpStatus.OK).json({ data: user })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    },

    // código para eliminar un proyecto de la base de datos
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            // Eliminamos todas las tareas del proyecto
            await tasksService.deleteTasksByuserId(id);

            // Eliminamos todas las columnas del proyecto
            await columnsService.deleteColumnsByuserId(id);

            // Eliminamos el proyecto
            const user = await usersService.deleteuser(id)

            if (!user) return res.sendStatus(httpStatus.NOT_FOUND)
            // Emitimos evento a través de socket.io
            // io.emit('deleteuser', { userId: user._id })
            return res.status(httpStatus.OK).json({ message: 'El Proyecto se elimino correctamente' })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    },


}
