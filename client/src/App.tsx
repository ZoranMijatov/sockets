import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { socket } from './socket';
import  useSocket  from './useSocket';

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  // const { emit: sendMessage } = useSocket('sendMessage', handleMessage);

  const handleSubmit = (event: any) => (
    event.preventDefault(),
    console.log(Object.fromEntries(new FormData(event.currentTarget)), new FormData(event.currentTarget)),
    event.currentTarget.reset()
  );

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/api')
      const data = await response.json()
      console.log(data, 'it this')
    })()
  }, [])

  const { emitEvent } = useSocket(import.meta.env.VITE_SOCKET_SERVER);

  const handleSendMessage = (e) => {
    e.preventDefault();

    emitEvent('sendMessage', { message: 'Zoran', nesto: 'nesto', wtf: 'wtf' });

  };

  useEffect(() => {
    console.log('aaa');
    // socket.connect();
  
    function onConnect() {
      setIsConnected(true);
      console.log('wtf');
      socket.on('fuark', (message) => {
        console.log(message, 'okay');
      });
      // const what = socket.emit("fuark");
    }
  
    socket.on('connect', onConnect);
    // socket.on('disconnect', onDisconnect);
  
    return () => {
      setIsConnected(false)
      socket.disconnect();
      // Any other cleanup code you might have
    };
  }, []);

console.log('first', isConnected, import.meta.env.VITE_SOCKET_SERVER)
  return (
    <form onSubmit={handleSendMessage}>
      <label htmlFor="name">Name</label>
      <input name="name" type="text"  />

      <label htmlFor="email">E-mail</label>
      <input name="email" type="email"  />

      <label htmlFor="country">Country</label>
      <input name="country" type="text"  />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
