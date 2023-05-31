const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server {

  constructor() {
    this.app    = express()
    this.port   = process.env.PORT
    // server que tengo que levantar, no el de express
    this.server = require('http').createServer( this.app )
    // en io esta toda la informacion de los clientes conectados
    this.io = require('socket.io')( this.server )

    this.paths = {}
    
    // Middlewares
    this.middlewares()

    // Rutas de mi aplicacion
    this.routes()

    // Sockets
    this.sockets()
  
  }

  middlewares() {

    // CORS
    this.app.use( cors() )

    // Directorio Público
    this.app.use( express.static('public') )

  }

  routes() {
    //this.app.use(this.paths.auth, require('../routes/auth'))
  
  }

  sockets(){

    this.io.on('connection', socketController )

  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port )
    })
  }

}

module.exports = Server





