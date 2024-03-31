const config = require('../config/config');

module.exports = {
    esUnDominioValido: (req, res, done) => {

        if (config.LISTA_BLANCA_DE_DOMINIO.includes(req.headers.origin || req.headers.host)) {

            return done();
        } else {
            return res.send({
                status: 'error',
                origin: req.headers.origin || req.headers.host
            });
        }
    }
}