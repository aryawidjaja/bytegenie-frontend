import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon, PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import './Sidebar.css';

const Sidebar = ({ onSelectConversation, onDeleteConversation, onNewQuery }) => {
  const [conversations, setConversations] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [onNewQuery]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/conversation');
      setConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/conversation/delete/${id}`);
      onDeleteConversation(id);
      fetchConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const groupConversationsByDate = (conversations) => {
    const today = new Date();
    const groups = {
      Today: [],
      Yesterday: [],
      'Previous 7 Days': [],
    };

    conversations.forEach((conv) => {
      const date = new Date(conv.date_time);
      const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        groups.Today.push(conv);
      } else if (diffDays === 1) {
        groups.Yesterday.push(conv);
      } else if (diffDays <= 7) {
        groups['Previous 7 Days'].push(conv);
      }
    });

    return groups;
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    onSelectConversation(id);
  };

  const handleNewConversation = () => {
    window.location.reload();
  };

  const groupedConversations = groupConversationsByDate(conversations);

  return (
    <div className={`sidebar p-4 bg-gray-100 rounded-lg ${collapsed ? 'collapsed' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-700"
          data-tooltip-id="tooltip"
          data-tooltip-content={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
        <button
          onClick={handleNewConversation}
          className="text-blue-500 hover:text-blue-700"
          data-tooltip-id="tooltip"
          data-tooltip-content="New Conversation"
        >
          <PlusCircleIcon className="h-6 w-6" />
        </button>
      </div>
      <Tooltip id="tooltip" place="right" type="dark" effect="solid" />
      {!collapsed && (
        <div>
          {Object.entries(groupedConversations).map(([group, conversations]) => (
            conversations.length > 0 && (
              <div key={group}>
                <h3 className="group-title">{group}</h3>
                <ul className="space-y-2">
                  {conversations.map((conv) => (
                    <li
                      key={conv.id}
                      className={`conversation-item ${activeConversation === conv.id ? 'active' : ''}`}
                      onClick={() => handleSelectConversation(conv.id)}
                      data-tooltip-id="tooltip"
                      data-tooltip-content={conv.user_query_summary}
                    >
                      <span>{conv.user_query_summary}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(conv.id); }}
                        className="text-red-500 hover:text-red-700"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Delete Conversation"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
