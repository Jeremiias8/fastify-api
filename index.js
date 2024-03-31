
const config = require('./config/config');
const fastify = require('fastify')({ logger: true });
const cors = require("@fastify/cors");
const routes = require("./routes/routes");
const formbody = require("@fastify/formbody");
const fileUpload = require('fastify-file-upload');

// security headers for fastify
const helmet = require('@fastify/helmet');
// plugin - to serve static files as fast as possible
const static = require('@fastify/static');
const path = require('path');
const _ = require('lodash');

const db = require('./integrations/mongodb');
const view = require('@fastify/view');
const mustache = require('mustache');
db.connect();

const customerRoutes = require('./routes/customer-routes');
const {setup, delay} = require('./incomingReqs/delay-incoming-reqs');

fastify.register(helmet);
fastify.register(cors);
fastify.register(routes);
fastify.register(formbody);
fastify.register(fileUpload, {
    limits: {
        fileSize: 50 * 1024 * 1024
    }
});

fastify.register(static, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
}); 

fastify.register(view, {
    engine: {
        mustache: mustache
    }
});

fastify.register(setup);

// URL sin bloqueo
fastify.get('/ping', (req, reply) => {

    reply.send({ error: false, ready: req.fastify.magicKey !== null });
});

fastify.post('/webhook', (req, reply) => {

    const {magicKey} = req.body;
    req.fastify.magicKey = magicKey;

    req.log.info('Listo para las peticiones!');

    reply.send({ error: false });
});

// blocked URLs - plugin's construction calling it `delay`
fastify.register(delay(customerRoutes), { prefix: '/v1' });
fastify.listen({port: '1850'});

// mongodb fastify register
fastify.register(require('@fastify/mongodb'), {

    forceClose: true,

    url: 'mongodb://mongo/mydb'
}); 

// mongodb fastify get
fastify.get('/usuario/:id', async (req, reply) => {

    const usuarios = this.mongo.ObjectId(req.params.id);

    const id = this.mongo.ObjectId(req.params.id)
        try {
            const usuario = await usuarios.findOne({id});
            return usuario
        
        } catch (err) {
            return err
        }
});

fastify.post('/submit', async (req, reply) => {
    const formData = req.body;
    return { received: formData };
});

require('./modules/tasks/tasks.routes')(fastify);

fastify.get('/statics', (req, reply) => {
    reply.sendFile('/statics/index.html');
});

fastify.get('/docs', (req, reply) => {

    let routes = [];

    fastify.routes.forEach(item => {
        _.mapValues(item, endpoint => {
            routes.push({
                path: endpoint.url,
                method: endpoint.method
            });
        });
    });

    reply.view('/public/docs/docs.html', {
        app: {
            title: 'Testing template con Fastify y Mustache'
        },
        endpoint: routes
    });
});

fastify.get('/test', (req, reply) => {
    return reply.send({
        msg: "Estamos probando el endpoint de la api"
    });
});

fastify.put('/modify', (req, reply) => {
    return reply.send({
        msg: "Updated route from index.js"
    });
});

fastify.listen({port: 3001}, err => {

    if (err) {
        fastify.log.error(err);
        process.exit(1);
        // throw err
        return;
    }

    fastify.log.info(`fastify-api esta funcionando en el puerto ${fastify.server.address().port}`);
}); 

/* inicio de servidor con async/await */
/*
const start = async () => {

    try {
        await fastify.listen({port: 3001});

    } catch (err) {

        fastify.log.error(err);
        process.exit(1);
    }

} 
*/