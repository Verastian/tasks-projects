const tasksRoutes = require('./tasks.route')
const columnsRoutes = require('./columns.route')
const projectsRoutes = require('./projects.route')
const usersRoutes = require('./users.route')
const authRoute = require('./auth.route')
const express = require('express')

const routes = [
    { path: '/tasks', router: tasksRoutes },
    { path: '/columns', router: columnsRoutes },
    { path: '/projects', router: projectsRoutes },
    { path: '/users', router: usersRoutes },
    { path: '/auth', router: authRoute },

]

const router = express.Router()
routes.forEach(route => { router.use(route.path, route.router) })

module.exports = router
