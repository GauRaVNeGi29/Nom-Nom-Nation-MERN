import React, {useState, useContext} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url,frontendUrl} = useContext(StoreContext);

  const [agreed, setAgreed] = useState(false);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })

  const placeOrder = async (e) => {
    e.preventDefault();

    // if (!agreed) {
    //   Toastify({
    //     text: "You must agree to the terms and policies before proceeding.",
    //     duration: 3000,
    //     gravity: "top", // or "bottom"
    //     position: "right", // or "left" or "center"
    //     backgroundColor: "#ff4d4f",
    //     close: true
    //   }).showToast();
    //   return;
    // }

    // if (!agreed) {
    //   alert("You must agree to the terms and policies before proceeding.");
    //   return;
    // }

    let orderItems = [];
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { razorpayOrderId, amount, currency, key, orderId } = response.data;

        const options = {
          key, // Razorpay key from backend
          amount, // amount in paise
          currency,
          name: "Nom Nom Nation",
          description: "Test Transaction",
          order_id: razorpayOrderId,
          handler: async function (response) {
            window.location.href = `${frontendUrl}/verify?razorpay_order_id=${response.razorpay_order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}&orderId=${orderId}`;
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone
          },
          notes: {
            address: `${data.street}, ${data.city}, ${data.state}, ${data.pincode}, ${data.country}`
          },
          theme: {
            color: "#3399cc"
          }
        };
        
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        
      } else {
        window.location.href = `${frontendUrl}/verify?razorpay_order_id=${response.razorpay_order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}&orderId=${orderId}`;      }
    } catch (error) {
      console.error(error);
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/cart");
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart");
    }
  },[token])


  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}));
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First name'/>
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="text" placeholder='Email address'/>
        <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='pincode' value={data.pincode} type="text" placeholder='Pin code'/>
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
            </div>
            <div className="terms-agreement">
              <input
                required
                type="checkbox"
                id="agree"
                onChange={() => setAgreed(!agreed)}
              />
              <label htmlFor="agree">
                I agree to the{" "}
                <a href="https://merchant.razorpay.com/policy/QbWrS9sbQVZQWv/terms" target="_blank" rel="noreferrer">Terms & Conditions</a>,{" "}
                <a href="https://merchant.razorpay.com/policy/QbWrS9sbQVZQWv/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>,{" "}
                <a href="https://merchant.razorpay.com/policy/QbWrS9sbQVZQWv/shipping" target="_blank" rel="noreferrer">Shipping Policy</a>, and{" "}
                <a href="https://merchant.razorpay.com/policy/QbWrS9sbQVZQWv/refund" target="_blank" rel="noreferrer">Refund Policy</a>.
              </label>
            </div>
            <button type='submit'>Proceed to Payment</button>
            <div className="contact">
                <a href="https://merchant.razorpay.com/policy/QbWrS9sbQVZQWv/contact_us" target="_blank" rel="noreferrer">Contact Us</a>
            </div>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
