const express = require('express')
const router = express.Router()
const { getProjects, createProject, updateProject, deleteProject, getProject } = require('../controllers/projects.controller')

router.route('/')
    .get(getProjects)
    .post(createProject)

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject)

module.exports = router
