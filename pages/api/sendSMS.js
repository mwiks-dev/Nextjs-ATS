const africastalking = require('africastalking');
import pool from '@/db';

const apiKey = process.env.apiKey
const username = process.env.username

const africastalkingClient = africastalking({
  apiKey: apiKey,
  username: username,
});

export default async function sendSMSHandler(req, res) {
  const { recipient, message } = req.body;

  try {
    const sms = africastalkingClient.SMS;
    const response = await sms.send({
      to: recipient,
      message: message,
    });
    const client = await pool.connect();
    const query = 'INSERT INTO sent_messages (recipient, message) VALUES ($1, $2) RETURNING *';
    const values = [recipient, message];
    const result = await client.query(query,values);
    const sentMessage = result.rows[0]
    client.release();

    console.log(response); // Log the response or handle it as needed
    console.log('Message sent:', sentMessage)

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error); // Log any errors that occur

    res.status(500).json({ success: false, error: 'Failed to send SMS' });
  }
}
