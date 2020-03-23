const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const userData = require('../models/userData')

router.post("/userdata",auth,async (req,res)=>{
    const userdata = await userData.findOne({owner: req.body.OwnerId})
    res.send(userdata)
})

router.post("/userdata/years",auth,async (req,res)=>{
    const userdata = await userData.findOne({owner: req.body.OwnerId})
    userdata.year.push({
        number:0,
        year:"2021"
    })
    await userdata.save()
    res.send(userdata)
})
module.exports = router
