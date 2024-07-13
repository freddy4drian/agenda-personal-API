const { Router } = require('express');

const GeneroController = require('../controllers/generos.controller');

const router = Router();

//ruta ejemplo:
router.get('/', GeneroController.getGeneros);

router.get('/:id', GeneroController.getGenero);

router.post('/', GeneroController.createGenero);

router.put('/:id', GeneroController.updateGenero);

router.delete('/:id', GeneroController.deleteGenero);

module.exports = router;