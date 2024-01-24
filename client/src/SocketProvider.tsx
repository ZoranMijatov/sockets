import { useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { SocketContext } from './socket';

const SocketProvider: React.FC = ({ children }: any) => {
  const socket = useRef(
    socketIOClient(import.meta.env.VITE_SOCKET_SERVER, {
      // auth: {token}
    }),
  );

  useEffect(() => {
    socket.current.on('connect', () => {
      console.log('Connected');
    });

    socket.current.on('error', (msg: string) => {
      console.error('Error', msg);
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
