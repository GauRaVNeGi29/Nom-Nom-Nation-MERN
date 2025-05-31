import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

// Login user
async function loginUser(req, res) {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false, message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.json({success:false, message:"Invalid credentials"});
        }
        const token = createToken(user._id);
        res.json({ success: true, token, message: 'User Logged in successfully' });
    } catch (error) {
        res.json({success:false, message:"Server error"});
    }
}

async function registerUser(req, res) {
    const {name, email, password} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"});
        }
        if(password.length<8){
            res.json({success:false, message:"Please enter a strong password"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error' });
    }
}

export {loginUser, registerUser}