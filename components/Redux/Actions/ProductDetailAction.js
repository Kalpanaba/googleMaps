import ProductDetailScreen from '../../Common/ProductDetailScreen';
import { getProducts }  from '../../Server/Api'; 
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProduct = (productId) => async (dispatch) => {
  console.log('why', productId);
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  
  try {
    const products = await getProducts(); 
    const foundProduct = products.find((p) => p._id === productId);
    console.log('hqewrllo', foundProduct);

    if (foundProduct) {
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: foundProduct });
    } else {
      console.warn('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message });
  }
};
