const express = require("express");
const routes = express.Router();
const db = require("../database");

routes.get('/salesData', (req, res) => {
    const { itemName = '', month = '', year = '', day = '' } = req.query;
  
    let sql = `SELECT b.bill_id, b.created_at, 
                      CAST(bi.item_quantity AS UNSIGNED) AS item_quantity, 
                      CAST(bi.item_price AS DECIMAL(10, 2)) AS item_price, 
                      (bi.item_quantity * bi.item_price) AS total_sales, 
                      i.itemName
               FROM bills b
               JOIN bill_items bi ON b.bill_id = bi.bill_id
               JOIN item i ON bi.item_name = i.itemName
               WHERE i.itemName LIKE ?`;
  
    const params = [`%${itemName}%`];
  
    if (month) {
      sql += ` AND MONTH(b.created_at) = ?`;
      params.push(month);
    }
  
    if (year) {
      sql += ` AND YEAR(b.created_at) = ?`;
      params.push(year);
    }
  
    if (day) {
      sql += ` AND DAY(b.created_at) = ?`;
      params.push(day);
    }
  
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
    });
  });
  
  
module.exports = routes;
