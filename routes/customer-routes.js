
const fp = require('fastify-plugin');

const provider = require('../hooks/provider');

module.exports = fp (async function (fastify) {

    fastify.get('*', async function (req, reply) {

        try {
            const data = await provider.fetchDataSensible(req.server.magicKey);
            return { customer: true, error: false }

        } catch (error) {

            req.log.error({
                error,
                message: 'Fallo al obtener los datos del cliente'
            });

            reply.statusCode = 500;
            return { customer: false, error: true }
        }
    });
});