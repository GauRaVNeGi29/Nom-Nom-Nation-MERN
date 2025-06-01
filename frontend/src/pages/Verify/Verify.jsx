import React, { useContext, useEffect } from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const Verify = () => {
    
    const [searchParams,setSearchParams] = useSearchParams(); 
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);

    const verifyPayment = async () => {
    const razorpay_order_id = query.get('razorpay_order_id');
    const razorpay_payment_id = query.get('razorpay_payment_id');
    const razorpay_signature = query.get('razorpay_signature');
    const orderId = query.get('orderId');

    try {
      const response = await axios.post(url + '/api/order/verify', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId,
      });

      

      if (response.data.success) {
        navigate('/myorders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  };

    useEffect(()=>{
        verifyPayment();
    },[])
    
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify