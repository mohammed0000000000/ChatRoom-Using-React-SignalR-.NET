import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from "redux-persist";
import userSlice from './features/userSlice';


export const store = configureStore({
  reducer: {
    user: userSlice
  },
})
export const persister = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch