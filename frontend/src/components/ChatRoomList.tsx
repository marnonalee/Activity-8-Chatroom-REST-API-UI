import React from 'react';

interface ChatRoom {
  id: number;
  name: string;
}

interface Props {
  chatrooms: ChatRoom[];
  selectedRoom: number | null;
  onSelect: (id: number) => void;
}

const ChatRoomList: React.FC<Props> = ({ chatrooms, selectedRoom, onSelect }) => {
  return (
    <div>
      {chatrooms.map((room) => {
        const isActive = room.id === selectedRoom;
        return (
          <div
            key={room.id}
            onClick={() => onSelect(room.id)}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '5px',
              backgroundColor: isActive ? '#1890ff' : 'transparent',
              color: isActive ? 'white' : 'black',
              marginBottom: '0.25rem',
            }}
          >
            {room.name}
          </div>
        );
      })}
    </div>
  );
};

export default ChatRoomList;
