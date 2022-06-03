const mongoose = require('mongoose');

async function dbconnection(){
    await mongoose.connect(process.env.DB_URL,(err)=>{
        if(err){
            console.log('not connected to database')
        }else{
            console.log('connected to database')
        }
    });
}

module.exports = {
    dbconnection
}