import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

async function placeOrder(req, res) {

    const {userId, items, amount, address} = req.body;

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const options = {
            amount: req.body.amount*100,
            currency: "INR",
            receipt: `receipt_order_${newOrder._id}`,
        }

        const razorpayOrder = await razorpayInstance.orders.create(options);

        res.json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: newOrder._id,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

async function verifyOrder(req, res) {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId,
    } = req.body;

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment verified and order updated" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Invalid payment signature" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Server error" });
    }
}

async function userOrders(req, res) {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

async function listOrders(req, res) {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

async function updateStatus(req, res) {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"}); 
    }
}


export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}