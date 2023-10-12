const userModel = require('../models/user_model')
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');
const saltRounds = 10;

//Add new User
const signup = async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return response.status(200).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashPassword
        });

        response.status(200).json({ message: 'Successful user sign-up.', data: newUser });
    } catch (error) {
        response.status(400).json({ message: 'Something went wrong !!!' });
    }
};

//Login 
const login = async (request, response) => {
    const { email, password } = request.body;

    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        return response.status(403).json({ message: 'User Not exists' });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
        return response.status(403).json({ message: 'Invalid Credentials' });
    }
    //Generate Token
    let token= await generateToken(request);
    // console.log(token)
    response.status(200).json({ message: "authorized",token:token })
}

module.exports = {
    signup, login
}
