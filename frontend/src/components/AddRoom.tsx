import React, { useState } from 'react';

interface Props {
  onAddRoom: (name: string) => void;
}

const AddRoom: React.FC<Props> = ({ onAddRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    onAddRoom(roomName);
    setRoomName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="New room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{
          flex: 1,
          padding: '0.5rem 0.75rem',
          borderRadius: '5px 0 0 5px',
          border: '1px solid #ccc',
          fontSize: '0.9rem',
        }}
      />
      <button
        type="submit"
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
        Add
      </button>
    </form>
  );
};

export default AddRoom;
