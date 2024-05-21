import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderView from './components/Home/Header';
import BannerView from './components/Home/Banner';
import BottomView from './components/Home/Footer';
import ProductsView from './components/Home/Product';
import AllProductsScreen from './components/Home/AllProductsScreen';
import ProductDetailScreen from './components/Common/ProductDetailScreen';
//import CartSlider from './components/Cart/CartSlider';
import CartSidebar from './components/Cart/CartSidebar';
import ProfilePage from './components/Home/ProfilePage';
import SignInScreen from './components/Home/SignIn';
import store from './components/Redux/Store';
import rootReducer from './components/Redux/rootReducer';
import SignupComponent from'./components/Home/SignUp';
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch
import { openCart, closeCart } from './components/./Redux/ReduxSlice/cartSlice';
import { AuthProvider } from './components/AuthContext';
import slider from './components/Cart/slider';
import AddNewAddress from "./components/Home/AddNewAddressScreen";


//const store = createStore(rootReducer);

const Stack = createStackNavigator();
//const dispatch = useDispatch()
export default function App() {
  

  return (
    <Provider store={store}>
      <AuthProvider>
      <ThemeProvider>
        <SafeAreaProvider style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* <HeaderView /> */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <NavigationContainer>
                
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => true }}  />
                  <Stack.Screen name="ProductsView" component={ProductsView} />
                  <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
                  <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}options={{ headerShown: false }}/>
                  <Stack.Screen name="Login" component={SignInScreen} options={{ headerShown: false }} />
                   <Stack.Screen name="SignUp" component={SignupComponent} options={{ headerShown: false }} />
                   <Stack.Screen name="CartSidebar" component={CartSidebar}  />
                   <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
                   <Stack.Screen name="slider" component={slider}  />
                   <Stack.Screen name='AddNewAddress' component={AddNewAddress}/>
                </Stack.Navigator>
                
              </NavigationContainer>
            </ScrollView> 
                
          </View>
        </SafeAreaProvider>
      </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

function HomeScreen() {
  const dispatch = useDispatch(); 
  const toggleSlider = () => {
    
    dispatch(openCart());
    //dispatch(closeCart());
  };

  const handleCartIconClick  = () => {
    dispatch(openCart());
  };
  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
     {/* <HeaderView isHomePage={true} handleCartIconClick={handleCartIconClick} toggleSlider={toggleSlider} /> */}
     {/* <HeaderView  isHomePage={true}   isSignupPage={false} handleCartIconClick={handleCartIconClick} toggleSlider={toggleSlider} handleBackButtonPress={handleBackButtonPress} /> */}
     <HeaderView
        isHomePage={true}
        isSignupPage={false}
        handleCartIconClick={handleCartIconClick}
        toggleSlider={toggleSlider}
        handleBackButtonPress={handleBackButtonPress}
      />

      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <BannerView />
        <View>
        {/* <ProductsView /> */}
        <ProductsView navigation={navigation} />
        </View>  
      
      </ScrollView>
       <BottomView/>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  homeContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});
