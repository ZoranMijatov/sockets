import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io } from 'socket.io-client';

// export const socket = io(import.meta.env.VITE_SOCKET_SERVER, {
//     autoConnect: false,
//     reconnectionAttempts: 3
// });

export const SocketContext = createContext<any>({ socket: null });

// const socketManager = {
//     socketMessageListeners: new Set(),
//     io: null,

//     subscribe: (callback) => {
//         if (socketManager.socketMessageListeners.size === 0) {
//             // ... napravi socket konekciju
//             socketManager.io = new Server();
//             io.on("message", socketManager.handleMessage);
//         }
//         socketManager.socketMessageListeners.add(callback);

//         return () => {
//             socketManager.socketMessageListeners.remove(callback);
//             // Ubi konekciju ako treba
//         }
//     },

//     handleMessage(data) {
//         // e ako je ovo notifikacija
//         // socketManager.notificationListners
//         socketManager.socketMessageListeners.forEach(((listener: any) => listener(data)))
//     }
// };

// const useSocket = (callback) => {
//     const callbackRef = useRef(callback);
//     callbackRef.current = callback;

//     useEffect(() => {
//         return socketManager.subscribe((data) => {
//             callbackRef.current(data);
//         });
//     }, [socketManager]);
// };

// const Component = () => {

//     useSocket((data) => {

//     });
// }

// const Component2 = () => {
//     useSocket((data) => {

//     });
// }
