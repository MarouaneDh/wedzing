import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, API_HOST } from '../../../configs/api';
import { getAsyncStorageData } from '../../../helpers/storage';

export const uploadOneImage = createAsyncThunk(
    'images/uploadOneImage',
    async (formData, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.images.upload;

        try {
            const token = await getAsyncStorageData("token");

            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                body: formData,
                method: 'POST',
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Response error:', error);
                return rejectWithValue(error);
            }

            const data = await response.json();

            return fulfillWithValue(data);
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);
