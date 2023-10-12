const mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const postSchema =mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
    
},{timestamps:true});

mongoose.set('strictQuery', false);
module.exports=mongoose.model('posts',postSchema);