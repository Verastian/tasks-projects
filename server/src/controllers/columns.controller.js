const httpStatus = require('http-status')
const { columnsService, projectsService, tasksService } = require('../services/')
const io = require('../sockets')

module.exports = {
    // código para obtener las columnas
    getColumns: async (req, res) => {
        try {
            const columns = await columnsService.getAllColumns()
            return res.status(httpStatus.OK).json({ data: columns })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })

        }
    },
    getColumnsByProyectId: async (req, res) => {
        const projectId = req.params.projectId

        try {
            const columns = await columnsService.findColumnByIdProject(projectId)
            return res.status(httpStatus.OK).json({ data: columns })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })

        }
    },

    // código para obtener una columna
    getColumn: async (req, res) => {
        const { id } = req.params
        try {
            const column = await columnsService.getColumnById(id)
            return res.status(httpStatus.OK).json({ data: column })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })

        }
    },

    // código para crear una columna
    createColumn: async (req, res) => {

        try {
            const column = await columnsService.createColumn(req.body)
            await columnsService.addColumnToProject(column.projectId, column._id)
            // io.emit('column:created', column)
            return res.status(httpStatus.CREATED).json({ data: column })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para actualizar una columna
    updateColumn: async (req, res) => {
        console.log(req.body)
        const { name, projectId, tasks: _tasks } = req.body
        try {
            const column = await columnsService.getColumnById(req.params.id)
            column.tasks = _tasks || column.tasks
            column.name = name || column.name
            column.projectId = projectId || column.projectId

            const updateColumn = await columnsService.updateColumn(column)
            return res.status(httpStatus.OK).json({ data: updateColumn })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para eliminar una columna
    deleteColumn: async (req, res) => {
        const { id } = req.params
        console.log(id)
        try {
            const project = await projectsService.getProjectByColumnId(id)
            // Eliminamos todas las tareas de la columna
            // await tasksService.deleteTasksByColumnId(id)
            // Eliminamos la columna
            await columnsService.deleteColumn(id)

            await projectsService.removeColumnFromProject(project._id, id)
            // Emitimos evento a través de socket.io
            // io.emit('column:deleted', id)
            // io.emit('project:updated', project)
            return res.status(httpStatus.OK).json({ message: 'Columna eliminada Correctamente ' })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

}
