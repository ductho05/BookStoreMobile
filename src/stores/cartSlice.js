import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addUserToCart: (state, action) => {
            const userId = action.payload
            state[userId] = []
        },

        remove: (state, action) => {
            const { userId, productId } = action.payload
            const newList = state[userId].filter(cart => cart.product._id !== productId)
            state[userId] = [...newList]
        },

        add: (state, action) => {

            const { userId } = action.payload
            const cartData = state[userId]
            const index = cartData.findIndex((item) => item.product._id === action.payload.data.product._id)

            if (index !== -1) {
                cartData[index].quantity += action.payload.data.quantity
            } else {

                cartData.push(action.payload.data)
            }

            state[userId] = [...cartData]
        },

        minusQuantity: (state, action) => {

            const { userId, productId } = action.payload
            const index = state[userId].findIndex(cart => cart.product._id === productId)
            const cartUpdate = state[userId]
            if (cartUpdate[index].quantity > 0) {
                cartUpdate[index].quantity -= 1
            }

            state[userId] = [...cartUpdate]
        },

        plusQuantity: (state, action) => {
            const { userId, productId } = action.payload
            const index = state[userId].findIndex(cart => cart.product._id === productId)
            const cartUpdate = state[userId]
            if (cartUpdate[index].quantity > 0) {
                cartUpdate[index].quantity += 1
            }

            state[userId] = [...cartUpdate]
        }

    }
})

export const { addUserToCart, add, remove, minusQuantity, plusQuantity } = cartSlice.actions

export default cartSlice.reducer
