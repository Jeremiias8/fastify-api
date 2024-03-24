
const fastify = require('fastify');
const provider = require('./provider');

const servidor = fastify({ logger: true });
const TIEMPO_ESPERA_EN_MS = 5000;

servidor.get('/ping', (req, reply) => {

    reply.send({ error: false, ready: req.server.magic !== null });
});

servidor.post('/webhook', (req, reply) => {

    const {magicKey} = req.body;
    req.servidor.magicKey = magicKey;
    req.log.info('Listo para las peticiones!');

    reply.send({ error: false });
});

servidor.get('/v1*', async (req, reply) => {

    try {
        const data = await provider.fetchDataSensible(req.servidor.magicKey);
        return { customer: true, error: false }

    } catch (error) {

        req.log.error({
            error,
            message: 'Fallaron las peticiones con la API del proveedor',
        });
    
        reply.statusCode = 500;
        return { customer: null, error: true }
    }
});

servidor.decorate('magicKey', null);

servidor.listen({ port: '3366' }, () => {

    provider.thirdPartyMagicKeyGenerator(TIEMPO_ESPERA_EN_MS)
        .catch((err) => {
            servidor.log.error({
                err,
                message: 'Se obtuvo un error mientras se intentaba obtener la magicKey!'
            });

            servidor.close(() => process.exit(1))
        });
});