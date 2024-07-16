import { createSlice } from '@reduxjs/toolkit';
import { getOneUser } from './userAsyncThunk';

const initialState = {
    user: {
        isLoading: false,
        status: null,
        error: null,
        user: null,
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get one user
            .addCase(getOneUser.pending, (state) => {
                state.user.isLoading = true;
                state.user.status = 'pending'
                state.user.error = null
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                state.user.isLoading = false;
                state.user.status = 'fulfilled'
                state.user.user = action.payload.response
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.user.isLoading = false;
                state.user.status = 'rejected';
                state.user.error = action.payload;
            })
    },
});

export default userSlice.reducer;
