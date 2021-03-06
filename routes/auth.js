import express from 'express';
import User from '../model/auth';
import {registerValidation, loginValidation} from '../validation/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async(req, res)=>{

    // user validation
    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // if user exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists){
        return res.status(400).json({error: "email already exists"});
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    // create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        return res.status(201).json({success: "new user added successfully"});
    } catch (error) {
        return res.status(400).json({error: "fail to add user"});
    }
    
});

router.post('/login', async(req,res)=>{
    
    // user validation
    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user){
        return res.status(400).json({error: "email doesn't exists"});
    }

    // create and assign token to user wheh login
    const token = jwt.sign(
        {_id: user._id}, // payload
        process.env.TOKEN_KEY, // secret
        {expiresIn: "10s"} // expires in
    );
    // send token to client by storing it in cookie
    res.cookie('auth-token', token).send(`log-in successfully`);

});

export default router;