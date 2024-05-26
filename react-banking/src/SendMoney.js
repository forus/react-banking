import { useState } from 'react';

export default function SendMoney({ onSent }) {
  const [iban, setIban] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      iban,
      amount,
      description
    };
    onSent(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          IBAN:
          <input
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Send</button>
    </form>
  );
};