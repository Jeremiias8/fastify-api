
const Middlewares = require('../../middlewares/middlewares');
const TasksController = require('./tasks.controller');

module.exports = fastify => {
    fastify.post('/tasks', {preValidation: Middlewares.esUnDominioValido}, TasksController.create);
    fastify.get('/tasks/:id', TasksController.validate);
    fastify.get('/tasks', TasksController.list);
    fastify.get('/tasks/:id', TasksController.read);
    fastify.put('/tasks/:id', {preValidation: Middlewares.esUnDominioValido}, TasksController.update);
    fastify.put('/tasks/:id/completed', {preValidation: Middlewares.esUnDominioValido, TasksController}.completed);
    fastify.put('/tasks/:id/images', {preValidation: Middlewares.esUnDominioValido, TasksController}.uploadImages);
    fastify.delete('/tasks/:id', {preValidation: Middlewares.esUnDominioValido, TasksController}.delete);
};

