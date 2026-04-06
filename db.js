const {Pool} = require('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password:'Namrata@29',
    database:'mockapi',
    port:'1029',
})

module.exports = pool;