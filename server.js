const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Firebase Admin
// const serviceAccount = require("./firebaseKey.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uks-monitoring-default-rtdb.firebaseio.com/", // Ganti dengan database Firebase kamu
});

const db = admin.database();

// Endpoint untuk mengambil data sensor
app.get("/sensor", async (req, res) => {
  try {
    const snapshot = await db.ref("sensor").once("value");
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data sensor" });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
