import { fetchCartItems } from'../../Server/Api';  // Import the function that fetches cart items
//import { UPDATE_CART_COUNT } from './cartActions1';

export const GET_CART_ITEMS_REQUEST = 'GET_CART_ITEMS_REQUEST';
export const GET_CART_ITEMS_SUCCESS = 'GET_CART_ITEMS_SUCCESS';
export const GET_CART_ITEMS_FAILURE = 'GET_CART_ITEMS_FAILURE';
export const  UPDATE_CART_COUNT = 'UPDATE_CART_COUNT';


export const getCartItems = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CART_ITEMS_REQUEST });
    try {
      const cartItems = await fetchCartItems(); // Assuming fetchCartItems returns the cart items
      dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: cartItems });
    } catch (error) {
      dispatch({ type: GET_CART_ITEMS_FAILURE, payload: error.message });
    }
  };
};

// In your Redux actions file
export const updateCartCount = (count) => ({
  type: 'UPDATE_CART_COUNT',
  payload: count,
});