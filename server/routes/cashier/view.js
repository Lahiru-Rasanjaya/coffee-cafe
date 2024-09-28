const express = require('express');
const routes = express.Router();
const db = require('../../database');

routes.get('/items', (req, res) => {
    const sql = "SELECT * FROM item ORDER BY id DESC";
    
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error occurred during query execution:', error);
            return res.status(500).json({ message: 'Database error occurred' });
        }

        const items = results.map(row => {
            if (row.itemImage) {
                row.itemImage = `data:image/jpeg;base64,${row.itemImage.toString('base64')}`;
            }
            return row;
        });

        return res.json(items);
    });
});

module.exports = routes;