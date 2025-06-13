import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000

await connectDB();

//Allow multiple origins
const allowedOrigin = ['http://localhost:5173/']

//Middleware configuration

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigin, credentials: true}))

app.get('/', (req, res) => {
    res.send("API is working")
})

app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})