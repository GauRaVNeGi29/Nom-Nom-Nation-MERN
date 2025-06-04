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
const allowedOrigins = [
  "https://nom-nom-nation.onrender.com",        
  "https://admin-panel-nom-nom-nation.onrender.com", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

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