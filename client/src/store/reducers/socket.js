import { createSlice } from '@reduxjs/toolkit';

export const socket = createSlice({
  name: 'socket',
  initialState: {
    socket: new WebSocket("ws://127.0.0.1:8080/ws"),
  },
  reducers: {},
});

// Export values
export const getSocket = (state) => state.socket.socket;

export default socket.reducer;
