const { Router } = require('express');
const router = Router();

const { getUsuarios, NewUsuario } = require('../controllers/index.controller');

router.get('/usuarios', getUsuarios);
router.post('/usuarios', NewUsuario);

module.exports = router;