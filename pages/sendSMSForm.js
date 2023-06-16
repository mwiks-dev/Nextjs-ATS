import { useState } from 'react';
import Papa from 'papaparse';

export default function SendSMSForm() {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Papa.parse(recipients, {
      // header: true,
      // skipEmptyLines: true,
      step: function(results) {
        const csv = results.data
        console.log('csv:', csv);
        csv.forEach(async (element) => {
          const recipient = element

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
        })
      }
    })
    // Reset the form fields
    setRecipients([ ]);
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload File:
        <input
          type="file"
          name="file"
          accept='.csv'
          onChange={(e) => setRecipients(e.target.files[0])}
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
