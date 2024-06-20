const express = require('express');
const cors = require('cors');

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.paths = {
         persons: '/persons'
      }
      
      this.router = express.Router(); // se utiliza para asignar el prefijo "api" a las rutas
      
      //middlewares
      this.middlewares();

      //rutas de la app
      this.routes();
   }

   middlewares(){
      this.app.use( express.json() );
      this.app.use( express.urlencoded({ extended: true })) ;
      this.app.use( cors() )
      this.app.use( '/api', this.router );
   }

   
   routes(){
      this.router.use(this.paths.persons, require('../routes/person.route'));
   }
   listen() {
      this.app.listen(this.port, () => {
         console.log(`Server is running on port ${this.port}`);
      });
   }
}

module.exports = Server;