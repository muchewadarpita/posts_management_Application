const express = require('express')
const router = new express.Router();
const {auth} =require('../middleware/auth')
const {  createPost, deletePost, getUsersPosts } = require('../controllers/postController')

router.get('/', (request, response) => {
    response.send("<h1>Welcome Post Home page</h1>")
})

router.get('/posts/:userid',auth, getUsersPosts) //To get all post created by given userid
router.post('/posts/', auth,createPost)
router.delete("/deletepost/:_id", auth,deletePost)


module.exports = router;
