const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { email, password } = req.body; 

  const sql = "SELECT * FROM adminlogin WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error("Error occurred during query execution:", error);
      return res
        .status(500)
        .json({ success: false, message: "Database error occurred" });
    }

    if (results.length > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

module.exports = router;
