const empleadoAdapter = require('../../application/model_adapters/empleado-adapter');
const { HttpError } = require('../../application/exceptions/http-error')
const { StatusCodes } = require('http-status-codes')

const getEmpleados = async () => {
    return empleadoAdapter.findEmpleados();
}
const createEmpleado = async (empleadoData) => {
    await validarFechaHoy(empleadoData.fechaNacimiento);
    await validarIdentificacionDuplicada(
        empleadoData.tipoIdentificacion,
        empleadoData.numeroIdentificacion
    );

    await empleadoAdapter.createEmpleado(empleadoData);
}

const updateEmpleado = async (empleadoData, id) => {
    await validarFechaHoy(empleadoData.fechaNacimiento);
    await validarExisteEmpleado(id);
    await validarIdentificacionDuplicada(
        empleadoData.tipoIdentificacion,
        empleadoData.numeroIdentificacion,
        id
    );

    await empleadoAdapter.updateEmpleado(empleadoData, id);

}

const deleteEmpleado = async (id) => {

    await validarExisteEmpleado(id);

    await empleadoAdapter.deleteEmpleado(id);

}
const getDetailEmpleado = async (id) => {
    const empleado = await empleadoAdapter.findOneEmpleado(id);

    if(empleado == null)
        throw new HttpError("Empleado no existe", StatusCodes.NOT_FOUND);

    return empleado;
}

const validarIdentificacionDuplicada = async (
    tipoIdentificacion,
    numeroIdentificacion,
    id = null
) => {
    const empleados = 
        await empleadoAdapter.getEmpleadoByTipoNumeroIdentificacion(
            tipoIdentificacion,
            numeroIdentificacion,
            id
        );

    if(empleados.length)
        throw new HttpError("Tipo y número de identificación ya existe", StatusCodes.BAD_REQUEST);
}

const validarExisteEmpleado = async (id) => {
    const empleado = await empleadoAdapter.findOneEmpleado(id);

    if(empleado == null)
        throw new HttpError("Empleado no existe", StatusCodes.NOT_FOUND);
}

const validarFechaHoy = async (fechaNac) => {
    const fechaNacimiento = new Date(fechaNac);
    const today = new Date();
    if ( fechaNacimiento > today )
        throw new HttpError("La fecha es incorrecta", StatusCodes.BAD_REQUEST);
}

module.exports = {
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getDetailEmpleado,
}