import React, {useEffect,useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Header, Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CartSidebar from '../Cart/CartSidebar';
import { fetchCartItems } from '../Server/Api'; 
import { useSelector, useDispatch } from 'react-redux';
import { updateCartCount } from '../Redux/Actions/cartActions'; 
import slider from '../Cart/slider';
import { closeCart, openCart } from '../Redux/Actions/HamActions';


const HeaderView = ({ isHomePage, handleBackButtonPress, isSignupPage , isProductDetailPage,isProfilePage}) => {
  const dispatch = useDispatch(); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHamOpen, setIsHamOpen] = useState(false);
  const navigation = useNavigation(); 
 const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCountAsync = async () => {
      try {
        const itemCount  = await fetchCartItems();
        console.log('jjfetching cart items:', itemCount.length);
        setCartItemCount(itemCount.length);
        dispatch(updateCartCount(itemCount.length));
        await fetchCartItems();
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    updateCartCountAsync();
  }, [cartItemCount]);

  dispatch(updateCartCount(cartItemCount));
   
  const handleCartIconClick = () => {
   setIsCartOpen(!isCartOpen);

    if (!isCartOpen) {
     navigateToCartSidebar(); 
    }
  };
  
  
  const handleCartClick = () => {
    dispatch(openCart());
    setIsHamOpen(!isHamOpen);
    if (!isHamOpen) {
      navigateToSider();
    }
  };
  const handleCloseButtonClick = () => {
    setIsCartOpen(false);
  };

  const navigateToCartSidebar = () => {
    navigation.navigate('CartSidebar'); 
  };
 
 
  const navigateToSider = () => {
    navigation.navigate('slider'); 
  };




  return (
    <View>
      <Header
        containerStyle={styles.headerContainer}
        leftComponent={
          isHomePage ? (
            <View style={styles.leftComponent}>
              <View style={styles.iconContainer}>
                <FontAwesome name="clock-o" size={24} color="white" />
              </View>
              <Text style={styles.deliveryText} numberOfLines={1}>Delivery in 16 minutes</Text>
            </View>
          ) : isSignupPage ? (
            <View style={styles.leftComponent}>
              <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackButtonPress}>
               <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
               
                          </TouchableOpacity>
                          </View>
                          <Text style={styles.title}>Signup</Text>
               
               </View>
            
          )
 : isProductDetailPage ? (
          

<View style={styles.leftComponent}>
<View style={styles.iconContainer}>
<TouchableOpacity onPress={handleBackButtonPress}>
 <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
 
            </TouchableOpacity>
            </View>
            <Text style={styles.title}>ProductDetail</Text>
 
 </View>
     ) :           isProfilePage ? (
            <View style={styles.leftComponent}>
              <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackButtonPress}>
               <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
               
                          </TouchableOpacity>
                          </View>
                          <Text style={styles.title}>Profile</Text>
               
               </View>
            
          ):
          (
           
            <View style={styles.leftComponent}>
<View style={styles.iconContainer}>
<TouchableOpacity onPress={handleBackButtonPress}>
 <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
 
            </TouchableOpacity>
            </View>
            <Text style={styles.title}>Login</Text>
 
 </View>
          ) 

        }
        centerComponent={
           isHomePage ? (
            <View style={styles.centerComponent}>
              <View style={styles.searchBarContainer}>
                <Input
                  placeholder="Search..."
                  inputContainerStyle={styles.inputContainer}
                  rightIcon={<FontAwesome name="search" size={15} color="gray" />}
                />
              </View>
            </View>
             )

            
             //: (
        //       isProductDetailPage ? (
        //          <View>
        //           <Text style={styles.title}>Product Detail</Text>
        //           <TouchableOpacity onPress={handleBackButtonPress}>
        //             {/* <FontAwesome name="angle-left" size={23} color="white" /> */}
        //           </TouchableOpacity>
        //         </View>
         // ) 
          : (
            <View style={styles.centerComponent}>
          {/* {isSignupPage ? <Text style={styles.title}>Sign Up</Text> : <Text style={styles.title}>Login</Text>} */}
            </View> 
          )
          }
                  
        rightComponent={
          <View style={styles.rightComponent}>
               <View style={styles.header}>
                    <TouchableOpacity onPress={handleCartIconClick}>
                    <View style={styles.iconContainer2}>
                       <FontAwesome name="shopping-cart" size={24} color="white" style={styles.icon} />
                       <View style={styles.cartItemCountContainer}>
                            <Text style={styles.cartItemCount}>{cartItemCount}</Text>
                      </View>
                    </View>
                    </TouchableOpacity>
                 {isCartOpen && <CartSidebar />}
               </View>
            <TouchableOpacity onPress={handleCartClick}> 
              <View style={styles.iconContainer2}>
                <FontAwesome name="bars" size={24} color="white" style={styles.icon} />
              </View>
            </TouchableOpacity>
            {isCartOpen && <slider />}
          </View>
        }
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#5BB052',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    height: '90%',
    width: 'auto',
  },
  deliveryText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 9,
  },
  centerComponent: {
    marginLeft: 0,
  },
  
  cartItemCountContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCount: {
    color: 'white',
    fontSize: 12,
  },
  iconContainer2: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 7,
  }, 
  iconContainer: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 15,
  },

  rightComponent: {
    flexDirection: 'row',
  },
  leftComponent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
 
  icon: {
    marginHorizontal: 6,
    paddingTop: 10,
  },
  searchBarContainer: {
    width: width * 0.9,
    paddingTop: 60,
    paddingBottom: 1,
  },
  inputContainer: {
    borderBottomWidth: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    Width: 'full',
    height: 50,
  },
});

export default HeaderView;
