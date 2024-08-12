const express=require('express')
const cors=require('cors')
const configureDB=require('./configureDB/db')
const userRouter = require('./routes/userRoutes')
const dotenv=require('dotenv')
const taskRouter = require('./routes/taskRoutes')
require('dotenv').config();
const app=express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cors())
dotenv.config()
configureDB()
app.use('/user',userRouter)
app.use('/task',taskRouter)

app.listen(PORT,()=>{
    console.log('server running on port',PORT)
})