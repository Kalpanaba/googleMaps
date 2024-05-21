import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../Actions/RegisterAction';

const initialState = {
  registrationMessage: '',
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registrationMessage: 'Registration Successful',
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registrationMessage: '',
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
