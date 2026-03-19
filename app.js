const gestorEventos = require('./gestorEventos');

const chalk = require('chalk');
//En primer lugar importamos el mudolo previamente creado, gestroEventos. 
//Tambien se importa el modulo chalk. 
//Dado que uno es un modulo de terceros y el otro es local, se usan rutas diferentes para indicarlos.

const gestor = new gestorEventos();
//Se crea una instancia de la clase gestorEventos, ejecutando su constructor previamente creado.

function verificarExito(){  return Math.random() < 0.5;}
//Se define una funcion para verificar el exto del pago, que devuelve un booelano aleatorio en función de si un numero aleatorio es menor o no que 0.5.
//Lo que simula un 50% de exito en el pago. 

function procesarPagos(pedido){
//En primer lugar se crea una funcion para procesar el pago, en el que le pasamos un objeto pedido
//Esta funcion devuelve una promesa, que simula si el pago es existoso o no
//Y dependiendo de ello se continua con el resto del código.

//Se usa un setTimeout para simular el tiempo que el terminal de pago puede tardar en ejecutar el pago, y que ademas
//pueda apreciarse la correcta visualización del proceso. 
    return new Promise((resolve, reject) => {

        //Se define un array de errores posibles, y se selecciona uno de ellos de forma aleatorioa para poder simular diferenes situaciones.

        const errored = [
            '400 Bad Request',
            '404 Not Found',
            '418 Soy una tetera',
            '500 Internal Server Error',
            '503 Service Unavailable'
        ]   
    //Se obitene el indice del error en el array multiplicando la longitud del array por un numero aleatorio y redondeando para obtener un numero entero. 
    let erroredid = errored[Math.floor(Math.random() * errored.length)];

    //Se define un segundo array de posibles errores achacables al cliente, comoe saldo insuficente o targeta caducada. Ademas, hay una referencia 
    //al primer array para simular el fallo que pueda ser del sistema y no del cliente. 
        const errores = [
            'Saldo insuficiente',
            'Tarjeta caducada',
            `${erroredid}`,
            'Pago rechazado por el banco'
        ];

        //Se repite la misma operacion anterior para obtener un error aleatorio del segundo array. 

        let error = errores[Math.floor(Math.random() * errores.length)];

      //Con setTiemout se simula el tiempo de espera que tarda el tpv en procesar el pago, y dentro de esa funcion se verifica si el pago es exitos o no
      //Si el pago es exitoso, se resuelve la promesa con el pedido, y si no, se rechaza con un nuevo error que contiene el mensaje de error aleatorio. 
        setTimeout(() => {

            if(verificarExito()){

                resolve(pedido);
            } else {

                reject(new Error(error));
            }
        }, 3000);
    });
}

//Se de fine la funcion realizarPedidio, que se encargar de ejeuctar el proceso completo de realizar un pedidio.
//En primer lugar se emite el evento de "NuevoPedido", para a continuación emitir el evento de "procesarPago". 
//En ese punto y mediante un try/cath se llama a la funcion procesarPagos, que devuelve una promesa, y dependiendo del valor devuelto se emite 
//el evento de "pedidoConfirmado" o el de "pedidoFallido".
//Para ello se usa un await para esperar a que se resulva la promesa y asi poder tener la información adecuada para emitir el evento correspondiente.
async function realizarPedido(pedido){

    gestor.emit('nuevoPedido', pedido);

    gestor.emit('procesarPago', pedido);

   
    try{

       await procesarPagos(pedido);

        gestor.emit('pedidoConfirmado', pedido);

    } catch(error){

        gestor.emit('pedidoFallido', pedido, error);
    }


}


//Finalmente se define una funcion main para simular la realización de dos pedidos. Se usa async nuevamente para poder usar await al llamar a la función de RealizarPEdido
//y asi poder esperar a que se resuelva cada pedidio antes de iniciar el siguiente. 
async function simularPedido(){

    //Dentro de cada pedidio, mediante una función aleatoria, se asigna un tiempo de preparacion del pedido. 
    const pedido1 = {

        cliente: 'Alvaro',
        detalles: 'Pizza de pepperoni',
        precio : 15.99,
        tiempo: Math.floor(Math.random() * 10) + 1
    };

    console.log('\n');

    await realizarPedido(pedido1);

    console.log('\n');

    const pedido2 = {

        cliente: 'Maria',
        detalles: 'Hamburguesa con queso',
        precio : 12.49,
        tiempo: Math.floor(Math.random() * 10) + 1
    };

    await realizarPedido(pedido2);
}   

//Finalmente se llama a la funcion de simularPedidio para iniciar el proceso de simulación de pedidos.
simularPedido()


//El orden de ejecución usando asincronia es por tantoi: simularPedido -> realizarPedido -> procesarPagos -> verificarExito -> resolver promesa -> emitir evento en realizarPedido
//En caso de que el pago no sea exitoso, el orden de ejecución sería: simularPedido -> realizarPedido -> procesarPagos -> verificarExito -> rechazar promesa -> emitir evento en realizarPedido