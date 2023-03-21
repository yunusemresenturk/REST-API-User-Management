const express = require("express");
const morganBody = require('morgan-body');
const userRouter = require('./routes/users');
const bodyParser = require('body-parser');

const server = express();

// const messageMiddleware = require('./middlewares/message.js');
// const responseMiddleware = require('./middlewares/response.js');
// const logMiddleware = require('./middlewares/log.js');


server.use(express.json());
// json verisi aldığımızı belirtiriz
server.use(bodyParser.json());
// urlencoded veri tipine izin veririz, extended: true'yi belirtmezsek gelen veriler boş olur.
server.use(bodyParser.urlencoded({ extended: true }));
// morganBody(server);
// server.use(logMiddleware);
// server.use(messageMiddleware);
// server.use(responseMiddleware);
server.use('/users', userRouter);

server.get('/', (req, res) => {
    res.send('Expressten merhabalarr');

});

// // Error handler example
// server.use((err, req, res, next) => {
//     // Send error response with custom message key
//     res.sendResponse(400, null, 'Error');
//   });

server.listen(5000, () => {
    console.log("http://localhost:5000 adresine gelen istekler dinleniyor...");
});