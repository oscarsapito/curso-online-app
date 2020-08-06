/*jshint esversion: 6 */

import HttpCliente from '../servicios/HttpCliente';

export const registrarUsuario = usuario => {
    return new Promise( (resolve, eject) => {         //Promesa
        HttpCliente.post('/Usuario/registrar', usuario).then(response => {
            resolve(response);
        })
    })
}


//http://localhost:5000/api/Usuario/registrar