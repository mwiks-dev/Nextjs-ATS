import { useState } from 'react';

export default function SendSMSForm() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: Make a POST request to your sendSMSHandler API route
    const response = await fetch('/api/sendSMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, message }),
    });

    if (response.ok) {
      // SMS sent successfully
      console.log('SMS sent successfully');
    } else {
      // Failed to send SMS
      console.log('Failed to send SMS');
    }

    // Reset the form fields
    setRecipient('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recipient:
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </label>
      <br />
      <button type="submit">Send SMS</button>
    </form>
  );
}
