const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../../database");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
    const { name, price } = req.body;
    const image = req.file;
  
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, error: "Required fields are missing" });
    }
  
    const imageContent = image.buffer;
  
    const sql =
      "INSERT INTO item (itemName, itemPrice, itemImage) VALUES (?, ?, ?)";
    db.query(sql, [name, price, imageContent], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true });
    });
  });
  
module.exports = router;
