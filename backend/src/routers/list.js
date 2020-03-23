const express = require('express')
const List = require('../models/list')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/list', async (req, res) => {
    const list = new List({
        owner: req.body.OwnerId,
        name: req.body.name,
        boards:[req.body.boardId]
    })

    try {
        await list.save()
        res.status(201).send(list)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/lists', async (req, res) => {
    
    try {
        const lists = await Board.find({owner: req.body.OwnerId})
        res.send(lists)
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/listsonboard',async (req, res) => {
    
    try {
        const lists = await List.find({boards: req.body.boardId})
        // const lists = await List.find( { _id: req.body._id } )
        res.send(lists)
    } catch (e) {
        res.send(e)
    }
})



module.exports = router