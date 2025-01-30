import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/userSlice.js";
import themeReducer from "../redux/themeSlice.js"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer
    }
})