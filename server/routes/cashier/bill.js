const express = require('express');
const router = express.Router();
const db = require('../../database');

router.post('/bills', (req, res) => {
    const { items, totalAmount, date, time } = req.body;

    const billQuery = "INSERT INTO bills (total_amount, bill_date, bill_time) VALUES (?, ?, ?)";
    db.query(billQuery, [totalAmount, date, time], (error, results) => {
        if (error) {
            console.error("Error occurred during bill insertion:", error);
            return res.status(500).json({ status: "error", message: error.message });
        }

        const billId = results.insertId; 

        const itemQuery = "INSERT INTO bill_items (bill_id, item_name, item_price, item_quantity) VALUES (?, ?, ?, ?)";
        const itemPromises = items.map(item => {
            return new Promise((resolve, reject) => {
                db.query(itemQuery, [billId, item.name, item.price, item.quantity], (error) => {
                    if (error) {
                        console.error("Error occurred during item insertion:", error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        });

        Promise.all(itemPromises)
            .then(() => {
                res.json({ status: "success", bill_id: billId });
            })
            .catch((error) => {
                res.status(500).json({ status: "error", message: error.message });
            });
    });
});

module.exports = router;