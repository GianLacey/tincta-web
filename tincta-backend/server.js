const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Para leer JSON en las requests
app.use(cors()); // Para permitir peticiones del frontend

// Conexión a MongoDB
const uri = "mongodb+srv://tincta:tincta@tinctacluster.3eknm.mongodb.net/?retryWrites=true&w=majority&appName=TinctaCluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
  }
}
conectarDB();

// Ruta de prueba para verificar si el backend funciona
app.get("/", (req, res) => {
  res.json("🚀 Backend funcionando correctamente");
});

// Ruta para obtener datos desde MongoDB
app.get("/api/data", async (req, res) => {
  try {
    const db = client.db("TinctaDB"); // Nombre de la base de datos
    const collection = db.collection("artworks"); // Nombre de la colección
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

