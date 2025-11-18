import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slices/productsSlice'
const cartStore = configureStore({
    reducer:{
     productReducer:productSlice
    }
})
export default cartStore