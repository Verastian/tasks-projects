// cargamos el archivo .env
require('dotenv').config()
const { env } = process
module.exports = {
    // asignamos las variables de entorno a variables locales
    ENV: env.NODE_ENV,
    PORT: env.PORT,
    MONGODB_URI: env.MONGODB_URI,
    API: { PREFIX: env.API || '/api' },
    CLIENT_URI: env.CLIENT_URI || 'http://localhost:5173'

}
