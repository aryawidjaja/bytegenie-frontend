import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import './ChatWindow.css';

const ChatWindow = ({ conversationId, onNewQuery }) => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (conversationId) {
      fetchConversation(conversationId);
    }
  }, [conversationId]);

  const fetchConversation = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/conversation?id=${id}`);
      const { user_query, model_response } = response.data;
      setMessages([
        { sender: 'user', text: user_query, timestamp: new Date().toLocaleTimeString() },
        { sender: 'bot', text: model_response, timestamp: new Date().toLocaleTimeString() }
      ]);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const handleSend = async () => {
    if (query.trim() === '') return;

    const newMessage = { sender: 'user', text: query, timestamp: new Date().toLocaleTimeString() };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post('http://127.0.0.1:5000/query', { query });
      const botResponse = { sender: 'bot', text: response.data.response, timestamp: new Date().toLocaleTimeString() };
      setMessages([...messages, newMessage, botResponse]);
      onNewQuery();
    } catch (error) {
      console.error('Error fetching response:', error);
    }

    setQuery('');
  };

  return (
    <div className="chat-window flex flex-col h-full">
      <div className="messages flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.sender === 'user' && (
              <div className="bubble-content">
                <div className="bubble-header">
                  <span className="sender-name">You</span>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
                <p className="bubble-text">{msg.text}</p>
              </div>
            )}
            <img
              className="w-8 h-8 rounded-full"
              src={msg.sender === 'user' ? "/user-avatar.png" : "/bot-avatar.png"}
              alt={`${msg.sender} avatar`}
            />
            {msg.sender === 'bot' && (
              <div className="bubble-content">
                <div className="bubble-header">
                  <span className="sender-name">Bot</span>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
                <p className="bubble-text">{msg.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>
          <ArrowUpCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
