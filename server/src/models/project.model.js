const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    client: { type: String, required: true, trim: true },
    favourite: { type: Boolean, default: false },
    back_select: { type: Boolean, default: false },
    back_image: { type: String, default: "https://picsum.photos/1000/1000?random=1" },
    color: { type: String, trim: true, default: "#b63bce" },
    columns: [{ type: Schema.Types.ObjectId, ref: 'Column', cascade: true }],
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' },],
    delivery: { type: Date, default: Date.now },

}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)
