import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: null,
    userOnline: {},
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        updateSocket: (state, action) => {
            if (action.payload) state.socket = action.payload;
        },
        updateUserOnline: (state, action) => {
            if (action.payload) {
                state.userOnline = action.payload
            }
        }
    },
});

// const followingUserFormat =

export const {
    updateSocket,
    updateUserOnline
} = socketSlice.actions;

export default socketSlice.reducer;
