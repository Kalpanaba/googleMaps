import { loginUser } from '../../Server/Api';
//import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginSuccess = (token) => ({
 
  type: LOGIN_SUCCESS,
  token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const login = (userData2) => async (dispatch) => {
  
  try {
  
    console.log('User data:', userData2);
    const response = await loginUser(userData2);
    console.log('Response:', response);
   const token = response.result.token;
   console.log('token:', token);
   //sessionStorage.setItem('token', token);
   await AsyncStorage.setItem('token', token);

    dispatch(loginSuccess(token));

    // const navigation = useNavigation();
    // navigation.navigate('Home');
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
