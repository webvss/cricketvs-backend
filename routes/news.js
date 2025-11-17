
// routes/news.js
const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verifyToken = require("../middleware/auth");

// Add news (protected)
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const docRef = await db.collection("news").add({
      title,
      content,
      image,
      date: Date.now(),
      createdBy: req.user?.role || "admin"
    });
    res.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Add news err", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// list news (protected)
router.get("/list", verifyToken, async (req, res) => {
  try {
    const snap = await db.collection("news").orderBy("date", "desc").get();
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(data);
  } catch (err) {
    console.error("List news err", err);
    res.status(500).json({ error: err.message });
  }
});

// get single
router.get("/get/:id", verifyToken, async (req, res) => {
  try {
    const d = await db.collection("news").doc(req.params.id).get();
    if (!d.exists) return res.status(404).json({ error: "Not found" });
    res.json({ id: d.id, ...d.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await db.collection("news").doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
