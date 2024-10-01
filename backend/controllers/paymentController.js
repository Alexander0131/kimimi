import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const initiatePayment = async (req, res) => {
  const { amount, currency, externalId, partyId, payerMessage, payeeNote } = req.body;
  
  const headers = {
    "Authorization": `Bearer ${process.env.MTN_API_TOKEN}`,
    "Content-Type": "application/json",
    "X-Reference-Id": uuidv4(),
    "X-Target-Environment": "sandbox",
    "Ocp-Apim-Subscription-Key": process.env.MTN_SUBSCRIPTION_KEY
  };
  
  const requestBody = JSON.stringify({
    amount,
    currency,
    externalId,
    payer: {
      partyIdType: "MSISDN",
      partyId // Make sure this is a valid MSISDN number
    },
    payerMessage,
    payeeNote
  });
  
  try {
    const response = await fetch("https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay", {
      method: 'POST',
      headers,
      body: {
        "amount": "100",
        "currency": "EUR",
        "externalId": "9391834",
        "payer": {
            "partyIdType": "MSISDN",
            "partyId": "0247004912"
        },
        "payerMessage": "KIMIMI_BILLS",
        "payeeNote": "Just made a payment of 100 euros"
    }
    });
    




    console.log(res.body)
    
    // console.log('Response Status:', response.status);
    // console.log('Response Headers:', response.headers.raw());
/*
    const responseText = await response.text();
    // console.log('Raw Response Text:', responseText);

    if (response.status === 500) {
      return res.status(500).json({
        error: 'Payment initiation failed',
        details: 'Server returned 500 status code',
        rawResponse: responseText
      });
    }

    if (!responseText) {
      return res.status(response.status).json({
        error: 'Payment initiation failed',
        details: 'No response body received from the server'
      });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(500).json({
        error: 'Unexpected response type',
        details: `Expected JSON but received ${contentType}`,
        rawResponse: responseText
      });
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (jsonError) {
      return res.status(500).json({
        error: 'Payment initiation failed',
        details: 'Failed to parse response as JSON',
        rawResponse: responseText
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Payment initiation failed',
        details: result
      });
    }

    res.status(202).json(result);

    */

  } catch (error) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({ error: 'Payment initiation failed', details: error.message });
  }
};

export { initiatePayment };
