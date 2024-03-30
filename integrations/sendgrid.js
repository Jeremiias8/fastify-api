
const config = require('../config/config');
// const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.SENDGRID_API_KEY);

module.exports = class SendGrid {

    static send(params) {

        return new Promise((resolve, reject) => {

          return sgMail.send({
            from: 'FASTIFY-API-APP <jerito+fastify-api-app-@mail.com',
            to: 'geroalc@gmail.com',
            subject: 'Notificación desde la API',
            html: `Tarea completada ${params.task.title}`
          }).then(resolve).catch(reject);
        });
    }

}