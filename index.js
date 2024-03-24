
const config = require('./config/config');
const fastify = require('fastify')({ logger: true });
const cors = require("@fastify/cors");
const routes = require("./routes/routes");
const formbody = require("@fastify/formbody");
const db = require('./integrations/mongodb');
db.connect();

fastify.register(cors);
fastify.register(routes);
fastify.register(formbody);

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