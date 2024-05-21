import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '.././Redux/Actions/RegisterAction';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import HeaderView from './Header';

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const registrationMessage = useSelector(state => state.registrationMessage);
  const error = useSelector(state => state.error);

  const handleRegister = () => {
    dispatch(register({ email, password, pinCode }));
  };

  const navigation = useNavigation();
  
  const handleSignInLinkPress = () => {
    navigation.navigate('Login');
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
      isSignupPage={true}
       handleCartIconClick={handleCartIconClick}
        toggleSlider={toggleSlider}
         handleBackButtonPress={handleBackButtonPress} 
         />

      <View style={styles.inputContainer}> 
      <View style={styles.gap}></View> 
       <Text style={styles.label}>Email:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="email"
        />
      </View>
      <View style={styles.inputContainer}>
      <View style={styles.gap}></View> 
      <Text style={styles.label}>Password:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCompleteType="password"
        />
      </View>
      <View style={styles.inputContainer}>
      <View style={styles.gap}></View> 
      <Text style={styles.label}>Pin Code:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          value={pinCode}
          onChangeText={setPinCode}
          secureTextEntry
          autoCompleteType="password"
        />
      </View>
      {/* <View style={styles.gap}></View> 
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text>Remember me</Text>
      </View> */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
          <Text style={styles.signUpButtonText}>Register</Text>
        </TouchableOpacity>
        {registrationMessage && <Text>{registrationMessage}</Text>}
        {error && <Text>Error: {error.message}</Text>}
        <View style={styles.bottomTextContainer}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={handleSignInLinkPress}>
            <Text style={styles.signinLink}>Login now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  gap: {
    height: 20, // Add a gap of 20 units
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 40,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  signUpButton: {
    backgroundColor: '#5BB052',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gap: {
    height: 20, // Add a gap of 20 units
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinLink: {
    fontWeight: 'bold',
    color:'#5BB052',
    alignItems: 'bottom ',
  },
});

export default SignupComponent;
