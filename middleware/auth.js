const jwt = require('jsonwebtoken')
const path = require('path')
const bcrypt=require('bcrypt')

//For Token Generation
async function generateToken(request) {
    const { email, password } = request.body;
    const hashPassword=await bcrypt.hash(password,10);
    const user={
        "email":email,
        "password":hashPassword
    }

    var privateKey = 'Arpita@100'; //private key
    var token = await jwt.sign(user, privateKey, { algorithm: 'HS256' });
    return token;
}

//For Authorization
const auth = async (request, response, next) => {

    var privateKey = 'Arpita@100';
    var token=request.headers.authorization
    console.log(token)
    try {
        const result=await jwt.verify(token,privateKey) 
        request.user=result;
        next() 
    } catch (error) {
        console.log("error1")
        response.status(401).json({message:"You are not authorized..."})
    }
    
}

module.exports = { generateToken,auth}

