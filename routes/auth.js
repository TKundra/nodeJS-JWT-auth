import express from 'express';
import User from '../model/auth';
import {registerValidation, loginValidation} from '../validation/auth';
import bcrypt from 'bcryptjs';
import {encrypt, decrypt} from '../en-de/en-de';
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
    const encryptedPassword = encrypt(req.body.password);
  
    // create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: `${encryptedPassword.iv}${encryptedPassword.content}`,
        date: req.body.date
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

    // password validation
    let decryptedPassword = decrypt(user.password).toString();
    const validatePassword = (decryptedPassword == req.body.password);
    if (!validatePassword) {
        return res.status(400).json({error: "wrong password"});
    }

    // create and assign token to user wheh login
    const token = jwt.sign(
        {_id: user._id},
        process.env.TOKEN_KEY,
        //{expiresIn: "2h"}
    );
    // send token
    res.header('auth-token', token).send(token);

    console.log(validatePassword);

});

export default router;