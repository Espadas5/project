
const express = require('express');
const { route } = require('./sesion');
const router = express.Router();
const db = require('./sesion/db');
router.get('/', (req, res) => {
    res.render('../home');
});

router.get('/home', (req, res) => {
    // consulta de la base de datos
    res.render('../home.ejs', {mensaje:"Base de datos"});
});

router.get('/home-admin', (req,res) => {
    try {
        db.query('SELECT * FROM videojuegos', function(error, results, fields){
            res.render('../../views/home_admin.ejs', {videojuegos: results});
        });
    } catch (error) {
        throw error
    }
});

router.get('/registro-productos', (req,res) => {
    res.render('../registro_videojuegos.ejs');
});

router.get('/modificar-producto', (req,res) => {
    res.render('../modificar_videojuegos.ejs');
});

router.get('/validado', (req, res)=>{
    res.render('../validado.ejs');
});

router.get('/contacto', (req, res) => {
    res.render('../contacto.ejs', {titulo:'Contacto', mensaje:'Formulario de contacto'});
});

router.get('/formUsuarios', (req,res) => {
    res.render('../usuarios/formUsuarios.ejs');
});

router.get('/formPreguntas', (req,res) => {
    res.render('../usuarios/formPreguntas.ejs');
});

router.get('/preguntas', (req,res) => {
    res.render('../usuarios/preguntas.ejs');
});
router.get('/alerta',(req,res)=>{
    res.render('../alerta.ejs', {titulo:'Alerta', mensaje:'Examen 2do Parcial'});
})

router.get('/numeros', (req,res) => {
    res.render('../usuarios/numeros.ejs');
});

router.get('/sesion', (req,res) => {
    res.render('../sesion/inicio_sesion.ejs');
});

router.get('/sesion-usuario', (req,res) => {
    res.render('../sesion_usuario.ejs');
});

router.get('/registro-exitoso', (req,res) => {
    res.render('../validado.ejs');
});

router.get('/registro-cliente', (req,res) => {
    res.render('../sesion/registro_cliente.ejs');
});

router.get('/registro-videojuegos', (req,res) => {
    res.render('../alta_juegos.ejs');
});

router.get('/acerca', (req,res) => {
    res.render('../acerca.ejs', {titulo:'acerca',mensaje:'Proximamente'});
});

router.get('/crear', (req, res) =>{
    res.render('../agregar.ejs');
});

module.exports = router;