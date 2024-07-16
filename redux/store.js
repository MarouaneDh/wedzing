import { configureStore } from '@reduxjs/toolkit';

import auth from "./slices/auth/authSlice";
import lists from "./slices/list/listSlice";
import images from "./slices/image/imageSlice";
import user from './slices/user/userSlice';

export const store = configureStore({
    reducer: {
        auth,
        lists,
        images,
        user
    },
});
