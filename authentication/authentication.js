const jwt = require('jsonwebtoken');
async function verify(req,res,next){
    const token = req.headers["authorization"]
    console.log(token)
    if(!token){
        return res.json({
            message : "Token not present"
        })
    }

    await jwt.verify(token,process.env.SECRET,(err, decodedData)=>{
        if(err){
            return res.json({
                message:"Invalid Token"
            })
        }
        req.user = payload.user
        next()
    })
};
module.exports = {
    verify
}