const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req,res)=>{
    res.status(200).json({message: 'server up and running'})
})

module.exports = server;
