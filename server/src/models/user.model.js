const mongoose = require('mongoose');
const { passwordHashing, comparePassword } = require('../utils/password.util');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    picture: { type: String, default: '' },
    authSocial: {
        type: Boolean,
        default: false,
        required: true,
    },

    password: {
        type: String,
        required: function () {
            return this.authSocial ? false : true
        },
        trim: true,
        default: null,
    },
    token: {
        type: String,
        default: null,
    },
    confirm: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await passwordHashing(this.password)
});

userSchema.methods.verifyPassword = async function (pass) {
    return await comparePassword(pass, this.password)
}
module.exports = mongoose.model('user', userSchema)
