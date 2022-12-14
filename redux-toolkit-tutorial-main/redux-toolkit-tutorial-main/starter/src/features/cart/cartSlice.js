import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCardItems', ()=> {
    return fetch(url)
                .then( resp => resp.json())
                .catch((err) => console.log(err) )
})

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state, /* action */ ) => { 
            state.cartItems = [];
        },
        removeItem: ( state, { payload } ) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter( item => itemId !== item.id );
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find( item => item.id === payload.id );
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find( item => item.id === payload.id );
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach( item => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers:{
        [getCartItems.pending]: ( state ) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: ( state, action ) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: ( state ) => {
            state.isLoading = false;
        },
    }
});


export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;