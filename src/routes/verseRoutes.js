const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/today', (req, res) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    
    // Calculates a number from 1 to 366
    const dayOfYear = Math.floor(diff / oneDay);

    // We fetch from the NEW table 'daily_verses'
    const sql = `SELECT * FROM daily_verses WHERE id = ?`;
    db.get(sql, [dayOfYear], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "No verse assigned for this day yet!" });

        res.json({
            id: row.id,
            verse_te: row.verse_te,
            reference_te: row.ref_te,
            day_of_year: dayOfYear
        });
    });
});
module.exports = router;