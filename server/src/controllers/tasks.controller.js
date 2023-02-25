
const httpStatus = require('http-status')
const { tasksService, columnsService, projectsService } = require('../services')

module.exports = {
    // código para obtener las tareas
    getTasks: async (req, res) => {
        try {
            const tasks = await tasksService.getTasks()
            return res.status(httpStatus.OK).json({ data: tasks })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })

        }
    },
    // código para obtener una tarea
    getTask: async (req, res) => {
        const { id } = req.params
        try {
            const task = await tasksService.getTaskById(id)
            return res.status(httpStatus.OK).json({ data: task })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })

        }
    },
    // código para crear una tarea
    createTask: async (req, res) => {
        try {
            const task = await tasksService.createTask(req.body)
            await tasksService.addTaskToColumn(task.columnId, task._id)
            return res.status(httpStatus.CREATED).json({ data: task })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para actualizar una tarea
    updateTask: async (req, res) => {
        try {
            console.log(req.params.id)
            console.log('BODY: ', req.body)
            const task = await tasksService.updateTask(req.params.id, req.body)
            return res.status(httpStatus.OK).json({ data: task })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para eliminar una tarea
    deleteTask: async (req, res) => {
        const { id } = req.params
        try {
            const column = await columnsService.getColumnByTaskId(id)
            await tasksService.deleteTask(id)
            await columnsService.removeTaskFromColumn(column._id, id)
            const columnUpdated = await columnsService.getColumnById(column._id)
            return res.status(httpStatus.OK).json({ message: 'La tarea se elimino correctamente', data: columnUpdated })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },


}
