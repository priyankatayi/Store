import jwt from 'jsonwebtoken';

const authUser = ( req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({success: false, message: 'Unauthroized User'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        if (userId) {
            req.body.userId = userId
        } else {
            return res.json({success: false, message: 'Unauthroized User'});
        }
        next();
    } catch(error) {
        return res.json({ success: false, message: error.message })
    }
}

export default authUser;