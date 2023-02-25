const express = require('express')
const router = express.Router()
const { getTasks, createTask, updateTask, deleteTask, getTask } = require('../controllers/tasks.controller')

router.route('/')
    .get(getTasks)
    .post(createTask)
router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask)

module.exports = router
