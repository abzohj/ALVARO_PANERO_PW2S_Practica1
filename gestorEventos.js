const chalk = require('chalk');
const EventEmitter = require('events');

//gestorEventos es un modulo que exporta una clase. Extiende de EventEmitter para manejar eventos personalizados relacionados con el nucleo de la 
//aplicacion, como son la gestion de pedidos, confirmaciones, y fallos. Al crear la instancia se configuran los eventos para mostrar mensajes 
//personalizados en la consola, utilizando "chalk" para mejorar la apareincia visual. Este modulo se integra con el resto de la aplicación.
//A su vez en esta clase se importan los modulos de chalk y de EventEmitter para poder usar sus funcionalidades. 


class gestorEventos extends EventEmitter{

    constructor(){
        super();


//Se crea el metodo especial constructor que se ejecuta al crear una instancia de la clase. Se usa para inicializar todo lo que la clase necestia
//desde el principio. Con Super() se llama al constructor de la clase padre, de la que se extiende, en este caso EventEmitter, 
// para asegurarse de que se inicialice correctamente. 


//A continuacion se configuran los eventos personalizados. Dentro del constructor, se registran todos los listeners con this.on().
//Asi mismo tambien se hace referencia al parametro que recibe el listener, en este caso, la palabra "pedido", que se 
//utiliza pra mostrar la información desada del evento. 

        this.on('nuevoPedido', (pedido) => {

            console.log(chalk.cyan('+').repeat(50));
             //Añadiendo .repeat(50) se consigue repetir la cadena previa tantas veces como queramos, generando un código mas limpio.
            console.log(chalk.yellow.bold('NUEVO PEDIDO RECIBIDO'));
            console.log(chalk.whiteBright(`Cliente: ${pedido.cliente}`));
            console.log(chalk.whiteBright(`Detalles: ${pedido.detalles}`));
            console.log(chalk.whiteBright(`Precio: ${pedido.precio}`));
            console.log(chalk.cyan('+').repeat(50));
        });
        
        this.on('procesarPago', (pedido) => {

            console.log(chalk.yellow.inverse(`Se esta procesando el pago del cliente ${pedido.cliente}`));
        });

        this.on('pedidoConfirmado', (pedido) => {

            console.log(chalk.cyan('+').repeat(50));
            console.log(chalk.bgGreen('PEDIDO CONFIRMADO'));
            console.log(chalk.greenBright(`Cliente: ${pedido.cliente}`));
            console.log(chalk.greenBright(`El tiempo de preparación es de: ${pedido.tiempo} minutos`));
            console.log(chalk.cyan('+').repeat(50));
        });

        this.on('pedidoFallido', (pedido, motivo) => {

            //En este caso, el evento tiene dos parametros, el pedido y le motivo del fallo. 
            //Cuando el fallo paga puede ser por varios factores, y no tiene mucho sentido que se el cliente quien determien porque motivo va a fallar el pago
            //Por lo que ese factor se determina dentro de la funcion que se encarga de procesar el pago y se le pasa como parametro al evento para que lo muestre. 

            console.log(chalk.cyan('+').repeat(50));
            console.log(chalk.bgRed('PEDIDO FALLIDO'));
            console.log(chalk.redBright(`Cliente: ${pedido.cliente}`));
            console.log(chalk.redBright(`${motivo}`));
            console.log(chalk.cyan('+').repeat(50));
        });
    }
}


//Finalmente se exporta el modulo mediante el método module.exports y asignaándole la clase gestorEventos, para que pueda ser utilizado en otras partes de la aplicación. 
//Para que cualquier archivo qeu importe este módulo pueda crear instancias de la clase indicada y acceder a sus metods y eventos.
module.exports = gestorEventos;