const empleadoRest = require('../../infraestructure/rest-clients/historico-client')

const getHistoricoEmpleado = async (id) => {
    try {
        const result = await empleadoRest.getHistoricoEmpleado(id);
        return result.data.data
        
    } catch (error) {
        console.log('getHistoricoEmpleadoAdapter@error', error)
        return [];
    }
}

const saveHistoricoEmpleado = async (sueldoNuevo, sueldoAnterior, id) => {

    try {

        const body = {
            sueldoNuevo,
            sueldoAnterior
        }
        
        await empleadoRest.saveHistoricoEmpleado(id, body);
        
    } catch (error) {
        console.log('saveHistoricoEmpleadoAdapter@error', error)
    }

}

module.exports = {
    getHistoricoEmpleado,
    saveHistoricoEmpleado
}