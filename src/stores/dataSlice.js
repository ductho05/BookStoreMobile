import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './asyncActions';

const initialState = {
  productsHots: [],
  categoryBooks: [],
  learnBooks: [],
  slideList: [],
  favorites: [],
  vouchers: [],
  confirmMyOrder: [],
  deliveryMyOrder: [],
  completeMyOrder: [],
  cancelMyOrder: [],
  allMyOrder: [],
  loading: true,
  categories: [],
  notifications: [],
  provinces: [],
  districes: [],
  wards: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getProductHots: (state, action) => {
      state.productsHots = [...state.productsHots, action.payload];
    },
    getProductCategory: (state, action) => {
      state.categoryBooks = [...state.categoryBooks, action.payload];
    },
    getLearnBooks: (state, action) => {
      state.learnBooks = [...state.learnBooks, action.payload];
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    getVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
    getConfirmMyOrder: (state, action) => {
      state.confirmMyOrder = action.payload;
    },
    getDeliveryMyOrder: (state, action) => {
      state.deliveryMyOrder = action.payload;
    },
    getCompleteMyOrder: (state, action) => {
      state.completeMyOrder = action.payload;
    },
    getCancelMyOrder: (state, action) => {
      state.cancelMyOrder = action.payload;
    },
    getAllMyOrder: (state, action) => {
      state.allMyOrder = action.payload;
    },
    updateFavorites: (state, action) => {

      state.favorites = [...state.favorites, action.payload]
    },
    getNotification: (state, action) => {

      state.notifications = action.payload
    },
    getProvince: (state, action) => {

      state.provinces = action.payload
    },

    getDistrict: (state, action) => {

      state.districes = action.payload
    },

    getWard: (state, action) => {

      state.wards = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchInitialData.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      console.log("data", action.payload)
      state.loading = false;
      state.productsHots = action.payload.productsHots || [];
      state.categoryBooks = action.payload.categoryBooks || [];
      state.learnBooks = action.payload.learnBooks || [];
      state.slideList = action.payload.slideList || [];
      state.favorites = action.payload.favoriteList || [];
      state.vouchers = action.payload.voucherList || [];
      state.confirmMyOrder = action.payload.confirmMyOrder || [];
      state.deliveryMyOrder = action.payload.deliveryMyOrder || [];
      state.completeMyOrder = action.payload.completeMyOrder || [];
      state.cancelMyOrder = action.payload.cancelMyOrder || [];
      state.allMyOrder = action.payload.allMyOrder || [];
      state.categories = action.payload.categories || [];
    });

    builder.addCase(fetchInitialData.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  getProductHots,
  getProductCategory,
  getLearnBooks,
  getFavorites,
  getVouchers,
  getConfirmMyOrder,
  getDeliveryMyOrder,
  getCompleteMyOrder,
  getCancelMyOrder,
  getAllMyOrder,
  updateFavorites,
  getNotification,
  getProvince,
  getDistrict,
  getWard
} = dataSlice.actions;

export default dataSlice.reducer;
