import { useState } from 'react';

export default function B2CForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountReference, setAccountReference] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/b2c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
          accountReference,
          transactionDescription,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to send B2C payment request');
      }
    } catch (error) {
      setMessage('Failed to send B2C payment request');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Account Reference:
          <input
            type="text"
            value={accountReference}
            onChange={(e) => setAccountReference(e.target.value)}
          />
        </label>
        <br />
        <label>
          Transaction Description:
          <input
            type="text"
            value={transactionDescription}
            onChange={(e) => setTransactionDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send B2C Payment</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
