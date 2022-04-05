const express = require('express');
const app = express();
const path = require('path');

//recursos estaticos
const puerto = process.env.PORT || 4000;
app.set('port', puerto);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views/usuarios'));
app.set('views', path.join(__dirname, 'views/sesion'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index'));
app.use(require('./routes/usuarios/index'));
app.use(require('./routes/sesion/index'));

//crear el servidor
app.listen(app.get('port'), () => {
    console.log(`El servidor responde por el puerto ${app.get('port')}`);
});