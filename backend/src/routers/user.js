const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const userData = require('../models/userData')
// const bcrypt = require('bcryptjs')


router.get('/',(req,res)=>{
    res.send('hello world')
})


router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(e){
        res.status(400).send(e)
    }
    
    
})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        
        await req.user.save()

        res.send({'message':'Success'})
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()

        res.send({'message':'Success'})
    }catch(e){
        res.status(500).send()
    }
})
//To get all user
// router.get('/users',auth,async (req,res)=>{

//     // User.find().then((users)=>{
//     //     res.send(users)
//     // }).catch(()=>{
//     //     res.status(500).send()
//     // })

//     try{
//         const users = await User.find()
//         res.send(users)
//     } catch(e){
//         res.status(500).send()
//     }
    
// })


router.post('/users/me',auth,async (req,res)=>{
    
    res.send(req.user)
})


router.post('/username',async(req,res)=>{
    try{
        const user = await User.find({username:req.body.username})
        res.send({_id:user[0]._id,username:user[0].username,email:user[0].email})
    }catch(e){
        res.status(404).send(e)
    }
})

router.patch('/users/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{

        const user = await User.findById(req.params.id)

        updates.forEach((update)=>{
            user[update] = req.body[update]
        })

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
        
        if(!user){
            return res.status(404).send('No user')
        }  
        res.send(user)
    } catch(e){
        res.status(500).send("something is not right")
    }
})

router.get('/users/:id',auth,async (req,res)=>{
    
    
    // User.findOne({
    //     _id: req.params.id
    // }).then((user)=>{
    //     if(!user){
    //         return res.status(404).send('User not found!')
    //     }
    //     res.send(user)
    // }).catch(()=>{
    //     res.status(400).send('Bad request')
    // })

    try{
        const user = await User.findOne({_id: req.params.id})
        if(!user){
            return res.status(404).send('User not found')
        }
        res.status(200).send(user)
    } catch(e){
        res.status(400).send('Bad request')
    }
})





router.delete('/users/:id',auth , async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send({error:"Not found"})
        }
        res.send(user)
    }catch(e){
        res.status(400).send({error:"something is not as expected"})
    }
})

router.post('/user/addfriend',async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.body._id})
        user.friends.push({
            _id:req.body.friendId,
            username:req.body.username
        })

        await user.save();
        res.send({
            _id:req.body.friendId,
            username:req.body.username
        })
    }catch(e){
        res.status(404).send(e)
    }
})
router.post('/user/getfriends',async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.body._id})
        res.send(user.friends)
    }catch(e){
        res.send()
    }
})

module.exports = router