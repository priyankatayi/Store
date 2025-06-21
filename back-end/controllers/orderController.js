import Product from "../models/Product.js";
import Order from "../models/Orders.js";
import User from "../models/User.js";
import Stripe from 'stripe';


//Stripe webhooks to verify payments
export const stripeWebHooks = async (req, res) => {
    //create stripe instance
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const signature = req.headers['stripe-signature'];
    let event;

    try {    
        event = stripeInstance.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOKS_SECRET);
    } catch(error) {
        console.log(`Webhook Error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    //event.data.object contains the full session object data
    const session = event.data.object;
    
    console.log("session", session);
    const {metadata} = session;
    const { userId, orderId} = metadata;
    switch(event.type) {
        case 'payment_intent.succeeded': {            
            await Order.findByIdAndUpdate(orderId, {isPaid: true});
            await User.findByIdAndUpdate(userId, {cartItems: {}});
            break;
        }
        case 'payment_intent.payment_failed': {
            await Order.findByIdAndDelete(orderId);
            break;
        }
        default: {
            console.error(`Unhandled event: ${event.type}`);
            break;
        }
    }
    res.json({received: true})
}

//api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try{
        const { address, items } = req.body;
        const { userId } = req;
        const { origin } = req.headers;

        if(!address || items.length <=0) {
            return res.json({success: false, message: 'Invalid Order'})
        }
        let productData = [];
        let amount = await items.reduce(async(acc, item) => {
            let product = await Product.findById(item.product);
            let data =  {
                price_data: {
                  currency: 'usd',
                  product_data: { name: product.name },
                  unit_amount: Math.floor(product.offerPrice + product.offerPrice * 0.02) * 100,
                },
                quantity: item.quantity,
              }
            productData.push(data);
            return (await acc) + product.offerPrice * item.quantity;        
        }, 0);
        
        //adding tax
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            paymentType: 'Online',
            address,
            items,
            amount,
            status: 'Order Placed'
        });

        //create stripe instance
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        // create stripe session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: productData,
            payment_intent_data: {
                metadata: {
                    orderId: order._id.toString(),
                    userId,
                },
            },
            success_url: `${origin}/my-orders`,
            cancel_url:  `${origin}/cart`,
          });
          console.log(session, "session in checkout")
        res.json({ success: true, url: session.url })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}


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