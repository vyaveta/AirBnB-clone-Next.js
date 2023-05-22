import {configureStore } from '@reduxjs/toolkit'
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
// import logger from 'redux-logger'

import authReducer from '../Redux/features/auth'
// import persistReducer from 'redux-persist/es/persistReducer';

// const persistConfig = {
//     key: 'AirBnBClone',
//     version: 1,
//     storage
// }

// const reducer = combineReducers({
//     auth: authReducer
// })

// const persistReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch