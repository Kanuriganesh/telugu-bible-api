const sqlite3 = require('sqlite3').verbose();  //getting sqlite3 version  
const path = require('path');  

// The database file will live in the 'data' folder
const dbPath = path.resolve(__dirname, '../data/bible.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to SQLite Database.");
});

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    console.log("Your database tables are:", tables);
});
module.exports = db;