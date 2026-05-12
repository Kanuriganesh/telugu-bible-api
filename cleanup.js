const db = require('./src/db');

db.run("DROP TABLE IF EXISTS bible", (err) => {
    if (err) console.error("Error deleting table:", err.message);
    else console.log("Table 'bible' deleted successfully. Database is now lean!");
});