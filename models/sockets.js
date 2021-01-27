const Marcadores = require("./marcadores");


class Sokets {

    constructor( io ) {
        this.io = io;
        this.marcadores = new Marcadores();
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {

            socket.emit('marcadores-activos', this.marcadores.activos);

            socket.on('macador-nuevo', (marcador) =>{
                this.marcadores.agregarMarcador(marcador);

                socket.broadcast.emit('macador-nuevo', marcador);
            });

            socket.on('marcador-actualizado', (marcador) => {
                this.marcadores.actualizarMarcador( marcador );
                socket.broadcast.emit('marcador-actualizado', marcador);
            });


                   
        });
    }
}

module.exports = Sokets