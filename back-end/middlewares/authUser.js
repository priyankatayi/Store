import jwt from 'jsonwebtoken';

const authUser = async( req, res, next) => {
    const token = req.cookies.token;
    console.log(token, 'user_cookie')
    if(!token) {
        return res.json({success: false, message: 'Unauthroized User'});
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        if (userId) {
            req.userId = userId;
            next();
        } else {
            return res.json({success: false, message: 'Unauthroized User'});
        }
        
    } catch(error) {
        return res.json({ success: false, message: error.message })
    }
}

export default authUser;