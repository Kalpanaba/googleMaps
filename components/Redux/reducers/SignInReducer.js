import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../Actions/SignInActions';

const initialState = {
  token: null,
  error: null,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default signInReducer;
