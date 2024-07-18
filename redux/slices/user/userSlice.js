import { createSlice } from '@reduxjs/toolkit';
import { getOneUser, getPartnerUser } from './userAsyncThunk';

const initialState = {
    user: {
        isLoading: false,
        status: null,
        error: null,
        user: null,
    },
    partner: {
        isLoading: false,
        status: null,
        error: null,
        partner: null,
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

            //get partner user
            .addCase(getPartnerUser.pending, (state) => {
                state.partner.isLoading = true;
                state.partner.status = 'pending'
                state.partner.error = null
            })
            .addCase(getPartnerUser.fulfilled, (state, action) => {
                state.partner.isLoading = false;
                state.partner.status = 'fulfilled'
                state.partner.partner = action.payload.response
            })
            .addCase(getPartnerUser.rejected, (state, action) => {
                state.partner.isLoading = false;
                state.partner.status = 'rejected';
                state.partner.error = action.payload;
            })
    },
});

export default userSlice.reducer;
