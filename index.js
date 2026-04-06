//mandatory and common process for any app
const express = require('express');   //express is web framework that will handle the ncoming requests.
const cors = require('cors');         //cors is used to allow communication with app on another origin. Ex: React server= port 3000, Node server = port 5000, Browser by default will block it
const pool = require('./db');         //pool manages the DB connection. we need it to connect our server with the DB

const app = express();                //this creates the express server which is the main server.
app.use(cors());                      //this tells our express server to allow cors enabling cross origin requests. Without it, the browser will block the requests.
app.use(express.json());              //this tells the server to parse the JSON request body. Without it the request body is undefined when UI sends JSON.

//Route Handling

//Type1: ***** Fetch ALL the mock endpoints ***** */
app.get(`/endpoints`, async(req,res) => 
{
    try{
        const result = await pool.query(`SELECT * FROM endpoints`);
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})


//Type2: ***** Fetch SPECIFIC mock endpoint for an id ***** */
app.get(`/endpoints/:id`, async(req, res) => 
{
    const id = req.params;
    try{
        const result = await pool.query(`SELECT * FROM endpoints where id= $1`,[id]);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})



//Type3: ***** Create a mock endpoint ***** */
app.post(`/endpoint`, async(req, res) => {
    const {url, method, status, data} = req.body;
    try{
        if(!url || !method)
            return res.status(500).json({error: "URL or method is inappopriate"});
        const result = await pool.query(`INSERT INTO endpoints (url, method, status, data)  VALUES ($1, $2, $3, $4)  RETURNING *`, [url, method, status, data]);
        return res.status(201).json(result.rows[0]);
    } 
    catch(err){
        return res.status(500).json({error: err.message});
    }
})



//Type4: ***** Update SPECIFIC mock endpoint for an id ***** */
app.put(`/endpoint/:id`, async(req, res) => {
    const {id} = req.params;
    const {url, method, status, data} = req.body;

    try{
        const result = await pool.query(`UPDATE endpoints SET url= $1, method= $2, status= $3, data= $4 WHERE ID= $5  RETURNING *`, [url, method, status, data, id]);
        res.status(200).json(result.rows[0]);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
})


//Type5: ***** Delete SPECIFIC mock endpoint for an id ***** */
app.delete(`/endpoint/:id`, async(req,res) => {
    const {id} = req.params;

    try{
        const result = await pool.query(`DELETE * FROM endpoints WHERE ID= $1`, [id]);
        res.status(200);
    }
    catch(err){
        returnres.status(500).json({error:err.message});
    }
})
 

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));