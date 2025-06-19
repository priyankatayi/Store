import Product from "../models/Product.js";
import Order from "../models/Orders.js";

//api/order/cod 
export const placeOrderCOD = async (req, res) => {
    try{
        const { address, items } = req.body;
        const { userId } = req;
        if(!address || items.length <=0) {
            return res.json({success: false, message: 'Invalid Order'})
        }
        let amount = await items.reduce(async(acc, item) => {
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
            amount,
            status: 'placed'
        });
        res.json({ success: true, message: 'Order placed successfully' })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}


// api/order/user
export const getUserOrders = async (req, res) => {
    try{
        const { userId } = req;
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