
import { UPDATE_CART_COUNT } from '../Actions/cartActions';


import { GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS, GET_CART_ITEMS_FAILURE,DELETE_CART_ITEM_FAILURE, } from '../Actions/cartActions';
const initialState = {
  cartItems: [],
  cartCount: 0,
  loading: false,
  error: null
 
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
        error: null
      };
    case GET_CART_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

      case DELETE_CART_ITEM_FAILURE:
  return {
    ...state,
    loading: false,
    error: 'Token is missing or invalid',
  };
  case UPDATE_CART_COUNT:
  return {
    ...state,
    ...state,
    cartCount: action.payload,
  };
  default:
    return state;
  }

};

export default cartReducer;
