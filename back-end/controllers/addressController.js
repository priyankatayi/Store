import Address from "../models/Address.js";


//api/address/add
export const addAddress = async (req, res) => {
    try{
        const { address } = req.body;
        const { userId } = req;
        await Address.create({userId, ...address});
        res.json({ success: true, message: 'Address Updated' })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

//api/address/get
export const getAddress = async (req, res) => {
    try{
        const { userId } = req.body;
        const address = await Address.find({ userId });
        res.json({ success: true, address })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}