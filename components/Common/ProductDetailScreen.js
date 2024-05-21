import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getProducts } from '../Server/Api'; // Importing API functions
import Gallery from './Gallery';
import HeaderView from '../Home/Header';
import { useNavigation } from '@react-navigation/native';
import BottomView from '../Home/Footer';
import { useSelector ,useDispatch } from 'react-redux';
import { addToCart ,fetchCartItems} from '../Server/Api'; // Importing the addToCart function
import { useAuth } from '../AuthContext';
import { Axios } from 'axios';
import { updateCartCount } from '../Redux/Actions/cartActions'; 

const ProductDetailScreen = ({route}) => {
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1); // State variable to  check the product is in the cart
  const { productId } = route.params;
  //const { token } = useAuth(); 
  const navigation = useNavigation();
  const [cartItemCount, setCartItemCount] = useState(0);
  const dispatch = useDispatch(); 
  
const cartItems = useSelector(state => state.root.cart.items);

 

useEffect(() => {
  
 const fetchProduct = async () => {
  try {
    const products = await getProducts(); // Fetching all products
    const foundProduct = products.find(p => p._id === productId);
    if (foundProduct) {
      setProduct(foundProduct);

      const cartData = await fetchCartItems();
    
        const isInCart = cartData.some(item => item.productId._id === productId);
      
        setIsInCart(isInCart);
    } else {
      console.warn('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

    fetchProduct();
  }, [productId]);

  
const handleAddToCart = async () => {
    try {
      
      await addToCart(productId,quantity);
       
      setIsInCart(true); // Calling the addToCart function with the product ID and JWT token
      alert('Product added to cart successfully!');

      
  //location.reload();
    
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };
  
   const handleQuantityChange = (change) => {
    const newQuantity = Math.max(quantity + change, 1); 
    setQuantity(newQuantity);
  };


  const handleBackButtonPress = () => {
    navigation.goBack(); 
  };


  return (
   <View style={{ flex: 1 }}>
   <HeaderView isProductDetailPage={true} handleBackButtonPress={handleBackButtonPress}  />
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: 5 }}>
    {product && (
      <View style={{ padding: 20 }}>
        <Image source={{ uri: product.imageUrl }} style={{ width: '100%', aspectRatio: 4 / 3 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, color: 'black' }}>{product.name}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>{product.description}</Text>
        <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Price: $</Text>{product.price}</Text>
        <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>sale_price: $</Text>{product.sale_price}</Text>
        {/* Gallery */}
        {product.gallery.length > 0 && <Gallery gallery={product.gallery} />}

        {/* Render other product details */}
        <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Calories:</Text> {product.calories}</Text>

        <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Key Features:</Text> {product.keyFeatures}</Text>

        <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Shelf Life:</Text> {product.shelfLife}</Text>
        
        <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Manufacturer Details:</Text> {product.manufacturerDetails}</Text>

        <Text style={{ fontSize: 18, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>License FSSAI:</Text> {product.licenseFSSAI}</Text>

        <Text style={{ fontSize: 18, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Expiry Date:</Text> {product.expiryDate}</Text>

        <Text style={{ fontSize: 18, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Seller:</Text> {product.seller}</Text>

        <Text style={{ fontSize: 18, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Disclaimer: </Text>{product.disclaimer}</Text>
       
      </View>
     )}
  </ScrollView>

  {!isInCart ? (
        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantitySection}>
        <TouchableOpacity onPress={() => handleQuantityChange(-1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange(1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      )}
    <BottomView/>
      </View>
  );
};

const styles = StyleSheet.create({
  addToCartButton: {
    position: 'absolute',
    bottom: 20, // Adjust position as needed
    left: 20, // Adjust position as needed
    backgroundColor: '#5BB052',
    paddingVertical: 16 ,
    paddingHorizontal: 100,
    borderRadius: 10,
    width:"90%",
    // padding:15,
    // margin: 5,
  },
  
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default ProductDetailScreen;
