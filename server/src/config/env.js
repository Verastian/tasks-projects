// cargamos el archivo .env
require('dotenv').config()
const { env } = process
module.exports = {
    // asignamos las variables de entorno a variables locales
    ENV: env.NODE_ENV,
    PORT: env.PORT,
    MONGODB_URI: env.MONGODB_URI,
    API: { PREFIX: env.API || '/api' },
    CLIENT_URI: env.CLIENT_URI || 'http://localhost:5173',

    JWT_SECRET: env.JWT_SECRET,

    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK: env.GOOGLE_CALLBACK,

    GHUB_CLIENT_ID: env.GHUB_CLIENT_ID,
    GHUB_CLIENT_SECRET: env.GHUB_CLIENT_SECRET,
    GHUB_CALLBACK: env.GHUB_CALLBACK,

    COOKIE_NAME: 'sid',

}
