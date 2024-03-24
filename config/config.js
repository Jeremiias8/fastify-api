module.exports = {
    PORT: process.env.PORT || 3001,
    MONGODBURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fastify-api',
};