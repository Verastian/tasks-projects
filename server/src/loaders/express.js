const cors = require('cors');
const express = require('express');
const routes = require('../routes')
const errorHandler = require('../middlewares/errorHandler');
const env = require('../config/env');

module.exports = {
    init: () => {
        const app = express()

        // habilitamos cors
        // app.use(cors())
        app.use(
            cors({
                origin: [env.CLIENT_URI, 'http://localhost:5174'],
                methods: "GET,POST,PUT,DELETE",
                credentials: true,
            })
        );

        // habilitamos body parser
        app.use(express.urlencoded({ limit: '50mb', extended: true }));
        app.use(express.json({ limit: '50mb' }));

        // configuramos nuestras rutas
        const prefix = env.API.PREFIX
        app.use(prefix, routes)


        // Controlador de errores
        app.use(errorHandler)

        // Manejador de errores por defecto de Express
        app.use((error, req, res, next) => {
            res.status(error.status || 500).send({ error: error.message });
        });

        return app
    }
}