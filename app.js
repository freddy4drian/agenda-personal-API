require('dotenv').config();

const Server = require('./config/Server');

const server = new Server();
server.listen();
