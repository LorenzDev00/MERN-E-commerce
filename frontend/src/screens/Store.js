import { createContext, useReducer } from "react";
import React from 'react';


// Creating the context store
export const Store = createContext();

// Initializing the initial state of the store
const initialState = {
    // Get the user info from the local storage, if it exists, else set it to null
    userInfo: localStorage.getItem('itemInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    // Initializing the cart object, get the shipping address, payment method, and cart items from the local storage if it exists, else set them to empty
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress') ?
            JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: localStorage.getItem('paymentMethod') ?
            localStorage.getItem('paymentMethod')
            : '',
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};

// Defining the reducer function that updates the state based on the dispatched action
function reducer(state, action) {
    switch (action.type) {

        // Adding item to cart
        case 'CART_ADD_ITEM':
            // Get the new item
            const newItem = action.payload;
            // Find if the item already exists in the cart
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            // Update the cart items based on whether the item already exists in the cart or not
            const cartItems = existItem ?
                // If the item already exists, replace the old item with the new one
                state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item)
                // If the item doesn't exist, add the new item to the end of the array
                :
                [...state.cart.cartItems, newItem];
            // Store the updated cart items in the local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Return the updated cart state
            return { ...state, cart: { ...state.cart, cartItems } };

        // Removing item from cart
        case 'CART_REMOVE_ITEM': {
            // Filter out the item to be removed from the cart items array
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            // Store the updated cart items in the local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Return the updated cart state
            return { ...state, cart: { ...state.card, cartItems } }
        }

        // Clearing cart
        case 'CART_CLEAR':
            // Set the cart items array to empty
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        // User sign-in
        case 'USER_SIGNIN':
            // Update the user info in the store with the payload
            return { ...state, userInfo: action.payload };

        // User sign-out
        case 'USER_SIGNOUT':
            // Clear the user info, cart items, shipping address, and payment method from the store
            return {
                ...state, userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                    paymentMethod: '',
                },
            };

        // Saving shipping address
        case 'SAVE_SHIPPING_ADDRESS':
            // Update the shipping address in the cart
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload,
                },
            };

        // Saving payment method
        case 'SAVE_PAYMENT_METHOD':
            // Update the payment method in the cart
            return {
                ...state,
                cart: { ...state.cart, paymentMethod: action.payload },
            };

        default:
            return state;
    }
}

export function StorePorvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}