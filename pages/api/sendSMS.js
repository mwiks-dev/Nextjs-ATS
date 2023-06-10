const africastalking = require('africastalking');

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

    console.log(response); // Log the response or handle it as needed

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error); // Log any errors that occur

    res.status(500).json({ success: false, error: 'Failed to send SMS' });
  }
}
