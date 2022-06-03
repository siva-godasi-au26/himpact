const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userid:{
        type:Number,
        default:'',
        required:true,
        unique:true
    },
    username :{
        type:String,
        default:'',
        required:true
    },
    password:{
        type:String,
        default:'',
        required:true,
    },
    contactnumber:{
        type:Number,
        default:null,
        maxlength:10,
        minlength:10
    },
   createdatetime:{
       type:Date,
       default:Date.now
   }
})

//encrypt the user password by using mongoose middleware
userSchema.pre('save',function(next){
    user = this
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(14, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
})
const userModel = mongoose.model('users',userSchema)
module.exports = userModel