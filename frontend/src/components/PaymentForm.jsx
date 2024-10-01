import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiatePayment } from '../redux/features/payments/paymentSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user info from Redux store (assuming user info is stored in auth or user state)
  const userInfo = useSelector((state) => state.user.userInfo); // Modify this to match your state structure
  const { loading, paymentUrl, error } = useSelector((state) => state.payment);

  const [email, setEmail] = useState(userInfo?.email || '');  // Default to logged-in user's email
  const [amount, setAmount] = useState('');  // You can set this based on the cart total
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method is 'card'

  useEffect(() => {
    if (userInfo?.email) {
      setEmail(userInfo.email);  // Automatically populate the user's email
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = { email, amount, paymentMethod };

    dispatch(initiatePayment(paymentData));
  };

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;  // Redirect to Paystack payment page
    }
  }, [paymentUrl]);

  useEffect(() => {
    if (!loading && !error && paymentUrl) {
      toast.success('Payment successful!');
      navigate('/orderconfirmation');  // Navigate to confirmation page
    } else if (error) {
      toast.error(`Payment failed: ${error}`);
    }
  }, [loading, error, paymentUrl, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Payment Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-address">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email-address"
            type="email"
            value={email}
            readOnly
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (₵)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
          <div className="flex items-center">
            <input
              id="card-payment"
              type="radio"
              name="payment-method"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="mr-2"
            />
            <label htmlFor="card-payment" className="mr-4">Card</label>

            <input
              id="momo-payment"
              type="radio"
              name="payment-method"
              value="momo"
              checked={paymentMethod === 'momo'}
              onChange={() => setPaymentMethod('momo')}
              className="mr-2"
            />
            <label htmlFor="momo-payment">Mobile Money (Momo)</label>
          </div>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-full ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
