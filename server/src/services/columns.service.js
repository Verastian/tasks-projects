const ObjectId = require('mongodb').ObjectId;
const { Column, Project } = require('../models')
module.exports = {
    // código para obtener las columnas de la base de datos
    getAllColumns: async () => {
        try {
            const columns = await Column.find({})
            return columns
        } catch (error) {
            throw new Error(error);

        }
    },
    // código para obtener la columna por id
    getColumnById: async (id) => {
        try {
            const column = await Column.findById(id)
            return column
        } catch (error) {
            throw new Error(error);

        }
    },

    getColumnByTaskId: async (taskId) => {
        try {
            const id = ObjectId(taskId)
            const column = await Column.findOne({
                tasks: {
                    $in: [id]
                }
            });
            return column;
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para crear una columna en la base de datos
    createColumn: async (columnData) => {
        const column = new Column(columnData)
        return await column.save()
    },

    // código para actualizar una columna en la base de datos
    updateColumn: async (column) => {
        return await column.save()
    },
    // actualizar Columna al eliminar una tarea 
    removeTaskFromColumn: (idColumn, idTask) => {
        return Column.updateOne(
            { _id: idColumn },
            { $pull: { tasks: idTask } }
        );
    },

    // código para eliminar una columna de la base de datos
    deleteColumn: async (id) => {
        try {
            return await Column.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteColumnsByProjectId: async (projectId) => {
        try {
            return await Column.deleteMany({ projectId })
        } catch (error) {
            throw new Error(error);
        }
    },
    addColumnToProject: async (projectId, columnId) => {
        try {
            const project = await Project.findById(projectId)
            project.columns = [...project.columns, columnId]
            return await project.save()
        } catch (error) {
            throw new Error(error);
        }
    },
    findColumnByIdProject: async (projectId) => {
        try {
            const column = await Column.find({ projectId: projectId })
            return column
        } catch (error) {
            throw new Error(error);
        }
    }


}
