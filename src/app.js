const express = require('express');
const os = require("os")
const app = express();
const path = require('path');

// Requerimos el módulo de datos de pokeneas
app.use(express.json());
const pokeneasData = require('./pokeneas');

const server = express();
const serverPort = 80;

// Habilitar el middleware para parsear JSON
server.use(express.json());

// Servir archivos estáticos desde el directorio 'public'
server.use(express.static('public'));

// Ruta para servir la página principal
server.get('/pokenea', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta para mostrar información JSON de un pokenea aleatorio
server.get('/api/randompokenea', (request, response) => {
    const index = Math.floor(Math.random() * pokeneasData.length);
    const randomPokenea = { ...pokeneasData[index], hostname: os.hostname() };
    response.json(randomPokenea);
});

// Ruta para filtrar y mostrar información específica de un pokenea
server.get('/api/pokenea', (request, response) => {
    const index = Math.floor(Math.random() * pokeneasData.length);
    const pokenea = pokeneasData[index];
    const attributes = ['id', 'name', 'height', 'ability'];
    const filteredPokenea = attributes.reduce((result, attr) => {
        if (pokenea[attr]) result[attr] = pokenea[attr];
        return result;
    }, { hostname: os.hostname() });

    response.json(filteredPokenea);
});

// Iniciar el servidor
server.listen(serverPort, () => {
    console.log(`Server is running on http://localhost:${serverPort}`);
});