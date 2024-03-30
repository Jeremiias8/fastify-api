
const fp = require('fastify-plugin');
const provider = require('../hooks/provider');

const TIEMPO_USUAL_EN_MS = 5000;

async function setup (fastify) {

    // tan pronto como se escuche alguna petición, que se ejecute la función
    fastify.server.on('listening', doMagic);

    // seteando el alojamiento para la magicKey
    fastify.decorate('magicKey', null);

    function doMagic() {

        fastify.log.info('Haciéndolo magic!');

        provider.GeneradorDeLlaveMagicaThirdParty(TIEMPO_USUAL_EN_MS)
            .catch((error) => {
                fastify.log.error({
                    error,
                    message: 'Se obtuvo un error mientras se conseguía la llave mágica...'
                });
            });

            fastify.close(() => process.exit(1));
    }
} 

const delay = (routes) => function (fastify, opts, done) {

    fastify.addHook('onRequest', function (req, reply) {

        if (!req.server.magicKey) {
            reply.statusCode = 503;
            reply.header('Retry-After', TIEMPO_USUAL_EN_MS);
            reply.send({ error: true, retryInMs: TIEMPO_USUAL_EN_MS });
        }

        next();
    });

    fastify.register(routes, opts);

    done();
}

module.exports = {
    setup: fp(setup),
    delay
}