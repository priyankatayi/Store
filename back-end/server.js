import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebHooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000

await connectDB();
await connectCloudinary();

//Allow multiple origins
const allowedOrigin = ['http://localhost:5173']

//Preserves raw body so Stripe can verify signature - so use express.raw() for the webhook route only
app.post('/stripe',  express.raw({ type: 'application/json' }), stripeWebHooks);


//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigin, credentials: true}))

app.get('/', (req, res) => {
    res.send("API is working")
})

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})