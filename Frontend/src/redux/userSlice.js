import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: null,
    error: '',
};

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        signupPending: (state) => {
            state.isLoading = true;
        },
        signupSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        signupFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        signinPending: (state) => {
            state.isLoading = true;
        },
        signinSuccess: (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.user = action.payload;
            // state.token = payload.token;
            state.error = '';
        },
        signinFailed: (state, { payload }) => {
            console.log(payload, "===>>> payload in reducer")
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.error = payload.message;
        },
        logout: () => {
            return {
                isLoading: false,
                user: null,
            }
        }
    },
});

export const { signinPending, signinSuccess, signinFailed, signupPending, signupSuccess, signupFailed, logout} = AuthSlice.actions;

export default AuthSlice.reducer;



// loginRefresh: (state, { payload }) => {
//     state.isLoading = false;
//     state.user = null;
//     state.token = null;
//     state.error = '';
//     state.userLocation = ''
// },