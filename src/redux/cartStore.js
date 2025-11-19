import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slices/productsSlice'
import wishlistSlice from './slices/wishlistSlice'


const cartStore = configureStore({
    reducer:{
     productReducer:productSlice,
     wishlistReducer: wishlistSlice
    }
})
export default cartStore