import { createSlice } from '@reduxjs/toolkit';
import { coreInitAction } from '../Core';
import { resizeReducer } from './resize.reducer';

const resizeSlice = createSlice({
    name: 'resize',
    initialState: {
        size: [800, 600],
        center: [0, 0],
    },
    reducers: {
        resize: resizeReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(coreInitAction, (state) => {
            return resizeReducer(state, window);
        });
    },
});

export { resizeSlice };
