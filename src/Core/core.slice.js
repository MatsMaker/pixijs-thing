import { createSlice } from '@reduxjs/toolkit';
import { coreInitAction } from './core.action';

const coreSlice = createSlice({
    name: 'core',
    initialState: {
        init: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(coreInitAction, () => {
            return {
                init: true,
            };
        });
    },
});

export { coreSlice };
