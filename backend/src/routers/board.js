const express = require('express')
const Board = require('../models/board')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/board', auth, async (req, res) => {
    const board = new Board({
        owner: req.body.OwnerId,
        name: req.body.name
    })

    try {
        await board.save()
        res.status(201).send(board)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/boards', auth, async (req, res) => {
    
    try {
        const Boards = await Board.find({owner: req.body.OwnerId})
        res.send(Boards)
    } catch (e) {
        res.status(500).send()
    }
})





// router.get('/tasks/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const task = await Task.findOne({ _id, owner: req.user._id })

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/tasks/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

//         if (!task) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => task[update] = req.body[update])
//         await task.save()
//         res.send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!task) {
//             res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router