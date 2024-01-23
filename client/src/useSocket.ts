import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (serverUrl: any) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(serverUrl);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [serverUrl]);

  const emitEvent = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    } else {
      console.error('Socket not connected');
    }
  };

  return { emitEvent };
};

export default useSocket;