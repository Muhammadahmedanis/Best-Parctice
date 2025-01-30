import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    theme: localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : "light",
}
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", JSON.stringify(state.theme));
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", JSON.stringify(state.theme));
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer