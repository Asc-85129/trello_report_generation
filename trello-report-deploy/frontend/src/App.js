import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [boardId, setBoardId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage('Generating...');
    try {
      const res = await axios.post('https://your-backend-service.onrender.com/generate-report', { boardId });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <h2>Trello Report Generator</h2>
      <input
        type="text"
        placeholder="Enter Trello Board ID"
        value={boardId}
        onChange={(e) => setBoardId(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleSubmit} style={{ padding: 10 }}>Generate Report</button>
      <p>{message}</p>
    </div>
  );
}

export default App;