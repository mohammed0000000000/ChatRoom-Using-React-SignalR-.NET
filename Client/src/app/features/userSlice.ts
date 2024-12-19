// src/store/signalrSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface IUserState {
  name: string;
  chatRoom: string;
  onlineUsers: string[];
  isConnected: boolean;
  messages: { content: string, user: string }[]
}

const initialState: IUserState = {
  name: "",
  chatRoom: "",
  onlineUsers: [],
  isConnected: false,
  messages: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string, chatRoom: string }>) {
      state.name = action.payload.name;
      state.chatRoom = action.payload.chatRoom;
    },
    setOnlineUsers(state, action: PayloadAction<string[]>) {
      state.onlineUsers = action.payload;
    },
    setMessages(state, action: PayloadAction<{ content: string, user: string }>) {
      state.messages = [...state.messages, action.payload]
    }
  },
});
// selectors
export const selectOnlineUsers = (state: RootState) => state.user.onlineUsers;
export const selectMessages = (state: RootState) => state.user.messages;
export const selectName = (state: RootState) => state.user.name;
export const selectRoom = (state: RootState) => state.user.chatRoom;

// Slices
export const { setUser, setOnlineUsers, setMessages } = userSlice.actions;
// reducers
export default userSlice.reducer;
