
module.exports = async (fastify, opts) => {

    fastify.get('/user', async (req, reply) => {
        return { user: 'Gero Fernandes' };
    });

    fastify.get('/user/optional/:id?', (req, reply) => {
        const id = req.params.id;

        return { id: id, user: 'User id' };
    });

    fastify.post('/user/created', async (req, reply) => {
        return { user: 'User created!' };
    });

    fastify.put('/user/updated', async (req, reply) => {
        return { user: 'User has been put with new data!' };
    });

    fastify.delete('/user/deleted', async (req, reply) => {
        return { user: 'User deleted successfully!' };
    });

}