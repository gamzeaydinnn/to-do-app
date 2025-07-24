const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Swagger ayarları
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Simple Todo CRUD API with Swagger UI",
    },
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo yönetim API'si
 */

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "todo-db";
let todosCollection;

async function main() {
  await client.connect();
  console.log("MongoDB'ye bağlanıldı");

  const db = client.db(dbName);
  todosCollection = db.collection("todos");

  app.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
    console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
  });
}

main().catch(console.error);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Yeni bir todo oluştur
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text1
 *               - text2
 *               - status
 *             properties:
 *               text1:
 *                 type: string
 *                 example: Ders çalış
 *               text2:
 *                 type: string
 *                 example: JavaScript öğren
 *               status:
 *                 type: string
 *                 enum: [Backlog, In progress, Done]
 *                 example: Backlog
 *     responses:
 *       201:
 *         description: Todo başarıyla oluşturuldu
 */
app.post("/todos", async (req, res) => {
  const { text1, text2, status } = req.body;
  const result = await todosCollection.insertOne({ text1, text2, status });
  res.status(201).json({ id: result.insertedId });
});

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Tüm todo'ları getir
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Tüm todo listesi başarıyla alındı
 */
app.get("/todos", async (req, res) => {
  const todos = await todosCollection.find().toArray();
  res.json(todos);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: ID ile bir todo getir
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo'nun ID'si
 *     responses:
 *       200:
 *         description: Todo bulundu
 *       404:
 *         description: Todo bulunamadı
 */
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todosCollection.findOne({ _id: new ObjectId(id) });
    if (!todo) return res.status(404).json({ message: "Todo bulunamadı" });
    res.json(todo);
  } catch {
    res.status(400).json({ message: "Geçersiz ID" });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Mevcut bir todo'yu güncelle
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Güncellenecek todo'nun ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text1:
 *                 type: string
 *               text2:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Backlog, In progress, Done]
 *     responses:
 *       200:
 *         description: Todo başarıyla güncellendi
 *       404:
 *         description: Todo bulunamadı
 */
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { text1, text2, status } = req.body;
  try {
    const result = await todosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { text1, text2, status } }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Todo bulunamadı" });
    res.json({ message: "Todo güncellendi" });
  } catch {
    res.status(400).json({ message: "Geçersiz ID" });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Belirli bir todo'yu sil
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek todo'nun ID'si
 *     responses:
 *       200:
 *         description: Todo silindi
 *       404:
 *         description: Todo bulunamadı
 */
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Todo bulunamadı" });
    res.json({ message: "Todo silindi" });
  } catch {
    res.status(400).json({ message: "Geçersiz ID" });
  }
});
module.exports = app;
if (require.main === module) {
  // Yani doğrudan çalıştırılıyorsa (node index.js)
  main().catch(console.error);
}
