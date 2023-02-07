const mongoose = require('mongoose');
const Column = require('./column.model');
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String },
    assignee: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    columnId: { type: Schema.Types.ObjectId, required: true },
    projectId: { type: Schema.Types.ObjectId },
    delivery: { type: Date, default: Date.now },
    priority: { type: String, enum: ['Baja', 'Media', 'Alta'], },
},
    {
        timestamps: true
    })
// taskSchema.pre('save', async function (next) {
//     // Obtener el documento de columna asociado a la tarea
//     const column = await Column.findById(this.columnId);
//     // Obtener el ID del proyecto asociado a la tarea
//     const projectId = column.projectId;
//     // Asignar el ID del proyecto a la tarea
//     this.projectId = projectId;
//     next();
// });
module.exports = mongoose.model('Task', taskSchema)
