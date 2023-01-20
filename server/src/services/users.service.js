const { Column, User } = require("../models")

module.exports = {
    // código para obtener las tareas de la base de datos
    getUsers: async () => {
        try {
            const users = await User.find({})
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },
    // código para obtener la tareas por ID
    getUserById: async (id) => {
        try {
            const user = await User.findById(id)
            return user
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para crear una tarea en la base de datos
    createUser: async (userData) => {
        try {
            const user = new User(userData)
            return await user.save()
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para actualizar una tarea en la base de datos
    updateUser: async (id, userData) => {
        try {
            return await User.findByIdAndUpdate(id, userData, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para eliminar una tarea de la base de datos
    deleteUser: async (id) => {
        try {
            return await User.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteUsersByProjectId: async (projectId) => {
        try {
            return await User.deleteMany({ projectId })
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteUsersByColumnId: async (columnId) => {
        try {
            return await User.deleteMany({ columnId })
        } catch (error) {
            throw new Error(error);
        }
    },
    addUserToColumn: async (columnId, userId) => {
        try {
            const column = await Column.findById(columnId)
            column.users.push(userId)
            return await column.save()
        } catch (error) {
            throw new Error(error);
        }
    }


}
