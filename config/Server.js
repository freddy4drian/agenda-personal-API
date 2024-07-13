const express = require('express');
const cors = require('cors');
const DBconnect = require('./database.settings');

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.paths = {
         persons: '/person',
         genders: '/gender',
         relations: '/relation',
         relationships: '/relationship',
      }
      
      this.router = express.Router(); // se utiliza para asignar el prefijo "api" a las rutas

      // Iniciando conexión a mysql
      this.DBConn();
      
      //middlewares
      this.middlewares();

      //rutas de la app
      this.routes();
   }

   // método de conexión a la base de datos
   async DBConn() {
      await DBconnect();
   }

   middlewares(){
      this.app.use( express.json() );
      this.app.use( express.urlencoded({ extended: true })) ;
      this.app.use( cors() )
      this.app.use( '/api', this.router );
   }

   
   routes(){
      this.router.use(this.paths.persons, require('../routes/personas.route'));
      this.router.use(this.paths.genders, require('../routes/generos.route'));
      this.router.use(this.paths.relations, require('../routes/relaciones.route'));
      this.router.use(this.paths.relationships, require('../routes/parentescos.route'));
   }
   listen() {
      this.app.listen(this.port, () => {
         console.log(`Server is running on port ${this.port}`);
      });
   }
}

module.exports = Server;