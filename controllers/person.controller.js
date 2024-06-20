const { response } = require('express');


const getPersons = (req, res = response) => {

   const { q, page } = req.query;

   res.json({
      q,
      page,
      msg: 'getPersons API - controller'
   });
}

const getPerson = (req, res = response) => {

   const { id } = req.params;

   res.json({
      id,
      msg: 'getPerson API - controller'
   });
}

//ejemplo post, sacar los datos del body
const createPerson = (req, res = response) => {

   const { name, age } = req.body;  //tambien puede ser: const body = req.body;  => body.name, body.age
    

   res.json({
      msg: {
         name,
         age
      }
   });
}

const updatePerson = (req, res = response) => {

   const { id } = req.params;

   res.json({
      id,
      msg: 'updatePerson - controller'
   });
}

const deletePerson = (req, res = response) => {

   const { id } = req.params;

   res.json({
      id,
      msg: 'deletePerson - controller'
   });
}

module.exports = {
   getPersons,
   getPerson,
   createPerson,
   updatePerson,
   deletePerson

}





// Opcion con clases:

// const { response } = require('express');

// class PersonController {
//     getPersons(req, res = response) {
//         res.json({
//             msg: 'getPersons API - controller'
//         });
//     }

//     getPerson(req, res = response) {
//         res.json({
//             msg: 'getPerson API - controller'
//         });
//     }

// }

// module.exports = new PersonController();