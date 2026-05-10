const express = require("express"); 
const router = express.Router()  
const db = require("../db");   // Your Telugu book names       
const Books = require("../books")

router.get('/today', (req, res) => {   
    // 1. Calculate a consistent index based on the date
    // This ensures every user sees the same verse on the same day
    const launchDate = new Date("2026-01-01"); // Your project launch date
    const today = new Date();
    // Difference in days
    const diffInMs = Math.abs(today - launchDate);
    const dayIndex = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    // 2. Wrap the index around the total count (31102)
    // Adding 1 because SQLite IDs usually start at 1
    const targetId = (dayIndex % 31102) + 1;
    // 3. Fetch from the 'verses' table (verify your table name in holybible.db)
    const sql = `SELECT * FROM bible WHERE rowid = ?`;   
    db.get(sql, [targetId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database error" });
        }
        if (!row) {
            return res.status(404).json({ message: "Verse not found" });
        }
        // 4. Map the 'Book' number to your Telugu Books array
        // If your DB uses 1-based indexing for books, use Books[row.Book - 1]
        const teluguBookName = Books[row.Book] || "Grandham";   
        res.json({
            id: row.id,
            verse_te: row.verse,
            reference_te: `${teluguBookName} ${row.Chapter}:${row.Versecount}`,
            date: today.toISOString().split('T')[0]
        });   
    });
});
module.exports = router;