import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { socket } from './socket';
import useSocket from './useSocket';

function App() {
  // const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const handleSubmit = (event: any) => (
    event.preventDefault(),
    console.log(
      Object.fromEntries(new FormData(event.currentTarget)),
      new FormData(event.currentTarget)
    ),
    event.currentTarget.reset()
  );

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/api');
      const data = await response.json();
      console.log(data, 'it this');
    })();
  }, []);

  const { emitEvent, receivedMessage } = useSocket();
  console.log(receivedMessage, 'wtf');
  const handleSendMessage = (e) => {
    e.preventDefault();

    emitEvent('sendMessage', { message: 'Zoran' });
  };

  return (
    <form onSubmit={handleSendMessage}>
      <label htmlFor="name">Name</label>
      <input name="name" type="text" />

      <label htmlFor="email">E-mail</label>
      <input name="email" type="email" />

      <label htmlFor="country">Country</label>
      <input name="country" type="text" />
    </form>
  );
}

export default App;
