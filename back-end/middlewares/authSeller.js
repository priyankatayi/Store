import jwt from 'jsonwebtoken';

const authSeller = async(req, res, next) => {
    try {
        const { seller_cookie } = req.cookies;
        console.log(seller_cookie, 'seller_cookie', req.cookies)
        const decoded = await jwt.verify(seller_cookie, process.env.JWT_SECRET);
        const email = decoded.email;
        if(email !== process.env.SELLER_EMAIL) {
            return res.json({ success: false, message: 'Not authorized' }); 
        }
        next();
    }
    catch(error) {
        return res.json({ success: false, message: error.message });
    }

}

export default authSeller;