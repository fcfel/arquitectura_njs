 // Importación de módulos
const express = require('express'); // Importamos el módulo 'express' que nos permite crear y gestionar servidores web de manera sencilla
const mysql = require('mysql'); // Importamos el módulo 'mysql' para trabajar con la base de datos MySQL
const cors = require('cors'); // Importamos el módulo 'cors' para permitir solicitudes de otros dominios

// Creación de una instancia de la aplicación Express
const app = express();
app.use(express.json());
app.use(cors()); // Habilitamos el uso de CORS en nuestra aplicación

// Configuración del servidor para escuchar peticiones en el puerto 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000"); // Mensaje que se imprime en la consola cuando el servidor se inicia correctamente
});

// Conexión a la base de datos MySQL
var connection = mysql.createConnection({
    host: 'localhost', // Dirección del servidor MySQL
    user: 'root', // Nombre de usuario de la base de datos MySQL
    password: 'Fel_pe090524', // Contraseña del usuario de la base de datos MySQL
    database: 'usuarios' // Nombre de la base de datos MySQL
});

// Manejo de errores de conexión a la base de datos MySQL
connection.connect((err) => {
    if(err){
        console.log('Error connecting to database', err); // Imprimir el error en la consola si la conexión falla
        return;
    }
    console.log('Connected to database'); // Mensaje que se imprime en la consola cuando la conexión a la base de datos es exitosa
});



// ------------------------------------------------------------------------------------------------------------------------------------------------------



// Definición de una ruta GET para la raíz del servidor ('/')
app.get('/', (req, res) => {
    res.send('Hello from Node API server'); // Enviamos la respuesta 'Hello from Node API' al cliente que hizo la solicitud
});


// Ruta POST para crear un nuevo usuario
app.post('/usuarios', (req, res) => {

    const { email, nombre, activo } = req.body; // Recibimos los datos del nuevo usuario desde el cuerpo de la solicitud

    // Realizamos la consulta SQL para insertar el nuevo usuario en la base de datos
    connection.query('INSERT INTO usuariostable (email, nombre, activo) VALUES (?, ?, ?)', [email, nombre, activo], (err, result) => {
        if (err) {
            console.log('Error al insertar usuario:', err);
            res.status(500).send('Error interno del servidor al crear usuario');
        } else {
            console.log('Usuario creado exitosamente');
            res.status(201).send('Usuario creado exitosamente');
        }
    });
});


// Ruta GET para obtener todos los usuarios
app.get('/usuarios', (req, res) => {

    // Realizamos la consulta SQL para obtener todos los usuarios de la base de datos
    connection.query('SELECT * FROM usuariostable', (err, rows) => {
        if (err) {
            console.log('Error al obtener usuarios:', err);
            res.status(500).send('Error interno del servidor al obtener usuarios');
        } else {
            res.json(rows); // Enviamos la lista de usuarios como respuesta en formato JSON
        }
    });
});


// Ruta GET para obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {

    const userId = req.params.id; // Obtenemos el ID del usuario desde los parámetros de la solicitud

    // Realizamos la consulta SQL para obtener el usuario con el ID especificado
    connection.query('SELECT * FROM usuariostable WHERE id = ?', [userId], (err, rows) => {
        if (err) {
            console.log('Error al obtener usuario:', err);
            res.status(500).send('Error interno del servidor al obtener usuario');
        } else if (rows.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json(rows[0]); // Enviamos el usuario encontrado como respuesta en formato JSON
        }
    });
});


// Ruta DELETE para eliminar un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
    
    const userId = req.params.id; // Obtenemos el ID del usuario desde los parámetros de la solicitud

    // Realizamos la consulta SQL para eliminar el usuario con el ID especificado
    connection.query('DELETE FROM usuariostable WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.log('Error al eliminar usuario:', err);
            res.status(500).send('Error interno del servidor al eliminar usuario');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            console.log('Usuario eliminado exitosamente');
            res.status(200).send('Usuario eliminado exitosamente');
        }
    });
});

app.put('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const { email, nombre, activo } = req.body;

    connection.query('UPDATE usuariostable SET email = ?, nombre = ?, activo = ? WHERE id = ?', [email, nombre, activo, userId], (err, result) => {
        if (err) {
            console.log('Error al actualizar usuario:', err);
            res.status(500).send('Error interno del servidor al actualizar usuario');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            console.log('Usuario actualizado exitosamente');
            res.status(200).send('Usuario actualizado exitosamente');
        }
    });
});
