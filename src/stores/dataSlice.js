import { createSlice } from "@reduxjs/toolkit";
import { fetchInitialData } from "./asyncActions";

const initialState = {
    productsHots: [],
    categoryBooks: [],
    learnBooks: [],
    slideList: [],
    loading: true
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchInitialData.pending, (state) => {

            state.loading = true
        })

        builder.addCase(fetchInitialData.fulfilled, (state, action) => {

            state.loading = false
            state.productsHots = action.payload.productsHots
            state.categoryBooks = action.payload.categoryBooks
            state.learnBooks = action.payload.learnBooks
            state.slideList = action.payload.slideList
        })

        builder.addCase(fetchInitialData.rejected, (state, action) => {

            state.loading = false
        })
    }
})

export const { } = dataSlice.actions

export default dataSlice.reducer