import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import userReducer from './userSlice';
import dataReducer from './dataSlice';
import otherSlice from './otherSlice';
import productReducer from './productSlice';
// lưu lại dù có tắt đi bật lại app
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['token', 'user', 'isLoggedIn'],
};

const persistConfig2 = {
  key: 'root2',
  storage: AsyncStorage,
  whitelist: ['addressDelivery', 'orientation'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedReducer2 = persistReducer(persistConfig2, otherSlice);

// tải lại mỗi khi mở app
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    data: dataReducer,
    other: persistedReducer2,
    product: productReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
