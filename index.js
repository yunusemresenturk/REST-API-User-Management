const express = require('express');
const morganBody = require('morgan-body');
const router = require('./routes/users.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const responseMiddleware = require('./middlewares/response.js');
/* const messages = require('./middlewares/message.js'); */

dotenv.config();

const server = express();

server.use(express.json());
// json verisi aldığımızı belirtiriz
server.use(bodyParser.json());
// urlencoded veri tipine izin veririz, extended: true'yi belirtmezsek gelen veriler boş olur.
server.use(bodyParser.urlencoded({extended: true}));

server.use(responseMiddleware);

morganBody(server, {
    logRequestBody: true,
    logResponseBody: true,
});

server.use('/users', router);

server.get("/", (req, res)=>{
    res.json({"Hi":"Hello World"})
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})