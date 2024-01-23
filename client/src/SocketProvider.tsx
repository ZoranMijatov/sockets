import socketIOClient from 'socket.io-client';
import { SocketContext } from './socket';
import { useEffect, useRef } from 'react';

const SocketProvider: React.FC = ({ children }: any) => {
  const socket = useRef(socketIOClient(import.meta.env.VITE_SOCKET_SERVER));

  useEffect(() => {
    socket.current.on('connect', () => {
      console.log('SocketIO: Connected and authenticated');
    });

    socket.current.on('error', (msg: string) => {
      console.error('SocketIO: Error', msg);
    });

    return () => {
      if (socket && socket.current) {
        socket.current.removeAllListeners();

        socket.current.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
