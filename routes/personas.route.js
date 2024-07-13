const { Router } = require('express');

const PersonaController = require('../controllers/personas.controller');

const router = Router();

//ruta ejemplo:
router.get('/', PersonaController.getPersonas);

router.get('/:id', PersonaController.getPersona);

router.post('/', PersonaController.createPersona);

router.put('/:id', PersonaController.updatePersona);

router.delete('/:id', PersonaController.deletePersona);

module.exports = router;