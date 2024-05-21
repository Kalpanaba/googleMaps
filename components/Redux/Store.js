import { configureStore } from '@reduxjs/toolkit';
// import { createStore }  from 'redux';
// import applyMiddleware  from 'redux';

import cartSlice from './ReduxSlice/cartSlice';

import rootReducer from  './rootReducer'; // Your root reducer
import signInReducer from './reducers/SignInReducer';
import  cartReducer   from './reducers/cartReducer';
import HamReducer from './reducers/HamReducer';


const store = configureStore({
   reducer: 
   {
     root: rootReducer,
     signIn: signInReducer,
      cart : cartReducer,
      ham: HamReducer,
      //cart: cartSlice

   },
});



// // export default store;
// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import {productReducer} from './ReduxSlice/productSlice';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './rootReducer';

// const store = configureStore(rootReducer, applyMiddleware(thunk));

 export default store;
