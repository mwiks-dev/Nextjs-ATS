import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { validationURL, confirmationURL } = req.body;
      const consumerKey = '8yx6m6MSsLKrAtLw6LcUdUqtexbSuXBl';
      const consumerSecret = 'BbHUeoHvuPOJzzU8';
      const shortcode = '600997';

      // Generate the access token
      const { data: { access_token } } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        },
      });

      // Prepare the request payload
      const payload = {
        ShortCode: shortcode,
        ResponseType: 'Completed',
        ConfirmationURL: confirmationURL,
        ValidationURL: validationURL,
      };

      // Register the URLs
      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl', payload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json({ success: true, message: 'URLs registered successfully' });
    } catch (error) {
      console.error('Failed to register URLs:', error);
      res.status(500).json({ success: false, message: 'Failed to register URLs' });
    }
  } else {
    res.status(404).end();
  }
}
