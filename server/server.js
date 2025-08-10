import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protected.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  // allow frontend access
  credentials: true,                // if you are using cookies or auth headers
}));

app.use('/api/products', productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


 

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));