import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistStore, persistReducer } from "redux-persist"
import userReducer from './userSlice'
import dataReducer from './dataSlice'
import productReducer from './productSlice'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['token', 'user', 'isLoggedIn']
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        data: dataReducer,
        product: productReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false

        })
})

export const persistor = persistStore(store)
