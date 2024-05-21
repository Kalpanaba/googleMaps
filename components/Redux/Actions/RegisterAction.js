import { registerUser }  from '../../Server/Api'; 



export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  error,
});

export const register = (userData) => async (dispatch) => {
  try {
   
    // console.log('adsadsadsadsads',userData);
    // console.log('aJIJIJIJIJ',registerUser(userData));
    console.log('User data:', userData);
    const response = await registerUser(userData);
    console.log('Response:', response);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(registerFailure(error));
  }
};
