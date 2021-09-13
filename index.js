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
	
//authentication
app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'luiz' && req.body.password === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

/*
    Se quiser adicionar uma camada a mais de segurança, você pode ter uma blacklist de tokens que fizeram logout, para impedir reuso deles depois do logout realizado. Apenas lembre-se de limpar essa lista depois que eles expirarem ou use um cache em Redis com expiração automática.
*/
//logout
app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")