

const initialState = {
    isOpen: false,
  };
  
  const  HamReducer= (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_CART':
        return {
          ...state,
          isOpen: true,
        };
      case 'CLOSE_CART':
        return {
          ...state,
          isOpen: false,
        };
      default:
        return state;
    }
  };
  
  export default HamReducer;
  