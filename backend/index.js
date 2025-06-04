import express from 'express'
import dotenv from 'dotenv'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'

// App config
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB Connection
connectDB();

// Api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Routes
app.get("/",(req, res) => {
    res.send("API working");
})


app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err);
});