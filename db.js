const { MongoClient } = require("mongodb");
// MongoDB URL
const url = "mongodb://localhost:27017";
// Veritabanı adı
const dbName = "todo-db";
let db;
let client;

async function connect() {
  if (client) {
    return;
  }
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
    console.log("MongoDB bağlantısı başarılı!");
  } catch (err) {
    console.error("MongoDB bağlantı hatası: ", err);
    // Hata oluşursa bir exception fırlat
    throw err;
  }
}

function getDb() {
  if (!db) {
    throw new Error("Veritabanı bağlantısı sağlanmamış!");
  }
  return db;
}

function closeConnection() {
  if (client) {
    // MongoDB bağlantısını kapat
    return client.close();
  }
  // Eğer client zaten tanımlanmamışsa, boş bir çözüm döndür
  return Promise.resolve();
}

module.exports = { connect, getDb, closeConnection };
