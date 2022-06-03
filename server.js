const express = require('express');
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')

require('dotenv').config();
const cors = require('cors');
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const {dbconnection} = require('./db')
dbconnection()

const userrouter = require('./routes/user')
app.use('/',userrouter)
// const expenserouter = require('./routes/expenses')

const PORT = process.env.PORT || 3006
app.listen(PORT,()=>{
    console.log(`userexpenses server is running ${PORT}`)
})