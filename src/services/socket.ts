import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
});

/**
 * Hook-like events or generic listeners can be added here
 */
socket.on('connect', () => {
    console.log('⚡ Connected to Monteiro Universal Real-time Engine');
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from Real-time Engine');
});

export default socket;
