const { Column, User } = require("../models");
const { wrapperCommon } = require("../utils/wrappers.util");

module.exports = {
    getUsers: async () => {
        try {
            const users = await User.find({})
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },
    getUserById: async (id) => {
        try {
            const user = await User.findById(id)
            return user
        } catch (error) {
            throw new Error(error);
        }
    },
    createUser: async (userData) => {
        try {
            return await userData.save()
        } catch (error) {
            throw new Error(error);
        }
    },
    updateUser: async (id, userData) => {
        try {
            return await User.findByIdAndUpdate(id, userData, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    },
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
    },
    getUserByEmail: wrapperCommon(async (email) => {
        console.log(email)
        const userFound = await User.findOne({ email })
        return userFound
    }),


}
