import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './AppLayout.css';

const AppLayout = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newQuery, setNewQuery] = useState(false);

  const handleSelectConversation = (id) => {
    setSelectedConversation(id);
  };

  const handleDeleteConversation = (id) => {
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const handleNewQuery = () => {
    setNewQuery(!newQuery); // toggle the newQuery state
  };

  return (
    <div className="app-layout flex h-screen">
      <Sidebar
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onNewQuery={newQuery} // pass the newQuery state to Sidebar
      />
      <div className="flex-1">
        <ChatWindow conversationId={selectedConversation} onNewQuery={handleNewQuery} />
      </div>
    </div>
  );
};

export default AppLayout;
