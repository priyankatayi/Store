import Product from "../models/Product.js";


//api/order/cod 
export const placeOrderCOD = async (req, res) => {
    try{
        const { userId, address, items } = req.body;

        if(!address || items.length <=0) {
            return res.json({success: false, message: 'Invalid Order'})
        }
        const amount = items.reduce(async(item, acc) => {
            let product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;        
        }, 0);
        
        //adding tax
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            paymentType: 'COD',
            address,
            items,
            amount
        });
        res.json({ success: true, message: 'Order placed successfully' })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}


// api/order/user
export const getUserOrders = async (req, res) => {
    try{
        const { userId } = req.body;
        const orders = await Order.find({ 
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}


// api/order/all - fetch all orders for seller
export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("userId items.product address").sort({createdAt: -1});
        res.json({ success: true, orders })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}