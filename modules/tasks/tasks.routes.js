
const TasksController = require('./tasks.controller');

module.exports = fastify => {
    fastify.post('/tasks', TasksController.create);
    fastify.post('/tasks/:id', TasksController.validate);
    fastify.get('/tasks', TasksController.list);
    fastify.get('/tasks/:id', TasksController.read);
    fastify.put('/tasks/:id', TasksController.update);
    fastify.put('/tasks/:id/completed', TasksController.completed);
    fastify.delete('/tasks/:id', TasksController.delete);
};

