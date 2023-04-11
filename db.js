const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://emresenturk:81K5EqX3nCaPlyNw@cluster0.wtbiuzg.mongodb.net/?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
db.connect(err => {
    if (err) {
        console.log('MongoDB bağlantı hatası: ', err);
    } else {
        console.log('MongoDB bağlantısı başarılı');
        const collection = client.db("User").collection("users");
        // burada collection üzerinde yapılacak işlemler gerçekleştirilebilir
    }
});

module.exports = db;