// store.js
import { createStore } from 'redux';
import cartReducer from '../app/reducers/cartSlice';

const store = createStore(cartReducer);

export default store;
