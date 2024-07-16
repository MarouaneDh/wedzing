import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, API_HOST } from '../../../configs/api';
import { getAsyncStorageData } from '../../../helpers/storage';

export const getOneUser = createAsyncThunk(
    'lists/getOneUser',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        const userID = await getAsyncStorageData("userID");
        const URL = API_HOST + API.user.oneUser(userID);

        try {
            const token = await getAsyncStorageData("token");

            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                method: 'GET',
            });

            if (!response.ok) {
                const error = await response.json();
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
