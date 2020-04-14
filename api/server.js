const express = require("express");
const server = express();
const accountsRouter = require('../Accounts/accounts-Router')

//middleware
server.use(express.json());
server.use('/api/accounts', accountsRouter)

server.get('/', (req,res)=>{
    res.status(200).json({message: 'server up and running'})
})

module.exports = server;
