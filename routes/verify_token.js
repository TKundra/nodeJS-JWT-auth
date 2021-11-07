import jwt from 'jsonwebtoken';

// verify token - valid or not
const verify = (req, res, next) => {
    // if auth-token not defined as req - access denied to get posts page
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).json({error: "access denied"});
    }
    try {
        // authenticate the user by verifying token
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next(); // after verifying call next to continue next function execution
    } catch(error) {
        return res.status(400).json({error: `invalid token ${error}`});
    }
}

export default verify;