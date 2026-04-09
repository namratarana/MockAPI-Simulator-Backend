const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password: PROCESS.env.PASSWORD,
    database:'mockapi',
    port:PROCESS.env.PORT,
})

module.exports = pool;