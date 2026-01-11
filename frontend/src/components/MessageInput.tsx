import React, { useState } from 'react';

interface Props {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <div style={{ display: 'flex', marginTop: '1rem' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        style={{
          flex: 1,
          padding: '0.5rem 0.75rem',
          borderRadius: '5px 0 0 5px',
          border: '1px solid #ccc',
          fontSize: '0.9rem',
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: '0.5rem 1rem',
          minWidth: '60px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '0 5px 5px 0',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
