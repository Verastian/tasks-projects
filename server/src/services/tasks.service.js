const { Column, Task } = require("../models")

module.exports = {
    // código para obtener las tareas de la base de datos
    getTasks: async () => {
        try {
            const tasks = await Task.find({})
            return tasks;
        } catch (error) {
            throw new Error(error);
        }
    },
    // código para obtener la tareas por ID
    getTaskById: async (id) => {
        try {
            const task = await Task.findById(id)
            return task
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para crear una tarea en la base de datos
    createTask: async (taskData) => {
        try {
            const task = new Task(taskData)
            return await task.save()
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para actualizar una tarea en la base de datos
    updateTask: async (id, taskData) => {
        try {
            return await Task.findByIdAndUpdate(id, taskData, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para eliminar una tarea de la base de datos
    deleteTask: async (id) => {
        try {
            return await Task.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteTasksByProjectId: async (projectId) => {
        try {
            return await Task.deleteMany({ projectId })
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteTasksByColumnId: async (columnId) => {
        try {
            return await Task.deleteMany({ columnId })
        } catch (error) {
            throw new Error(error);
        }
    },
    addTaskToColumn: async (columnId, taskId) => {
        try {
            const column = await Column.findById(columnId)
            column.tasks.push(taskId)
            return await column.save()
        } catch (error) {
            throw new Error(error);
        }
    }


}
