
// const {fetch} = require('undici');
const {setTimeOut} = require('node:timers/promises');

const MAGIC_KEY = '25478';

const retraso = setTimeOut;

exports.GeneradorDeLlaveMagicaThirdParty = async (ms) => {

    await retraso(ms);

    const { status } = await fetch(
        'http://localhost:3366/webhook',
        {
            body: JSON.stringify({ magicKey: MAGIC_KEY }),
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
        },
    )

    if (status !== 200) {

        throw new Error('Falló la petición a la magicKey');
    }
}

exports.fetchDataSensible = async (key) => {

    await retraso(700);
    const data = { sensitive: true };

    if (key === MAGIC_KEY) {
        return data
    }

    throw new Error('Clave inválida');
}