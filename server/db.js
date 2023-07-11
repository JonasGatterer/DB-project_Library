const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    password: process.env,
    host: "localhost",
    port: 5432,
    database: "library_project"
});

module.exports = pool;