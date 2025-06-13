// Using the User Model, userController will create User in database
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const generateToken = (user, res) => {    
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
    res.cookie('token', token, {
        httpOnly: true, //prevents javascript to access cookie
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protecion
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time in seconds
    })    
    res.json({success: true, user: { name: user.name, email: user.email }}) 
}
//Register User api/user/register
export const register = async (req, res) => {
   try{
     const { name, email, password } = req.body;
        if(!email || !password || !name) {
            return res.json({success: false, message: 'details are missing'})
        }        
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.json({success: false, message: 'User exists'})
        }
        //cant save the password directly, so we need to encrypt it
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword })
        generateToken(user, res) 
   }
   catch(error) {
    console.log(error)
    res.json({success: false, message: error.message})
   }
}

export const login = async(req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.json({success: false, message: 'User doesnt exist'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({success: false, message: 'Passwords dont match'})
    }
    generateToken(user, res);    
}
    catch(error){
        res.json({success: false, message: error.message})
    }

}