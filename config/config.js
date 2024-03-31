module.exports = {
    PORT: process.env.PORT || 3001,
    MONGODBURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fastify-api',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    LISTA_BLANCA_DE_DOMINIO: ['http://localhost:5000', 'localhost:5000',
    'http://localhost:5001', 'localhost:5001']
};
