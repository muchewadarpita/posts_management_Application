const express = require('express')
const cors=require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const users = require('./routes/users')
const posts = require('./routes/posts')
const app = express()

app.use(cors());
app.use(express.json())

//Define Routers
app.use('/api', users); 
app.use('/api',posts)

//Connection to Database
mongoose.connect('mongodb://127.0.0.1:27017/post_management_database')
    .then(() => {
        app.listen(process.env.local_port, () => {
            console.log(`Server Running at localhost:${process.env.local_port}`)
        })
    }).catch((error) => {
        console.log(error)
    }) 