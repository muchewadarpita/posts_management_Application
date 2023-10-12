const postModel = require('../models/post_model')
const userModel = require('../models/user_model')


//Create new Post
const createPost = async (request, response) => {
    const {  content } = request.body;
    const existingUser = await userModel.findOne({ email: request.user.email })
    if (!existingUser) {
        response.status(403).json({ message: "You are not Authorized User" })
    }else {
            const result = await postModel.create({
                userid: existingUser._id,
                content: content,
            })
            response.status(201).json({
                message: `Successfully created post.`,
                "Response": result
            })
           
    }
 }

//Delete post by postId(_id)
const deletePost = async (request, response) => {
    const id = request.params._id; // Use the route parameter name '_id'
    try {
        // Use the Mongoose '_id' type for matching
        const result = await postModel.findOneAndDelete({ _id: id });

        if (!result) {
            response.status(404).json({ message: "Post Not Present in Database...." });
        } else {
            response.status(200).json({
                message: "Following Post Deleted Successfully",
                Post: result
            });
        }
    } catch (error) {
        response.status(400).json({ message: "Something Went Wrong ...." });
    }
}

//Update Post
const getUsersPosts = async (request, response) => {
    try {
        const user_id = request.params.userid;
        console.log("userID:---", user_id);
        
        const result = await postModel.find({ userid : user_id });
        
        if (result.length <= 0) {
            response.status(404).json({ message: "No Posts Found..." });
        } else {
            response.status(200).json({
                message: `All the posts from the user`,
                Posts: result
            });
        }
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

module.exports = {
    createPost, deletePost, getUsersPosts} 