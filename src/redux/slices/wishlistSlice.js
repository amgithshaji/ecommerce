import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:'wishlist',
    initialState:[],
    reducers:{
        // add to wishlist - addtowishlist btn clicked in view
        addToWishlist:(state,action)=>{
            state.push(action.payload)
        },

        // remove from wishlist
        removeWishlistitem:(state,action)=>{
return state.filter(item=>item.id!=action.payload)
        }

    }

})
export const {addToWishlist,removeWishlistitem} = wishlistSlice.actions
export default wishlistSlice.reducer