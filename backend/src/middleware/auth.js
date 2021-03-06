const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next)=>{
    try{
        // console.log(req.body.Authorization)
        const token = req.body.Authorization
        const decoded = jwt.verify(token,'makethingsbetter')
        // console.log(decoded)
        // console.log(token)
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        // console.log(user)
        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error:'Please authenticate.'})
    }
}

module.exports = auth