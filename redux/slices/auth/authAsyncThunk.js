import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, API_HOST } from '../../../configs/api';

export const login = createAsyncThunk(
    'auth/login',
    async (user, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.auth.login;

        try {
            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(user),
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
