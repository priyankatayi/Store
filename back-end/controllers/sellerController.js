import jwt from 'jsonwebtoken';

// api/seller/login

export const sellerLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(password !== process.env.SELLER_PASSWORD) {
            return res.json({success: false, message: 'User Unauthorized'})
        }
  
        const sellerToken = jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        res.cookie('seller_cookie', sellerToken, {
            httpOnly: true, //prevents javascript to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protecion
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time in seconds
        })

        return res.json({ success: true, message: 'LoggedIn' })
    }  catch(error) {
        res.json({ success: false, message: error.message })
    }
}


export const isSellerAuth = async(req, res) => {
    try {
        res.json({ success: 'true' });
    } catch(error) {
        res.json({ success: false, message: error.message });
    }
}

export const sellerLogout = async (req, res) => {
    try{
    res.clearCookie('seller_cookie', {
        httpOnly: true, //prevents javascript to access cookie
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protecion
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time in seconds
    });
    res.json({ success: 'true', message: 'Logout successful' })
}
    catch(error) {
        res.json({ success: false, message: error.message })
    }
}