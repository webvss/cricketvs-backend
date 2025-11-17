const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_PASS = process.env.ADMIN_PASS || "admin1234";
const JWT_SECRET = process.env.JWT_SECRET || "MYSECRET123";

app.post("/api/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASS) {
    const token = jwt.sign(
      { role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ success: true, token });
  }

  res.json({ success: false, message: "Invalid password" });
});

app.listen(10000, () => console.log("Backend running on port 10000"));
