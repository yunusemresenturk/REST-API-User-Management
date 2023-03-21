const messages = {
  "Error": "Hata",
  "Try_Again": "Tekrar deneyin",
  "Success": "Başarılı"
};

const messageMiddleware = (req, res, next) => {
  // messagelar objesinden messageı alırız
  const message = messages[req.message];

  // mesajı req objesine ekledik
  req.message = message;
}

module.exports = messageMiddleware;


// const message = (err, req, res, next) => {
//   if (err) {
//     res.locals.status = 'error';
//     res.locals.message = err.message;
//   } else {
//     res.locals.status = 'success';
//     res.locals.message = null;
//   }
//   next();
// };