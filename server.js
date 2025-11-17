// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/news");
// const iplNewsRoutes = require("./routes/iplnews"); // if created

const app = express();
app.use(cors());
app.use(express.json());

// Basic health
app.get("/", (req, res) => res.send("CricketVS backend running"));

// Auth endpoints you already have (if not, add a login route that signs JWT)
// Example minimal login route (only for admin password):
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "MYSECRET123";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin1234";

app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASS) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: "Invalid password" });
});

// mount routes
app.use("/api/news", newsRoutes);
// app.use("/api/iplnews", iplNewsRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
