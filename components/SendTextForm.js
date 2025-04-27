'use client'; 
import { useState } from 'react';

export default function SendTextForm({ messageToSend }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          messageText: messageToSend,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('✅ Message Sent Successfully!');
        setPhoneNumber(''); // Clear input
      } else {
        setStatus('❌ Failed to send. Try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Error sending message.');
    }
  };

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-4 p-4 border rounded-lg shadow search-form">
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Send to My Phone
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
