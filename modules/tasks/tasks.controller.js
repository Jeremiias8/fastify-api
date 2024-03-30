
const async = require('async');
const _ = require('lodash');

const SendGrid = require('../../integrations/sendgrid');
const Cloudi = require('../../integrations/cloudinary');
const TasksModel = require('./tasks.model');
module.exports = class Tasks {

    static create(req, reply) {
        TasksModel.create(req.body, (err, doc) => {
            reply.send(doc);
        });
    }

    static validate(req, reply) {
        TasksModel.validate(req.body, (err, success) => {
            reply.send(success);
        });

        if (err) {
            status: 404;
            message: err + '${status}';
        }
    }

    static list(req, reply) {

        let q = req.query;
        let findParams = { enable: true };
        let queryParams = {};

        if (q.sort) {
            queryParams.sort = q.sort;
        }
        if (q.filter) {
            findParams[q.filter.replace('-', '')] = q.filter
            .includes('-') ? true : false;
        }

        TasksModel.find(findParams, null, queryParams)
            .exec((err, docs) => {
                reply.send(docs);
        });
    }

    static read(req, reply) {
        TasksModel.findById(req.params.id)
            .exec((err, doc) => {
                reply.send(doc);
        });
    }

    static update(req, reply) {
        TasksModel.findByIdAndUpdate(req.params.id, req.body, 
            {new: true, safe: true})
            .exec((err, doc) => {
                reply.send(doc);
        });
    }

    static completed(req, reply) {
        TasksModel.findByIdAndUpdate(req.params.id, {
            completed: req.body.completed
        }, {new: true, safe: true}).exec((err, doc) => {
            SendGrid.send({task: doc}).then(() => {
                reply.send(doc);
            });
        });
    }

    static uploadImagesO(req, reply) {
        let images = null;
        let oldTask = null;

        async.parallel([pCb => {

            Cloudi.uploadImages(req.raw.files, (err, files) => {
                images = files;
                pCb(err);
            });

        }, pCb => {

            TasksModel.findById(req.params.id)
                .select('images')
                .exec((err, doc) => {
                    oldTask = doc;
                    pCb(err);
            });

        }], err => {

            TasksModel.findByIdAndUpdate(req.params.id, {
                images: _.concat(oldTask.images || [], 
                    _.map(images, img => img.url))
            });
        }); 
    }

    static delete(req, reply) {
        // TasksModel.findByIdAndRemove(req.params.id)
        //     .exec((err, doc) => {
        //        reply.send(doc);
        // });

        TasksModel.findByIdAndUpdate(req.params.id, {
            enable: false
        }).exec((err, doc) => {
            reply.send(doc);
        });
    
    }
};