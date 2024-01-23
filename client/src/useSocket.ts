import { useContext, useEffect, useState } from 'react';
import { SocketContext } from './socket';

const useSocket = () => {
  const { socket } = useContext(SocketContext);
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const handleReceivedMessage = (data: any) => {
      if (socket) {
        setReceivedMessage(data);
      }
    };

    if (socket) {
      socket.on('hello', handleReceivedMessage);

      return () => {
        socket.off('hello', handleReceivedMessage);
      };
    }
  }, [socket]);

  const emitEvent = (eventName: string, data: any) => {
    if (socket) {
      socket.emit(eventName, data);
    } else {
      console.error('Socket not connected');
    }
  };

  const broadcastMessage = (eventName: string, data: any) => {
    if (socket) {
      socket.broadcast.emit(eventName, data);
    } else {
      console.error('Socket not connected');
    }
  };

  return { emitEvent, receivedMessage, broadcastMessage };
};

export default useSocket;
