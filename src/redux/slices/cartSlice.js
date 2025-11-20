import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        // addtocart
        addToCart:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            if (exisitingProduct) {
                exisitingProduct.quantity++
                exisitingProduct.totalprice = exisitingProduct.quantity * exisitingProduct.price
                const remainingProducts = state.filter(item=>item.id!=exisitingProduct.id)
                state = [...remainingProducts,exisitingProduct]
                
            }else{
                state.push({...action.payload,quantity:1,totalprice:action.payload.price})
            }

        }
    }
})
export const {addToCart} = CartSlice.actions
export default CartSlice.reducer