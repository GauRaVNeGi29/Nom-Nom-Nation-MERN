import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {
  const { url } = useContext(StoreContext)
  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)

  const [status, setStatus] = useState('verifying') 
  const [countdown, setCountdown] = useState(5)

  const verifyPayment = async () => {
    const razorpay_order_id = query.get('razorpay_order_id')
    const razorpay_payment_id = query.get('razorpay_payment_id')
    const razorpay_signature = query.get('razorpay_signature')
    const orderId = query.get('orderId')

    try {
      const response = await axios.post(
        `${url}/api/order/verify`,
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          orderId,
        }
      )

      console.log('Verify Response:', response.data)

      if (response.data.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setStatus('error')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval)
            navigate(status === 'success' ? '/myorders' : '/')
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [status, navigate])

  return (
    <div className="verify">
      {status === 'verifying' && <div className="spinner"></div>}

      {status === 'success' && (
        <div className="message">
          <h2>✅ Payment Successful!</h2>
          <p>Redirecting to My Orders in {countdown} second{countdown > 1 ? 's' : ''}...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="message">
          <h2>❌ Payment Verification Failed</h2>
          <p>Redirecting to Home in {countdown} second{countdown > 1 ? 's' : ''}...</p>
        </div>
      )}
    </div>
  )
}

export default Verify
