import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './postReducer';

export const rootStore = configureStore({
    reducer:{
        postReducer
    }
})

