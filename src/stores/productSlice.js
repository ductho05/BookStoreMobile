import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    keywords: null,
    suggestionProducts: [],
    recommendationProducts: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        search: (state, action) => {

            state.keywords = action.payload.keywords
            state.suggestionProducts = action.payload.suggestionProducts
        },

        getRecommendationProduct: (state, action) => {

            state.recommendationProducts = action.payload
        },

        getContinueRecommendationProduct: (state, action) => {

            state.recommendationProducts = [...state.recommendationProducts, ...action.payload]
        }
    }
})

export const { search, getRecommendationProduct, getContinueRecommendationProduct } = productSlice.actions

export default productSlice.reducer
