const { Router } = require('express');

const ParentescoController = require('../controllers/parentescos.controller');

const router = Router();

//ruta ejemplo:
router.get('/', ParentescoController.getParentescos);

router.get('/:id', ParentescoController.getParentesco);

router.post('/', ParentescoController.createParentesco);

router.put('/:id', ParentescoController.updateParentesco);

router.delete('/:id', ParentescoController.deleteParentesco);

module.exports = router;