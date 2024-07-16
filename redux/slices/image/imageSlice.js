import { createSlice } from '@reduxjs/toolkit';
import { uploadOneImage } from './imageAsyncThunk';

const initialState = {
    images: {
        isLoading: false,
        status: null,
        error: null,
        image: null,
    }
};

export const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        resetImageData: (state) => {
            state.images.image = null;
            state.images.status = null;
            state.images.error = null;
            state.images.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //upload one image
            .addCase(uploadOneImage.pending, (state) => {
                state.images.isLoading = true;
                state.images.status = 'pending'
                state.images.error = null
            })
            .addCase(uploadOneImage.fulfilled, (state, action) => {
                state.images.isLoading = false;
                state.images.status = 'fulfilled'
                state.images.image = action.payload.imageUrl
            })
            .addCase(uploadOneImage.rejected, (state, action) => {
                state.images.isLoading = false;
                state.images.status = 'rejected';
                state.images.error = action.payload;
            })
    },
});

export const { resetImageData } = imageSlice.actions;

export default imageSlice.reducer;
