const { Pool } = require("pg");

module.exports = new Pool({
    user: 'postgres',
    password: '403251',
    host: 'localhost',
    port: '5432',
    database: 'foodfy'
})