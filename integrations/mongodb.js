
const config = require('config');
const mongoURI = config.get('mongoURI');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = class DB {
    static connect() {
        return mongoose.connect(mongoURI);
    }
};