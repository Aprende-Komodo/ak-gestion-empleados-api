const { db } = require('../../infraestructure/repositories/connections');
const empleadoQuery = require('../../infraestructure/repositories/empleados-query');
const empleadoDto = require('../helpers/empleado-dto');

const findEmpleados = async () => {
    const data = await empleadoQuery.findEmpleados();
    console.log('findEmpleados@data', data)
    return empleadoDto.getEmpleadosFromDBArray(data);
}

const findOneEmpleado = async (id) => {
    const data = await empleadoQuery.findOneEmpleado(id);
    console.log('findOneEmpleado', data)
    return (data == null || data.length == 0)
     ? null
     : empleadoDto.getEmpleadoFromDBDto(data[0]);
}

const createEmpleado = async ({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    tipoIdentificacion,
    numeroIdentificacion,
    sueldo
}) => {
    await empleadoQuery.createEmpleado(
        empleadoDto.getDBFromEmpleadoDto({
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            fechaNacimiento,
            tipoIdentificacion,
            numeroIdentificacion,
            sueldo
        })
    )
}

const updateEmpleado = async ({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    tipoIdentificacion,
    numeroIdentificacion,
    sueldo
}, id) => {
    await empleadoQuery.updateEmpleado(
        empleadoDto.getDBFromEmpleadoDto({
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            fechaNacimiento,
            tipoIdentificacion,
            numeroIdentificacion,
            sueldo
        }),
        id
    )
}

const deleteEmpleado = async (id) => {
    await empleadoQuery.deleteEmpleado(id);
}

const getEmpleadoByTipoNumeroIdentificacion = async (
    tipoIdentificacion,
    numeroIdentificacion, 
    id = null
) => {
    const result = await empleadoQuery.getEmpleadoByTipoNumeroIdentificacion(
        tipoIdentificacion,
        numeroIdentificacion,
        id
    );

    return (result == null || result.length == 0) 
        ? []
        : empleadoDto.getEmpleadosFromDBArray(result);
}

module.exports = {
    findEmpleados,
    findOneEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getEmpleadoByTipoNumeroIdentificacion,
}