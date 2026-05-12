// setup_table.js
const db = require('./src/db');   

const sql = `
CREATE TABLE IF NOT EXISTS daily_verses (
    id INTEGER PRIMARY KEY,
    verse_te TEXT,
    ref_te TEXT
);`;

db.serialize(() => {
    db.run(sql, (err) => {
        if (err) console.error("Error creating table:", err.message);
        else console.log("Table 'daily_verses' created successfully!");
    });
});