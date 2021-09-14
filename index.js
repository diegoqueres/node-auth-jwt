//index.js
require("dotenv-safe").config();
const fs = require('fs');
const http = require('http'); 
const express = require('express'); 
const app = express(); 
const jwt = require('jsonwebtoken');
const blacklist = [];   //usar redis ou tabela, etc
 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
 
app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})
 
app.get('/clientes', verifyJWT, (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
}) 
	
//authentication
app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'luiz' && req.body.password === '123'){
      //auth ok
      const userId = 1; //esse id viria do banco de dados
      const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
      const token = jwt.sign({ userId }, privateKey, {
        expiresIn: 300,   // expires in 5min
        algorithm:  "RS256"   //SHA-256 hash signature
      });

      console.log("Fez login e gerou token!");
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

app.post('/logout', function(req, res) {
    const token = req.headers['x-access-token']; 
    blacklist.push(token);
    res.json({ auth: false, token });
})

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];   
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    if (blacklist.includes(token)) return res.status(401).json({ auth: false, message: 'User already logged out.' });
    
    const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.userId;
      next();
    });
}

const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")