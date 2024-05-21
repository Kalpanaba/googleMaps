import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login }  from '.././Redux/Actions/SignInActions';
//import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import HeaderView from './Header';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const navigation = useNavigation();

  const handleSignIn = () => {
   
    dispatch(login({ email, password }))
    navigation.navigate('Home');
   
  };

 

  const handleSignInLinkPress = () => {
    navigation.navigate('SignUp');
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const toggleSlider = () => {
  
    dispatch(openCart());
  };

  const handleCartIconClick  = () => {
    dispatch(openCart());
  };

  return (
    <View style={styles.container}>
       <HeaderView 
       isSignupPage={false}
        handleCartIconClick={handleCartIconClick} 
        toggleSlider={toggleSlider}
         handleBackButtonPress={handleBackButtonPress} 
         />

       <View style={styles.topContainer}>
       
      <View style={styles.inputContainer}>
      <View style={styles.gap}></View> 
      <Text style={styles.label}>Email:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          autoCompleteType="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
       <View style={styles.inputContainer}>
       <Text style={styles.label}>Password:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCompleteType="password"
          value={password}
          onChangeText={setPassword}
        />                      
      </View>
      <View style={styles.gap}></View> 
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text>Remember me</Text>
      </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Login</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
        <View style={styles.bottomTextContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignInLinkPress}>
            <Text style={styles.signinLink}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    // paddingHorizontal: 20,
    // paddingTop: 50,
    // paddingBottom: 20,
    // backgroundColor: '#fff',

    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  
  topContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 40,

  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,

  },  
  gap: {
    height: 20, // Add a gap of 20 units
  },

  label: {
    color: '#333', // Adjust color as needed
    fontSize: 16, // Adjust font size as needed
    marginBottom: 10, // Add space between label and input
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  signInButton: {
    backgroundColor: '#5BB052',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    //marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinLink: {
    fontWeight: 'bold',
    color: '#5BB052',
  },
  
});

export default SignInScreen;
