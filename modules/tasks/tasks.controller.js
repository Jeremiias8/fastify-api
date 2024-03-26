const TasksModel = require('./tasks.model');

module.exports = class Tasks {

    static create(req, reply) {
        TasksModel.create(req.body, (err, doc) => {
            reply.send(doc);
        });
    }

    static list(req, reply) {
        TasksModel.find().exec((err, docs) => {
            reply.send(docs);
        });
    }

};