import { configureStore } from "@reduxjs/toolkit";
import toDosReducer from './ToDosSlice';
import popUpReducer from './PopUpSlice';
import userReducer from './UserCredSlice';
import snackBarReducer from './SnackBarSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, userReducer);

  
export const store=configureStore(
    {
        reducer:{
        todos:toDosReducer,
        popUps:popUpReducer,
        userDetails:persistedReducer,
        snackBars:snackBarReducer,
        }
    }
)
export type AppDispatch=typeof store.dispatch
export const persistor = persistStore(store);
