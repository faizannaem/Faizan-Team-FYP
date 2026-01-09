// reducers.js
import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QTY, DECREMENT_QTY } from '../actions/actionsCart';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const itemExists = state.cart.find((item) => item.id === action.payload.id);
      if (itemExists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case INCREMENT_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case DECREMENT_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
