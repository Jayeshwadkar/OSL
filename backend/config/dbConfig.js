const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "63.250.52.212",
  user: "omsairam_admin",
  password: "Omsairam@2024#",
  database: "omsairam_db",
  connectionLimit: 10,
  multipleStatements: true
});



//// use following credentials only for production ///////

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "omsairam_admin",
//   password: "Omsairam@2024#",
//   database: "omsairam_db",
//   connectionLimit: 10,
//   multipleStatements: true
// });

////////////////////////////////////////////////



// const pool = mysql.createPool({
//   host: "50.73.235.61",
//   user: "osl",
//   password: "osl@4321",
//   database: "osl",
//   connectionLimit: 10,
//   multipleStatements: true
// });



async function connectToDatabase() {
  try {
    await pool.getConnection();
    console.log("Database connected successfully !!");
  } catch (error) {
    console.error("DB Error: ", error);
  }
}

connectToDatabase();

module.exports = pool;

