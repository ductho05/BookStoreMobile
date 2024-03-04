import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistStore, persistReducer } from "redux-persist"
import userReducer from './userSlice'
import dataReducer from './dataSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['token', 'user', 'isLoggedIn']
}

const persistCartConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        data: dataReducer,
        product: productReducer,
        cart: persistReducer(persistCartConfig, cartReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false

        })
})

export const persistor = persistStore(store)
