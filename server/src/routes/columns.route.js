const express = require('express')
const router = express.Router()
const { getColumn, createColumn, updateColumn, deleteColumn, getColumns } = require('../controllers/columns.controller')

router.route('/')
    .post(createColumn)
    .get(getColumns)
// router.route('/')
//     .get(getColumns)
// router.route('/:projectId')
//     .post(createColumn)

router.route('/:id')
    .get(getColumn)
    .put(updateColumn)
    .delete(deleteColumn)

module.exports = router
