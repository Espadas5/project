const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('./db');
const path = require('path');
const app = express();
const session = require('express-session');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'proyecto_ruiz'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.post('/auth', function(request, response) {
	// Capture the input fields
		let correo = request.body.correo;
		let password = request.body.password;
        let tipo = request.body.tipo;
        let a = 0;
        if(tipo == '1'){
            if (correo && password) {
                // Execute SQL query that'll select the account from the database based on the specified username and password
                connection.query('SELECT * FROM usuarios WHERE correo=? AND password=?', [correo, password], function(error, results, fields) {
                    // If there is an issue with the query, output the error
    
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        // Authenticate the user
                        request.session.loggedin = true;
                        request.session.correo = correo;
                        // Redirect to home page
    
                            response.redirect('/sesion-usuario');
                        
                    } else {
                        response.send('Incorrect Username and/or Password!');
                    }			
                    response.end();
                });
            } else{
                response.send('Please enter Username and Password!');
                response.end();
            }
        }else if(tipo == '2'){
            if (correo && password) {
                // Execute SQL query that'll select the account from the database based on the specified username and password
                connection.query('SELECT * FROM administradores WHERE correo=? AND password=?', [correo, password], function(error, results, fields) {
                    // If there is an issue with the query, output the error
    
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        // Authenticate the user
                        request.session.loggedin = true;
                        request.session.correo = correo;
                        // Redirect to home page
    
                            response.redirect('/home-admin');
                        
                    } else {
                        response.send('Incorrect Username and/or Password!');
                    }			
                    response.end();
                });
            } else {
                response.send('Please enter Username and Password!');
                response.end();
            }
        }
		
});

app.post('/agregar', function(req, res){
    try{
            let nombre = req.body.nombre;
            let desarrolladora = req.body.desarrolladora;
            let precio = req.body.precio;
            let descuento = req.body.descuento;
            let imagen = req.body.imagen;

        connection.query('INSERT INTO videojuegos ( nombre, desarrolladora, precio, descuento, imagen) VALUES(?, ?, ?, ?, ?)', 
        [nombre, desarrolladora, precio, descuento, imagen], (error, results, fields)=>{
            res.redirect('/home-admin');
        });

    }catch(error){
        throw error
    }
    });

    app.get('/eliminar', function(req, res){
        try{

            let id = req.query.id;
            connection.query('DELETE FROM videojuegos WHERE id_producto=?', [id], (error, results, fields)=>{
                res.redirect('/home-admin');
            });

        }catch(error){
            throw error;
        }
    });

    app.post('/registro', function(req, res){
        try{
                let nombre = req.body.nombre;
                let apellido = req.body.apellido;
                let username = req.body.username;
                let correo = req.body.correo;
                let password = req.body.password;
    
            connection.query('INSERT INTO usuarios ( nombre, apellido, username, correo, password) VALUES(?, ?, ?, ?, ?)', 
            [nombre, apellido, username, correo, password], (error, results, fields)=>{
                res.redirect('/validado');
            });
    
        }catch(error){
            throw error
        }
        });

module.exports = router;
module.exports = app;