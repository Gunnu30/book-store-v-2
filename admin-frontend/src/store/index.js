import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './userSlice';
import themeReducer from './themeSlice';
import cartReducer  from './cartSlice';

export const store = configureStore({
    reducer: {
        cart:  cartReducer,
        user:  userReducer,
        theme: themeReducer,
    },
});
