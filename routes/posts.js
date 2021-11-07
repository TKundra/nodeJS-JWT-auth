import express from 'express';
const router = express.Router();
import verify from './verify_token';

// if user add auth-token during get method calling, only then they will be able to get data otherwise not
router.get('/', verify, (req,res)=>{
    return res.json({
        posts: {
            title: 'my first post',
            description: 'gjuf dfhj bj '
        }
    });
})

export default router;