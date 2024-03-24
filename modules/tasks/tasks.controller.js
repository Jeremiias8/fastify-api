const TasksModel = require('./tasks.model');

module.exports = class Tasks {

    static list(req, reply) {
        TasksModel.find().exec((err, docs) => {
            reply.send(docs);
        });
    }

};