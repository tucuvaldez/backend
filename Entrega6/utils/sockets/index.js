let { Server: SocketIO } = require("socket.io");
class Socket {
    static instancia;
    constructor(http) {
        if (Socket.instancia) {
            return Socket.instancia;
        }
        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.mensajes = [];
        this.usuarios = [];
        this.productos = [];
    }
    init() {
        try {
            this.io.on('connection', socket => {
                console.log("Usuario conectado!");
                this.io.sockets.emit("init", this.mensajes);
                this.io.sockets.emit("init", this.productos);

                // Escuchamos el mensaje de un usuario y lo emitimos a todos los conectados
                socket.on("mensaje", data => {
                    this.mensajes.push(data);
                    this.io.sockets.emit("listenserver", this.mensajes);
                });

                socket.on("productos", data => {
                    this.productos.push(data);
                    this.io.sockets.emit("listenserver", this.productos);
                });
                socket.on("addProd", data => {
                    console.log(data)
                    if (this.productos.length) {
                        this.productos.push(data)
                    }
                })

                socket.on("addUser", data => {
                    console.log(data);
                    if (this.usuarios.length) {
                        let verificacion_user = false;
                        this.usuarios = this.usuarios.map(usuario => {
                            if (usuario.email == data.email) {
                                verificacion_user = true;
                                return {
                                    id: socket.id,
                                    ...data,
                                    active: true
                                }
                            } else {
                                return usuario;
                            }
                        })
                        if (!verificacion_user) {
                            this.usuarios.push({
                                id: socket.id,
                                ...data,
                                active: true
                            })
                        }
                    } else {
                        this.usuarios.push({
                            id: socket.id,
                            ...data,
                            active: true
                        })
                    }
                    // this.mensajes.push(data);
                    this.io.sockets.emit("loadUsers", this.usuarios);
                });

                socket.on("disconnect", () => {
                    console.log("Se desconectó ", socket.id);
                    this.usuarios = this.usuarios.map(usuario => {
                        if (usuario.id == socket.id) {
                            delete usuario.active;
                            return {
                                ...usuario,
                                active: false
                            }
                        } else {
                            return usuario;
                        }
                    });
                    this.io.sockets.emit("loadUsers", this.usuarios);
                })

                // socket.emit("init", socket.id);
                // socket.on("keyup", data =>{
                //   this.mensajes = data;
                //   this.io.sockets.emit("fillP", data);
                // });
            })
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = Socket;