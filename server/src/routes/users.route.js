const express = require('express')
const router = express.Router()
const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users.controller')

router.route('/')
    .get(getUsers)
    .post(createUser)

// router.route('/')
// .get(getUsers)
// router.route('/:columnId')
// .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router
