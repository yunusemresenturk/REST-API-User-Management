module.exports =
  messages = {
    Error: "Hata",
    Try_Again: "Tekrar deneyin",
    Successful: "İşlem başarılı.",
    NotFound:"Bulunamadı."
  };

// const messageMiddleware = (req, res, next) => {
//   // messagelar objesinden messageı alırız
//   const message = messages[req.message];

//   // mesajı req objesine ekledik
//   req.message = message;
// };