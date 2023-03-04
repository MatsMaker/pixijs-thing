import { createSlice } from '@reduxjs/toolkit';
// import { coreInitAction } from '../../Core/core.action';

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: (state) => {
            return state + 1;
        },
        decrement: (state) => {
            return state - 1;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(coreInitAction, () => {
    //         return 0;
    //     });
    // },
});

export { counterSlice };
