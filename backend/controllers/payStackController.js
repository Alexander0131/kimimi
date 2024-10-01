import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const initiatePayment = async (req, res) => {
  const { email, amount, paymentMethod } = req.body;

  try {
    let response;
    
    if (paymentMethod === 'paystack') {
      // Paystack payment initialization
      response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100, // Paystack expects the amount in the smallest currency unit (e.g., GHS to kobo)
          currency: 'GHS',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Your Paystack secret key
            'Content-Type': 'application/json',
          },
        }
      );
    } else if (paymentMethod === 'momo') {
      // MoMo payment initialization
      // (Add MoMo API call here)
      response = await axios.post(
        'https://api.momo.com/transaction/initialize',
        {
          phoneNumber: req.body.phoneNumber,
          amount,
          // Additional MoMo parameters
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.MOMO_SECRET_KEY}`, // Your MoMo secret key
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Unsupported payment method',
      });
    }

    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.response ? error.response.data.message : error.message,
    });
  }
};
