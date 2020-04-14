const express = require('express');
const router = express.Router();
const db = require("../data/dbConfig");

router.get('/', (req,res)=> {
    db('accounts')
    .then(accounts => res.status(200).json(accounts))
    .catch(err => res.status(500).json({message: 'can not access database'}))
})

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    db('accounts')
    .where({ id: id })
    .first()
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json({message: err}))
})

router.post('/' ,(req,res)=> {
    const body = req.body;
    db('accounts')
    .insert(body)
    .then(account => {
        db('accounts')
        .where({id : account[0]})
        .then(accountObj => res.status(201).json(accountObj))
        .catch(err => res.status(500).json({message: err}))
    })
    .catch(err => res.status(500).json({message: err}))
})

router.put('/:id' , (req,res)=>{
    const { id } = req.params;
    const body = req.body;
    db('accounts')
    .where({id : id})
    .update(body)
    .then(account => 
        account > 0 ? 
        db('accounts')
        .where({id : id})
        .then(accountObj=> res.status(200).json(accountObj))
        .catch(err => res.status(404).json({message: err})) 
        : 
        res.status(500).json({message: 'can not access database'}))
    .catch(err => res.status(500).json({message: err}))
})

router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    db('accounts')
    .where({ id: id })
    .del()
    .then(numberDeleted => 
        numberDeleted > 0 ? 
        res.status(200).json({message: `The account with the id of ${id} was successfully deleted`})
        :
        res.status(500).json({message: `can't delete the account with the id of ${id} because it does not exist`}))
    .catch(err => res.status(500).json({message: err}))
})

module.exports = router;