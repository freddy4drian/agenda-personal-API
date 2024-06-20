const { Router } = require('express');

const { 
   getPersons, 
   getPerson, 
   deletePerson, 
   createPerson, 
   updatePerson 
} = require('../controllers/person.controller');

const router = Router();

//ruta ejemplo:
router.get('/', getPersons);

router.get('/:id', getPerson);

router.post('/', createPerson);

router.put('/:id', updatePerson);

router.delete('/:id', deletePerson);

module.exports = router;