import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favoritesReducer from '../redux/features/favorites/favoriteSlice'
import cartSliceReducer from '../redux/features/cart/cartSlice'
import shopReducer from '../redux/features/shop/shopSlice'
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import paymentReducer from "./features/payments/paymentSlice"
import userLoginReducer from "./features/user/userLogin";

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
        userLogin: userLoginReducer,
        payment: paymentReducer,
    },

    preloadedState: {
        favorites: initialFavorites
    },
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    
})

setupListeners(store.dispatch);
export default store;