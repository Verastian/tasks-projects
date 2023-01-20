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
        console.log(req.body)
        try {
            const column = await columnsService.createColumn(req.body)
            const columnAdd = await columnsService.addColumnToProject(column.projectId, column._id)
            console.log(columnAdd)
            // io.emit('column:created', column)
            return res.status(httpStatus.CREATED).json({ data: column })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para actualizar una columna
    updateColumn: async (req, res) => {
        try {
            const column = await columnsService.updateColumn(req.params.id, req.body)
            const project = await projectsService.updateProject(req.body.projectId, { columns: req.body.columns })
            io.emit('column:updated', column)
            io.emit('project:updated', project)
            return res.status(httpStatus.OK).json({ data: column })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para eliminar una columna
    deleteColumn: async (req, res) => {
        const { id } = req.params
        try {
            const project = await projectsService.getProjectByColumnId(id)
            // Eliminamos todas las tareas de la columna
            await tasksService.deleteTasksByColumnId(id)
            // Eliminamos la columna
            await columnsService.deleteColumn(id)

            await projectsService.removeColumnFromProject(project._id, id)
            // Emitimos evento a través de socket.io
            io.emit('column:deleted', id)
            // io.emit('project:updated', project)
            return res.status(httpStatus.NO_CONTENT).send()
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

}
