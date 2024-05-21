import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can replace with your desired icon library
import BottomView from './Footer';
import { useNavigation } from '@react-navigation/native';
import HeaderView from './Header';

const ProfilePage = () => {
    const navigation = useNavigation();
    const handleBackButtonPress = () => {
        navigation.goBack();
      };
    
      const toggleSlider = () => {
      
        dispatch(openCart());
      };
    
      const handleCartIconClick  = () => {
        dispatch(openCart());
      };


      const handleAddNewAddress = () => {
        navigation.navigate('AddNewAddress');
    };

 return (
    <View style={styles.container}>
     
     <HeaderView 
       isProfilePage={true}

        handleCartIconClick={handleCartIconClick} 
        toggleSlider={toggleSlider}
         handleBackButtonPress={handleBackButtonPress} 
         />
    
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => console.log('Address')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="address-book-o" size={20} color="green" />
              </View>
              <Text style={styles.iconText}>Address</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('My Order')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="shopping-bag" size={20} color="green" />
              </View>
              <Text style={styles.iconText}>My Order</Text>
            </View>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={() => console.log('Logout')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="sign-out" size={20} color="green" />
              </View>
              <Text style={styles.iconText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>My Address</Text>
          <TouchableOpacity onPress={handleAddNewAddress}>
                <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add New</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
      <BottomView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  iconContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
  },
  iconText: {
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
});

export default ProfilePage;
