
const TasksController = require('./tasks.controller');

module.exports = fastify => {
    fastify.post('/tasks', TasksController.create);
    fastify.get('/tasks', TasksController.list);
};
