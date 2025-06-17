import Address from "../models/Address.js";


//api/address/add
export const addAddress = async (res, req) => {
    try{
        const { address, userId } = req.body;
        await Address.create({userId, ...address});
        res.json({ success: true, message: 'Address Updated' })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

//api/address/get
export const getAddress = async (res, req) => {
    try{
        const { userId } = req.body;
        const address = await Address.find({ userId });
        res.json({ success: true, address })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}