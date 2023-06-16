import axios from 'axios';
import jwt from 'jsonwebtoken';

const darajaService = {
  async getAccessToken(consumerKey, consumerSecret) {
    try {
      const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        },
      });

      return response.data.access_token;
    } catch (error) {
      throw new Error('Failed to retrieve access token');
    }
  },

  async initiateSTKPush(accessToken, shortcode, passkey, phoneNumber, amount, callbackUrl) {
    try {
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const payload = {
        BusinessShortCode: shortcode,
        Password: Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64'),
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: 'STK Push',
        TransactionDesc: 'STK Push',
      };

      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to initiate STK Push');
    }
  },
};

export default darajaService;
