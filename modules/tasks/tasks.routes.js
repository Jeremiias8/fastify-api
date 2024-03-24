
const TasksController = require('./tasks.controller');

module.exports = fastify => {
    fastify.get('/tasks', TasksController.list);
};