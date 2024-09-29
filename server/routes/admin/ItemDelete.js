const express = require('express');
const router = express.Router();
const db = require('../../database');

router.post('/deleteItem', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: 'ID is required' });
    }

    const sql = `DELETE FROM item WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ success: false, error: 'Failed to delete item' });
        }

        if (result.affectedRows > 0) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false, error: 'No item found with the given ID' });
        }
    });
});

module.exports = router;