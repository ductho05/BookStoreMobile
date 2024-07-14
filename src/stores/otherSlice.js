import { createSlice } from '@reduxjs/toolkit';
// import {fetchInitialData} from './asyncActions';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

// const {token, user} = useSelector(state => state.user);

const initialState = {
  orientation:
    Dimensions.get('window').width > Dimensions.get('window').height
      ? 'landscape'
      : 'portrait',

  addressDelivery: [],
  listTitle: []
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    getOrientation: (state, action) => {
      state.orientation = action.payload;
    },

    getAddressDelivery: (state, action) => {
      state.addressDelivery = action.payload;
    },

    addTitle: (state, action) => {
      const title = action.payload

      const findIndex = state.listTitle.findIndex(itemTitle => itemTitle === title)

      if (findIndex !== -1) {
        state.listTitle.splice(findIndex, 1)
        state.listTitle.unshift(title)
      } else {
        state.listTitle.unshift(title)
      }
    },
  },
});

export const { getOrientation, getAddressDelivery, addTitle } = otherSlice.actions;

export default otherSlice.reducer;
