//index.js
require("dotenv-safe").config();
const http = require('http'); 
const express = require('express'); 
const app = express(); 
const jwt = require('jsonwebtoken');
 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
 
app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})
 
app.get('/clientes', (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
}) 
 
const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")