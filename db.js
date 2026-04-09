// const {Pool} = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     user:'postgres',
//     host:'localhost',
//     database:'mockapi',
//     port:'1029',
// })

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;