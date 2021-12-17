import { configureStore } from '@reduxjs/toolkit';

// Reducers
import socketReducer from './reducers/socket';

export default configureStore({
  reducer: {
    socket: socketReducer,
  },
});
