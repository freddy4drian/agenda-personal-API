const { Router } = require('express');

const RelacionController = require('../controllers/relaciones.controller');

const router = Router();

//ruta ejemplo:
router.get('/', RelacionController.getRelaciones);

router.get('/:id', RelacionController.getRelacion);

router.post('/', RelacionController.createRelacion);

router.put('/:id', RelacionController.updateRelacion);

router.delete('/:id', RelacionController.deleteRelacion);

module.exports = router;