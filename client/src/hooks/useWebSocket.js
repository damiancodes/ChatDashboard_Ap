import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [connectionError, setConnectionError] = useState(null);
  const ws = useRef(null);
  const reconnectTimeoutRef = useRef();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // define-ocg: WebSocket configuration for optimal chat group connectivity
  const varOcg = {
    reconnectDelay: 2000,
    maxReconnectAttempts: 5,
    heartbeatInterval: 30000,
  };

  const connect = useCallback(() => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      // Connect to the backend server on port 5000
      const wsUrl = `${protocol}//localhost:5000/ws`;
      
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'initial_messages') {
            setMessages(data.data);
          } else if (data.type === 'message') {
            setMessages(prev => [...prev, data.data]);
          } else if (data.type === 'typing') {
            setTypingUsers(prev => {
              const newSet = new Set(prev);
              if (data.data.isTyping) {
                newSet.add(data.data.user);
              } else {
                newSet.delete(data.data.user);
              }
              return newSet;
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        
        // Attempt to reconnect
        if (reconnectAttempts.current < varOcg.maxReconnectAttempts) {
          reconnectAttempts.current++;
          setConnectionError(`Connection lost. Reconnecting... (${reconnectAttempts.current}/${varOcg.maxReconnectAttempts})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, varOcg.reconnectDelay * reconnectAttempts.current); // Exponential backoff
        } else {
          setConnectionError('Connection failed. Please refresh the page.');
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('Connection error occurred');
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionError('Failed to establish connection');
    }
  }, []);

  const sendMessage = useCallback((message) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected,
    sendMessage,
    messages,
    typingUsers,
    connectionError,
  };
}
