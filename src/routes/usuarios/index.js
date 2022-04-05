const express = require('express');
const router = express.Router();

router.get('/usuarios/index', (req, res) => {
    res.render('../usuarios/listaUsuarios.ejs');
});

module.exports = router;