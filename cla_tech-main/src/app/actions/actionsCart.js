// actions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QTY = 'INCREMENT_QTY';
export const DECREMENT_QTY = 'DECREMENT_QTY';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

export const incrementQty = (product) => ({
  type: INCREMENT_QTY,
  payload: product,
});

export const decrementQty = (product) => ({
  type: DECREMENT_QTY,
  payload: product,
});
export const clearCart = () => ({
  type: 'CLEAR_CART'
});