import express from 'express';
const router = express.Router();
import verify from './verify_token';
import User from './../model/auth'

// authenticate user before showing private content
router.get('/', verify, async(req,res)=>{
    const user = await User.findOne({_id: req.user});
    return res.json({
        posts: {
            title: 'my profile',
            description: {
                "id": req.user,
                "name": user.name,
                "email": user.email
            }
        }
    });
})

export default router;