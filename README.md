# ALVARO_PANERO_PW2S_Practica1
Ejercicio de Node.js usando eventos, promesas y asincronia
# BurgerPrince - Sistema de Gestión de Pedidos

Sistema de gestión de pedidos desarrollado en Node.js que simula la recepción,
procesamiento y confirmación de pedidos de una cadena de hamburgueserías.

## Descripción

Este proyecto simula el flujo completo de un pedido:
1. Recepción del pedido del cliente
2. Inicio del procesamiento del pago
3. Confirmación o fallo del pago de forma aleatoria

## Tecnologías utilizadas

- **Node.js** — Entorno de ejecución
- **EventEmitter** — Módulo nativo de Node.js para la gestión de eventos
- **Chalk** — Paquete externo para mostrar mensajes con color en consola
- **Promesas y async/await** — Para el manejo de operaciones asíncronas

## Estructura del proyecto
```
ALVARO_PANERO_PW2S_Practica1/
├── app.js            ← Punto de entrada principal
├── gestorEventos.js  ← Clase con los listeners de eventos
├── package.json      ← Configuración del proyecto
└── README.md         ← Documentación
```

## Instalación

1. Clona el repositorio:
   git clone https://github.com/abzohj/ALVARO_PANERO_PW2S_Practica1.git

2. Entra en la carpeta:
   cd ALVARO_PANERO_PW2S_Practica1

3. Instala las dependencias:
   npm install

## Uso

Ejecuta la aplicación con:
   node app.js

## Funcionalidades

- Simulación de recepción de pedidos con datos del cliente
- Procesamiento de pago con espera asíncrona de 3 segundos
- Resultado aleatorio del pago (50% éxito / 50% fallo)
- Mensajes de error aleatorios en caso de fallo
- Tiempo de preparación aleatorio en caso de éxito
- Mensajes en consola con colores mediante Chalk

##Conceptos aplicados

- **EventEmitter**: Clase extendida para gestionar eventos personalizados
- **Promesas**: Para simular operaciones asíncronas como el procesamiento del pago
- **async/await**: Para manejar las promesas de forma ordenada y legible
- **try/catch**: Para capturar los errores de las promesas rechazadas
- **Módulos CommonJS**: Uso de require/module.exports para organizar el código

##Autor

Álvaro Panero Quiroga
