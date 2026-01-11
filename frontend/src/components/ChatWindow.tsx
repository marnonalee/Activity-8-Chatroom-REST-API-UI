import React from 'react';

interface Message {
  id: number;
  sender: string;
  content: string;
  createdAt: string;
}

interface Props {
  messages: Message[];
  currentUser: string;
}

const ChatWindow: React.FC<Props> = ({ messages, currentUser }) => {
  return (
    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', height: '400px' }}>
      {messages.map((msg) => {
        const isOwnMessage = msg.sender === currentUser;
        const date = new Date(msg.createdAt);
        const formattedDate = date.toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        return (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
              marginBottom: '0.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: isOwnMessage ? '#DCF8C6' : '#F1F0F0',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                maxWidth: '60%',
                wordBreak: 'break-word',
              }}
            >
              <b>{msg.sender}:</b> {msg.content} <br />
              <small style={{ color: '#666' }}>{formattedDate}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
