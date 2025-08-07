import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TypingIndicator } from '../components/TypingIndicator';
import { useWebSocket } from '../hooks/useWebSocket';

// Avatar mapping for users with Bumble-inspired colors
const getUserAvatar = (user) => {
  const avatars = {
    'Alice': { letter: 'A', gradient: 'from-yellow-400 to-orange-500' },
    'Bob': { letter: 'B', gradient: 'from-orange-400 to-red-500' },
    'Charlie': { letter: 'C', gradient: 'from-yellow-500 to-yellow-600' },
  };
  return avatars[user] || { letter: user[0]?.toUpperCase() || '?', gradient: 'from-gray-400 to-gray-500' };
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

export default function ChatDashboard() {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState('You'); // Add user selection
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef();

  const { isConnected, sendMessage, messages: wsMessages, typingUsers, connectionError } = useWebSocket();

  // Fetch initial messages from API
  const { data: apiMessages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    },
  });

  // Combine API messages with WebSocket messages, removing duplicates
  const allMessages = React.useMemo(() => {
    const messageMap = new Map();
    
    // Add API messages first
    apiMessages.forEach(msg => messageMap.set(msg.id, msg));
    
    // Add WebSocket messages (which might include new ones not in API)
    wsMessages.forEach(msg => messageMap.set(msg.id, msg));
    
    return Array.from(messageMap.values()).sort((a, b) => a.id - b.id);
  }, [apiMessages, wsMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages, typingUsers]);

  const handleTyping = (value) => {
    setMessageText(value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }

    // Send typing indicator
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      sendMessage({
        type: 'typing',
        data: { user: currentUser, isTyping: true }
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        sendMessage({
          type: 'typing',
          data: { user: currentUser, isTyping: false }
        });
      }
    }, 2000); // Increased to 2 seconds for better visibility
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessage = {
      user: currentUser,
      message: messageText.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      // Send via API
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Clear input
    setMessageText('');
    setIsTyping(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl">
      {/* Chat Header with Bumble styling */}
      <header className="bg-gradient-to-r from-yellow-300 to-orange-400 px-6 py-4 flex-shrink-0 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg className="text-yellow-400 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-black">Buzzing Chat</h1>
              <p className="text-sm text-black/80">5 members online</p>
            </div>
          </div>
                     <div className="flex items-center space-x-2">
             {/* User Selection */}
             <select
               value={currentUser}
               onChange={(e) => setCurrentUser(e.target.value)}
               className="px-3 py-1 bg-black/10 text-black rounded-lg text-sm font-medium border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/20"
             >
               <option value="You">You</option>
               <option value="Alice">Alice</option>
               <option value="Bob">Bob</option>
               <option value="Charlie">Charlie</option>
             </select>
             
                           {/* Connection Status */}
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isConnected 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected 
                    ? 'bg-green-500 animate-pulse' 
                    : 'bg-red-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  isConnected 
                    ? 'text-green-700' 
                    : 'text-red-700'
                }`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
           </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-yellow-50/30 dark:bg-gray-800">
        {isLoading && (
          <div className="flex items-start space-x-3 opacity-50">
            <div className="w-8 h-8 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <div className="h-3 bg-yellow-300 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-yellow-300 rounded w-12 animate-pulse"></div>
              </div>
              <div className="bg-yellow-300 rounded-2xl rounded-tl-sm px-4 py-2 max-w-md animate-pulse">
                <div className="h-4 bg-yellow-400 rounded w-32"></div>
              </div>
            </div>
          </div>
        )}

        {allMessages.map((message) => {
          const avatar = getUserAvatar(message.user);
          const isYou = message.user === currentUser;
          
          return (
            <div key={message.id} className={`flex items-start space-x-3 ${isYou ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 bg-gradient-to-br ${avatar.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <span className="text-black text-sm font-medium">{avatar.letter}</span>
              </div>
              <div className={`flex-1 min-w-0 ${isYou ? 'flex flex-col items-end' : ''}`}>
                <div className={`flex items-center space-x-2 mb-1 ${isYou ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{message.user}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(message.timestamp)}</span>
                </div>
                <div className={`rounded-2xl px-4 py-2 max-w-md shadow-sm ${
                  isYou 
                    ? 'bg-yellow-400 text-black rounded-tr-sm' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-yellow-200 dark:border-yellow-700'
                }`}>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicators */}
        {Array.from(typingUsers).map((user) => {
          if (user === currentUser) return null; // Don't show our own typing indicator
          const avatar = getUserAvatar(user);
          return (
            <TypingIndicator 
              key={user} 
              user={user} 
              avatar={avatar.letter}
            />
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {}
      <div className="bg-white dark:bg-gray-900 border-t border-yellow-200 dark:border-gray-700 p-4 flex-shrink-0">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
                             <textarea
                 ref={textareaRef}
                 rows={1}
                 value={messageText}
                 onChange={(e) => handleTyping(e.target.value)}
                 onKeyDown={handleKeyPress}
                 placeholder={`Type a message as ${currentUser}...`}
                 className="w-full resize-none border border-yellow-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm bg-yellow-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                 disabled={!isConnected}
               />
              {}
                             <button
                 onClick={handleSendMessage}
                 disabled={!messageText.trim() || !isConnected}
                 className="absolute right-2 bottom-2 w-8 h-8 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white rounded-lg flex items-center justify-center transition-colors duration-200 disabled:cursor-not-allowed shadow-sm"
               >
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                 </svg>
               </button>
            </div>
          </div>
        </div>

        {}
        {connectionError && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              <span>⚠️</span>
              <span>{connectionError}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
