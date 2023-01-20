const mongoose = require('mongoose')
const Schema = mongoose.Schema

const columnSchema = new Schema({
    name: { type: String, required: true },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
        cascade: true // Opción para eliminar en cascada las tareas al eliminar la columna
    }],
    projectId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Column', columnSchema)
