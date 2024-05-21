const initialState = {
  cartVisible: false,
  menuVisible: false
};

const visibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CART_VISIBILITY':
      return {
        ...state,
        cartVisible: !state.cartVisible
      };
    case 'TOGGLE_MENU_VISIBILITY':
      return {
        ...state,
        menuVisible: !state.menuVisible
      };
    default:
      return state;
  }
};

export default visibilityReducer;