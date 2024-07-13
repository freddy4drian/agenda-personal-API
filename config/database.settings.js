const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize(process.env.DATABASE_STR_CONN) // Example for postgres

const DBconnect = async () => {
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
   } catch (error) {
      console.error('Unable to connect to the database:', error);
   }
}


module.exports = DBconnect;
