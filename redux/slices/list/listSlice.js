import { createSlice } from '@reduxjs/toolkit';
import { addNewList, deleteList, editList, getAllLists, getOneList } from './listAsyncThunk';

const initialState = {
    lists: {
        isLoading: false,
        status: null,
        error: null,
        lists: null,
    },
    oneList: {
        isLoading: false,
        status: null,
        error: null,
        list: null,
    },
    editOneList: {
        isLoading: false,
        status: null,
        error: null,
        list: null,
    },
    deleteOneList: {
        isLoading: false,
        status: null,
        error: null,
        list: null,
    }
};

export const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        resetOneListData: (state) => {
            state.oneList.list = null;
            state.oneList.status = null;
            state.oneList.error = null;
            state.oneList.isLoading = false;
            state.editOneList.list = null;
            state.editOneList.status = null;
            state.editOneList.error = null;
            state.editOneList.isLoading = false;
        },
        resetOneDeleteListData: (state) => {
            state.deleteOneList.list = null;
            state.deleteOneList.status = null;
            state.deleteOneList.error = null;
            state.deleteOneList.isLoading = false;
        },
        resetEditOneListData: (state) => {
            state.editOneList.list = null;
            state.editOneList.status = null;
            state.editOneList.error = null;
            state.editOneList.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //get all lists
            .addCase(getAllLists.pending, (state) => {
                state.lists.isLoading = true;
                state.lists.status = 'pending'
                state.lists.error = null
            })
            .addCase(getAllLists.fulfilled, (state, action) => {
                state.lists.isLoading = false;
                state.lists.status = 'fulfilled'
                state.lists.lists = action.payload.response
            })
            .addCase(getAllLists.rejected, (state, action) => {
                state.lists.isLoading = false;
                state.lists.status = 'rejected';
                state.lists.error = action.payload;
            })

            //get one list
            .addCase(getOneList.pending, (state) => {
                state.oneList.isLoading = true;
                state.oneList.status = 'pending'
                state.oneList.error = null
            })
            .addCase(getOneList.fulfilled, (state, action) => {
                state.oneList.isLoading = false;
                state.oneList.status = 'fulfilled'
                state.oneList.list = action.payload.response
            })
            .addCase(getOneList.rejected, (state, action) => {
                state.oneList.isLoading = false;
                state.oneList.status = 'rejected';
                state.oneList.error = action.payload;
            })

            //add new list
            .addCase(addNewList.pending, (state) => {
                state.oneList.isLoading = true;
                state.oneList.status = 'pending'
                state.oneList.error = null
            })
            .addCase(addNewList.fulfilled, (state, action) => {
                state.oneList.isLoading = false;
                state.oneList.status = 'fulfilled'
                state.oneList.list = action.payload.response
            })
            .addCase(addNewList.rejected, (state, action) => {
                state.oneList.isLoading = false;
                state.oneList.status = 'rejected';
                state.oneList.error = action.payload;
            })

            //delete one list
            .addCase(deleteList.pending, (state) => {
                state.deleteOneList.isLoading = true;
                state.deleteOneList.status = 'pending'
                state.deleteOneList.error = null
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.deleteOneList.isLoading = false;
                state.deleteOneList.status = 'fulfilled'
                state.deleteOneList.list = action.payload.response
            })
            .addCase(deleteList.rejected, (state, action) => {
                state.deleteOneList.isLoading = false;
                state.deleteOneList.status = 'rejected';
                state.deleteOneList.error = action.payload;
            })

            //edit one list
            .addCase(editList.pending, (state) => {
                state.editOneList.isLoading = true;
                state.editOneList.status = 'pending'
                state.editOneList.error = null
            })
            .addCase(editList.fulfilled, (state, action) => {
                state.editOneList.isLoading = false;
                state.editOneList.status = 'fulfilled'
                state.editOneList.list = action.payload.response
            })
            .addCase(editList.rejected, (state, action) => {
                state.editOneList.isLoading = false;
                state.editOneList.status = 'rejected';
                state.editOneList.error = action.payload;
            })
    },
});

export const { resetOneListData, resetOneDeleteListData, resetEditOneListData } = listSlice.actions;

export default listSlice.reducer;
