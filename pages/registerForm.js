import { useState } from 'react';

export default function RegisterURLs() {
  const [validationURL, setValidationURL] = useState('');
  const [confirmationURL, setConfirmationURL] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/registerUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ validationURL, confirmationURL }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to register URLs');
      }
    } catch (error) {
      setMessage('Failed to register URLs');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Validation URL:
          <input type="text" value={validationURL} onChange={(e) => setValidationURL(e.target.value)} />
        </label>
        <br />
        <label>
          Confirmation URL:
          <input type="text" value={confirmationURL} onChange={(e) => setConfirmationURL(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register URLs</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
