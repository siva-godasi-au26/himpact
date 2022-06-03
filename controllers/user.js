const userModel = require('../models/user')
console.log(userModel)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// insert userdata into mongodb
const usersignup = (async(req,res)=>{
    try{
        const userdata = req.body
        console.log(userdata)
        const adduserdata = await userModel.create(userdata)
        res.send(adduserdata)
    }catch(err){
        console.log(err)
        res.send('email and phonenumber already present')
    }
})

//while user login compare with user enter userid and password with db and ctreate jwt token
const userlogin = async(req,res)=>{
    try{
    const{userid,password}=req.body
    console.log(userid)
    console.log(password)
    const user = await userModel.findOne({userid:userid})

    //compare userpassword with db password if it is true it will return true else return falase
    const passwordmatch = await bcrypt.compare(password,user.password)
    if(user.userid=== userid && passwordmatch===true){
        const payload = {userid}
        const token = jwt.sign(payload,process.env.SECRET,{expiresIn:'2h'})
        return res.json({
            accessToken:token,
            message:'successfully login'
        })
    }else{
        res.json({
            message: 'Invalid Userid/Password'
        })
    }
    }catch(err){
        res.send(err)
    }
  
}

//get all the user details
const getusers = async(req,res)=>{
    try{
        const getusers = await userModel.find()
        res.send(getusers)
    }catch(err){
        console.log(err)
    }
}

//delete multiple users in one request
const deletemany = async(req,res)=>{
    const data = req.parms
    try{
       deletemanyitems = await userModel.deleteMany({username:data})
       res.send(deletemanyitems)
    }catch(err){
        console.log(err)
    }
}
module.exports = {
    usersignup,
    userlogin,
    getusers,
    deletemany
}