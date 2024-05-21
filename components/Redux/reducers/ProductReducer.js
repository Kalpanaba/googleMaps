// //import { combineReducers } from 'redux';
// import {
//   FETCH_PRODUCT_REQUEST,
//   FETCH_PRODUCT_SUCCESS,
//   FETCH_PRODUCT_FAILURE,
// } from '../Actions/ProductDetailAction';

// const initialState = {
//   product: {},
//   loading: false,
//   error: null,
// };

// const productReducer = (state = initialState, action) => {
//     console.error('productReducer:', action);
//   switch (action.type) {
//     case FETCH_PRODUCT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FETCH_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         product: action.payload,
//       };
//     case FETCH_PRODUCT_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   product: productReducer,
  
// });

// export default rootReducer;
