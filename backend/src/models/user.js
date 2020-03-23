const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    password:{
        type: String,
        required: true,
        validate(value){
            if(value.includes("password") || value.length<=6){
                throw new Error('Password is not secure')
            }
        }
    },
    username:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isAlphanumeric(value)){
                throw new Error('Username should be alpha numeric')
            }
        }
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },friends:[{
        _id:{
            type:mongoose.Schema.Types.ObjectId
        },
        username:{
            type:String
        }
    }],
    notifications:[{
        type:{
            type:String
        },
        conId:{
            type:mongoose.Schema.Types.ObjectId
        }
    }],
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    userDataId:{
        type: mongoose.Schema.Types.ObjectId
    }

})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'makethingsbetter')
    
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}
userSchema.methods.associateUserData = async function(userDataId){
    const user = this
    
    user.userDataId = userDataId
    await user.save()
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//Hash the plain text password
userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User