const express = require('express')
const Card = require('../models/card')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/card',async(req,res)=>{
    const card = new Card({
        owner: req.body.OwnerId,
        description: req.body.description,
        lists:[req.body.listId],
        dueDate:req.body.duedate
    })
    try{
        await card.save()
        res.status(201).send(card)
    }catch(e){
        res.send(400).send(e)
    }
})

router.post('/cards',async (req,res)=>{
    try{
        const lists = await Card.find({owner: req.body.OwnerId})
        res.send(lists)
    }catch(e){
        res.status(500).send()
    }
})

router.post('/cardsonlist',async (req,res)=>{
    try{
        const cards = await Card.find({lists:req.body.listId})
        res.send(cards)
    }catch(e){
        res.send(e)
    }
})

router.delete('/card',async(req,res)=>{
    try{
        const card = await Card.findByIdAndDelete(req.body.cardId)
        res.send(card)
    }catch(e){
        res.send(e)
    }
})

module.exports = router