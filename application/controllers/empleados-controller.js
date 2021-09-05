const { responseSuccess, responseFail } = require('../helpers/responses');
const { StatusCodes } = require('http-status-codes');
const empleadoUseCase = require('../../domain/usecase/empleados-usecase');

const data = [
    {
        primerNombre: "José",
        segundoNombre: "Felix",
        primerApellido: "Ribas",
        segundoApellido: "Caldera",
        fechaNacimiento: new Date('2000-01-20'),
        tipoIdentificacion: "cc",
        numeroIdentificacion: "3131588",
        sueldo: 2000.0
    },
    {
        primerNombre: "Kelvin",
        segundoNombre: "Rafael",
        primerApellido: "Mosquera",
        segundoApellido: "Betancourt",
        fechaNacimiento: new Date('197-06-20'),
        tipoIdentificacion: "nit",
        numeroIdentificacion: "66654847",
        sueldo: 3000.0
    },
];

const getEmpleados = async () => {

    let response = null

    try {

        const result = await empleadoUseCase.getEmpleados();
        response = responseSuccess({ data: result });
        
    } catch (error) {

        console.log(error)
        response = responseFail(error);
        
    }

    return response;

}

const createEmpleado = async (empleadoData) => {

    let response = null

    try {

        console.log("empleadoData", empleadoData)
        await empleadoUseCase.createEmpleado(empleadoData);
        response = responseSuccess({ 
            message: "Empleado creado!!"
         }, StatusCodes.CREATED);
        
    } catch (error) {

        response = responseFail(error);
        
    }

    return response;

}

const updateEmpleado = async (empleadoData, id) => {

    let response = null

    try {

        console.log("empleadoData", empleadoData)
        console.log("id", id)
        await empleadoUseCase.updateEmpleado(empleadoData, id);
        response = responseSuccess({ 
            message: "Empleado actualizado!!"
         }, StatusCodes.OK);
        
    } catch (error) {

        response = responseFail(error);
        
    }

    return response;

}

const deleteEmpleado = async (id) => {

    let response = null

    try {

        console.log("id", id)
        await empleadoUseCase.deleteEmpleado(id);
        response = responseSuccess({
            message: "Empleado eliminado"
        }, StatusCodes.OK);
        
    } catch (error) {

        response = responseFail(error);
        
    }

    return response;

}

const getDetailEmpleado = async (id) => {

    let response = null

    try {

        console.log("id", id)
        const empleado = await empleadoUseCase.getDetailEmpleado(id);
        response = responseSuccess({
            data: empleado
        }, StatusCodes.OK);
        
    } catch (error) {
        console.log('getDeattailEmpleado', error)
        
        response = responseFail(error);
        
    }

    return response;

}

module.exports = {
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getDetailEmpleado,
}