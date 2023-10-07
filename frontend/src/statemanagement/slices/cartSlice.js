import { createSlice } from "@reduxjs/toolkit";
const initialState=localStorage.getItem("cart")?JSON.parse(localStorage.getItem('cart')):{cartItems:[]}
const addDecimals=(v)=>{
    return  (Math.round(v*100)/100).toFixed(2)
}

const cartSlice= createSlice({
    name:'cart',
    initialState, 
    reducers:{
        addToCart:(state, actions)=>{
            const item=actions.payload
            const existItem=state.cartItems.find((i)=>i._id===item._id)
            if(existItem){
                state.cartItems=state.cartItems.map((i)=>  i._id===existItem._id?item:i )
            }else{
                state.cartItems=[...state.cartItems,item]
            }
            //items price 
            state.itemsPrice=addDecimals( state.cartItems.reduce((acc, item)=> acc+item.price*item.quantity,0))
            //shipping
            state.shippingPrice=addDecimals( state.itemsPrice>100?0:10)

            // tax 15%
            state.taxPrice=addDecimals(Number( 0.15*state.itemsPrice))
            //total
            state.totalPrice=(Number(state.itemsPrice)+Number(state.shippingPrice)+Number(state.taxPrice)).toFixed(2)
            localStorage.setItem('cart', JSON.stringify(state))          
        }
    }

})
export const {addToCart}=cartSlice.actions

export default cartSlice.reducer