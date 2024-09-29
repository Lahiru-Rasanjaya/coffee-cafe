const express = require("express");
const router = express.Router();
const db = require("../../database");

router.post('/updateItem', (req, res) => {
    const { id, price } = req.body;
 
    if (!id || !price) {
      return res.json({ success: false, error: 'ID and price must be provided' });
    }
  
    const sql = `UPDATE item SET itemPrice = ? WHERE id = ?`;
    
    db.query(sql, [price, id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.json({ success: false, error: err.message });
      }
  
      if (result.affectedRows > 0) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false, error: 'No item found with the given ID' });
      }
    });
  });

module.exports = router;
