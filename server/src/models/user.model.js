const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    picture: { type: String, default: '' },
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)
