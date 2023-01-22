const express = require('express')
const router = express.Router()
const { getColumn, createColumn, updateColumn, deleteColumn, getColumns, getColumnsByProyectId } = require('../controllers/columns.controller')

router.route('/')
    .post(createColumn)
    .get(getColumns)
router.route('/project/:projectId')
    .get(getColumnsByProyectId)

router.route('/:id')
    .get(getColumn)
    .put(updateColumn)
    .delete(deleteColumn)

module.exports = router
