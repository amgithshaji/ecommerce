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

        },
        // remove cart
        removeCartItem:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        },
        // increment quantity
        incrementCartItem:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            exisitingProduct.quantity++
            exisitingProduct.totalprice = exisitingProduct.quantity * exisitingProduct.price
            const remainingProducts = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...remainingProducts,exisitingProduct]
        },
           // decrement quantity
        decrementCartItem:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            exisitingProduct.quantity--
            exisitingProduct.totalprice = exisitingProduct.quantity * exisitingProduct.price
            const remainingProducts = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...remainingProducts,exisitingProduct]
        },
        emptyCart:(state)=>{
            return []
        }
    }
})
export const {addToCart,removeCartItem,incrementCartItem,decrementCartItem,emptyCart} = CartSlice.actions
export default CartSlice.reducer