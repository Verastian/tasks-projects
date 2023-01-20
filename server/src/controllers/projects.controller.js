const httpStatus = require('http-status')
const { projectsService, tasksService, columnsService } = require('../services')
const io = require('../sockets')

module.exports = {
    // código para obtener los proyectos de la base de datos
    getProjects: async (req, res) => {
        try {
            const projects = await projectsService.getAllProjects({});
            res.status(200).json({ data: projects });

        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    },
    getProject: async (req, res) => {
        const { id } = req.params
        try {
            const project = await projectsService.getProjectById(id)
            io.emit('project:obtained', project)
            return res.status(httpStatus.OK).json({ data: project })
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });

        }
    },

    // código para crear un proyecto en la base de datos
    createProject: async (req, res) => {
        try {
            const project = await projectsService.createProject(req.body)
            io.emit('project:created', project)
            return res.status(httpStatus.CREATED).json({ data: project })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para actualizar un proyecto en la base de datos
    updateProject: async (req, res) => {
        try {
            const project = await projectsService.updateProject(req.params.id, req.body)
            if (!project) return res.sendStatus(httpStatus.NOT_FOUND)
            // Emitimos evento a través de socket.io
            // io.emit('updateProject', { data: project })
            return res.status(httpStatus.OK).json({ data: project })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    },

    // código para eliminar un proyecto de la base de datos
    deleteProject: async (req, res) => {
        const { id } = req.params;
        try {
            // Eliminamos todas las tareas del proyecto
            await tasksService.deleteTasksByProjectId(id);

            // Eliminamos todas las columnas del proyecto
            await columnsService.deleteColumnsByProjectId(id);

            // Eliminamos el proyecto
            const project = await projectsService.deleteProject(id)

            if (!project) return res.sendStatus(httpStatus.NOT_FOUND)
            // Emitimos evento a través de socket.io
            // io.emit('deleteProject', { projectId: project._id })
            return res.status(httpStatus.OK).json({ message: 'El Proyecto se elimino correctamente' })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    },


}
