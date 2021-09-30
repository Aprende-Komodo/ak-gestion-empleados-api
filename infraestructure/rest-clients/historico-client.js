const axios = require('axios');
const headers = {
    'x-api-key': process.env.SERVICE_HISTORICO_KEY
}

const saveHistoricoEmpleado = async (id, body) => {
    return axios.post(
        process.env.SERVICE_HISTORICO+'/historicos/'+id,
        body,
        {
            headers: headers
        }
    );
}

const getHistoricoEmpleado = async (id) => {
    return axios.get(
        process.env.SERVICE_HISTORICO+'/historicos/'+id,
        {
            headers: headers
        }
    )
}

module.exports = {
    saveHistoricoEmpleado,
    getHistoricoEmpleado
}