import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Razorpay from 'razorpay'

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// });

async function placeOrder(req, res) {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "INR",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100*85
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "INR",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*85
            },
            quantity: 1
        })

        const session = await Stripe.checkout

    } catch (error) {
        
    }
}

export {placeOrder}