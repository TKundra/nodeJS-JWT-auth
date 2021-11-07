import jwt from 'jsonwebtoken';

// verify token - valid or not
const verify = (req, res, next) => {
    // if auth-token not defined as req - access denied to get posts page
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).send('access denied');
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next(); // after verifying call next
    } catch(error) {
        return res.status(400).send('invalid token');
    }
}

export default verify;