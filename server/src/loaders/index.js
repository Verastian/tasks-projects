const connectDB = require('./db');
const expressRun = require('./express');
const mongoStore = require('./sessionStore');

const run = async ({ expressApp }) => {
    const db = await connectDB();
    console.log('✌️ DB loaded and connected!');

    const mongoSessionStore = mongoStore();

    expressRun({
        app: expressApp,
        db,
        mongoSessionStore
    });
    console.log('✌️ Express loaded');
}
module.exports = run
