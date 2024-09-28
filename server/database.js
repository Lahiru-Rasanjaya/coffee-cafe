const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cofeecafe",
});

// Connect to the database
db.connect((error) => {
  if (error) {
    console.error("DB Connection Failed: ", error);
    return;
  }
  console.log("Database connection successful");
});

module.exports = db;