
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
            console.log(task)
            await tasksService.addTaskToColumn(task.columnId, task._id)
            // io.emit('task:created', task)
            return res.status(httpStatus.CREATED).json({ data: task })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },

    // código para actualizar una tarea
    updateTask: async (req, res) => {
        try {
            const task = await tasksService.updateTask(req.params.id, req.body)
            const column = await columnsService.updateColumn(task.columnId, { tasks: req.body.tasks })
            io.emit('task:updated', task)
            io.emit('column:updated', column)
            return res.status(httpStatus.OK).json(task)
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
            io.emit('task:deleted', id)
            // io.emit('column:updated', column)
            return res.status(httpStatus.NO_CONTENT).send()
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    },


}
