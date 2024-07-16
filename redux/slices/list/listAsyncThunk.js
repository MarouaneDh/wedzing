import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, API_HOST } from '../../../configs/api';
import { getAsyncStorageData } from '../../../helpers/storage';

export const getAllLists = createAsyncThunk(
    'lists/getAllLists',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.lists.list;

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

export const getOneList = createAsyncThunk(
    'lists/getOneList',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.lists.oneList(id);

        try {
            const token = await getAsyncStorageData("token");

            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                method: 'POST',
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

export const addNewList = createAsyncThunk(
    'lists/addNewList',
    async (listData, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.lists.list;

        try {
            const token = await getAsyncStorageData("token");

            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                method: 'POST',
                body: JSON.stringify(listData)
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

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.lists.oneList(id);

        try {
            const token = await getAsyncStorageData("token");

            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                method: 'DELETE',
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

export const editList = createAsyncThunk(
    'lists/editList',
    async ({ id, list, listCategory, listName }, { fulfillWithValue, rejectWithValue }) => {
        const URL = API_HOST + API.lists.oneList(id);

        try {
            const token = await getAsyncStorageData("token");

            const response = await fetch(URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                body: JSON.stringify({
                    list: list,
                    listCategory: listCategory,
                    listName: listName
                }),
                method: 'PATCH',
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