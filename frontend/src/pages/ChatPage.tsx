import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatRoomList from '../components/ChatRoomList';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import AddRoom from '../components/AddRoom';
import { getChatRooms, getMessages, sendMessage } from '../api/api';

interface ChatPageProps {
  username: string;
  token?: string;
  onLogout: () => void;
}

const socket = io('http://localhost:3001', { transports: ['websocket'] });

interface ChatRoom {
  id: number;
  name: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  createdAt: string;
  chatroom: { id: number };
}

const ChatPage: React.FC<ChatPageProps> = ({ username, onLogout }) => {
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chatrooms
  useEffect(() => {
    loadChatRooms();
  }, []);

  // Load messages for selected room
  useEffect(() => {
    if (selectedRoom !== null) loadMessages(selectedRoom);
  }, [selectedRoom]);

  // Listen for new messages and new rooms
  useEffect(() => {
    const messageHandler = (msg: Message) => {
      if (msg.chatroom.id === selectedRoom) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    const roomHandler = (room: ChatRoom) => {
      setChatrooms((prev) => [...prev, room]);
    };

    socket.on('newMessage', messageHandler);
    socket.on('newRoom', roomHandler);

    return () => {
      socket.off('newMessage', messageHandler);
      socket.off('newRoom', roomHandler);
    };
  }, [selectedRoom]);

  const loadChatRooms = async () => {
    try {
      const res = await getChatRooms();
      setChatrooms(res.data);
      if (res.data.length > 0) setSelectedRoom(res.data[0].id);
    } catch (err) {
      console.error('Failed to load chatrooms', err);
    }
  };

  const loadMessages = async (roomId: number) => {
    try {
      const res = await getMessages(roomId);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  const handleSend = async (content: string) => {
    if (!selectedRoom) return;
    try {
      const res = await sendMessage(username, content, selectedRoom);
      socket.emit('sendMessage', res.data);
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const handleAddRoom = async (name: string) => {
    try {
      const res = await fetch('http://localhost:3001/chatrooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const newRoom = await res.json();
      setChatrooms((prev) => [...prev, newRoom]);
      setSelectedRoom(newRoom.id);
      socket.emit('newRoom', newRoom);
    } catch (err) {
      console.error('Failed to add room', err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', borderRight: '1px solid #ccc', padding: '1rem' }}>
        <AddRoom onAddRoom={handleAddRoom} />
        <ChatRoomList chatrooms={chatrooms} selectedRoom={selectedRoom} onSelect={setSelectedRoom} />
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Welcome, {username}!</h2>
          <button
            onClick={onLogout}
            style={{
              padding: '0.5rem 1rem',
              minWidth: '80px',
              height: '35px',
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Logout
          </button>
        </div>

        {/* Chat Window */}
        <ChatWindow messages={messages} currentUser={username} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
