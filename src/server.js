const express = require('express');  //imported express
const sqlite3 = require('sqlite3').verbose();  //imported sqlite 
const cors = require('cors');   //for fronted and backed connections
require('dotenv').config();   // secret files    
const verseRoutes = require('./routes/verseRoutes');

const app = express();
app.use(cors()); // Allows your website to talk to this API
app.use(express.json());  //for the coming data    

app.use('/api/verse', verseRoutes);

// Connect to SQLite
const db = new sqlite3.Database('./data/bible.db', (err) => {
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to Verse Database.");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Verse API running on port ${PORT}`));