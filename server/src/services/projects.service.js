const { Project } = require('../models')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    // código para obtener los proyectos de la base de datos
    getAllProjects: async () => {
        try {
            const projects = await Project.find({});
            return projects;
        } catch (error) {
            throw new Error(error);
        }
    },
    getProjectById: async (id) => {
        try {
            const projectFound = await Project.findById(id)
            return projectFound;
        } catch (error) {
            throw new Error(error);

        }
    },

    getProjectByColumnId: async (columnId) => {
        try {
            const id = ObjectId(columnId)
            const column = await Project.findOne({
                columns: {
                    $in: [id]
                }
            });
            return column;
        } catch (error) {
            throw new Error(error);
        }
    },
    // código para crear un proyecto en la base de datos
    createProject: async (projectData) => {
        try {
            const project = new Project(projectData)
            return await project.save()
        } catch (error) {
            throw new Error(error);
        }
    },

    // código para actualizar un proyecto en la base de datos
    updateProject: async (id, projectData) => {
        try {
            const project = await Project.findByIdAndUpdate(id, projectData, { new: true })
            return project
        } catch (error) {
            throw new Error(error);

        }
    },

    // código para eliminar un proyecto de la base de datos
    deleteProject: async (projectId) => {
        try {
            const projectDeleted = await Project.findByIdAndDelete(projectId)
            return projectDeleted;
        } catch (error) {
            throw new Error(error);
        }
    },

    removeColumnFromProject: (idProject, idColumn) => {
        try {
            return Project.updateOne(
                { _id: idProject },
                { $pull: { columns: idColumn } }
            );
        } catch (error) {
            throw new Error(error);

        }
    },


}
