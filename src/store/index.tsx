import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'

export const store = configureStore({
  reducer,
  middleware: [ReduxThunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
