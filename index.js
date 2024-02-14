// loads .env file into process.env

require('dotenv').config()
//import express

const express= require('express')
// import cors
const cors = require('cors')

const db=require('./DB/connection')

const router = require('./Router/route')
 
const appMiddleware = require('./Middlewares/appMiddleware')

const jwtMiddleware= require('./Middlewares/jwtMiddleware')
//create a backend application using express

const pfServer=express()

//use

pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


//port creation

const port = 4000 || process.env.port

//server listen
pfServer.listen(port,()=>{
    console.log('listening on the port '+port);
})

//http -get resolving to http://localhost :400
 pfServer.get("/",(req,res)=>{
    res.send('Project fair is started')
 })