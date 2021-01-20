// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io'); 
const path     = require('path');
const Sokets   = require('./sockets');

class Server  {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);

        // Configuración del socket server
        this.io = socketio(this.server, { /* configuraciones */ });

    }

    execute() {

        // inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();
        // inicializar server
        this.server.listen(this.port, () => {
            console.log(`Servidor en el PORT: ${this.port}`);
        });
    }

    middlewares() {
        //directorio publico
        this.app.use( express.static( path.resolve(__dirname, '../public') ) )

    }

    configurarSockets() {

        new Sokets(this.io);


    }
}


module.exports = Server