const express = require("express");
const morganBody = require('morgan-body');
const router = require('./routes/users');
const bodyParser = require('body-parser');
const responseMiddleware = require('./middlewares/response.js');
const messages = require('./middlewares/message.js');
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







// server.get('/', (req, res) => {
//     res.send('Expressten merhabalarr');

// });

server.listen(5000, () => {
    console.log("http://localhost:5000 adresine gelen istekler dinleniyor...");
});