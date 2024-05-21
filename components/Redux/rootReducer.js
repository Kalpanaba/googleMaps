import { combineReducers } from 'redux';
import productReducer from './reducers/ProductReducer';
import reducer from './reducers/RegisterReducer';
import signInReducer from './reducers/SignInReducer';
import cartReducer from '../Redux/reducers/cartReducer';
import HamReducer from '../Redux/reducers/HamReducer';
import { UPDATE_CART_COUNT } from './Actions/cartActions'; 

const rootReducer = combineReducers({
  product: productReducer,
  register: reducer,
  login: signInReducer,
  cart: cartReducer,
  ham: HamReducer,
  // Add other reducers if needed
});



export default rootReducer;
