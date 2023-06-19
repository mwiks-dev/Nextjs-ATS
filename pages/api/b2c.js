import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { phoneNumber, amount, accountReference, transactionDescription } = req.body;
      const consumerKey = process.env.consumerKey;
      const consumerSecret = process.env.consumerSecret;
      const shortcode = process.env.shortcode;
      const initiatorName = process.env.initiatorName;
      const securityCredential = process.env.securityCredential;
      const queueTimeOutURL = process.env.queueTimeOutURL;
      const resultURL = process.env.resultURL;

      // Generate the access token
      const { data: { access_token } } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        },
        });

      const payload = {
        InitiatorName: initiatorName,
        SecurityCredential: securityCredential,
        CommandID: 'BusinessPayment',
        Amount: amount,
        PartyA: shortcode,
        PartyB: phoneNumber,
        Remarks: transactionDescription,
        QueueTimeOutURL: queueTimeOutURL,
        ResultURL: resultURL,
        Occasion: accountReference,
      };

      const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
        payload,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({ success: true, message: 'B2C payment request sent successfully' });
      console.log(response)
    } catch (error) {
      console.error('Failed to send B2C payment request:', error);
      res.status(500).json({ success: false, message: 'Failed to send B2C payment request' });
    }
  } else {
    res.status(404).end();
  }
}
