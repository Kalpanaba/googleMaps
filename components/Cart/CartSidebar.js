import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { deleteCartItem ,getUserIdFromToken, updateCartItem,fetchCartItems} from '.././Server/Api';


const token = sessionStorage.getItem('token');


const CartSidebar = () => {  
    
  useEffect(() => {
    fetchCartItems(token)
      .then(data => setCartItems(data)) 
      .catch(error => console.error('Error setting cart items:', error));
  }, [token]);

  const [isOpen, setIsOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();

  const handleCloseCart = () => {
    setIsOpen(false);
   navigation.navigate('Home');
  };

  useEffect(() => {
    console.log('hahaha',isOpen); // This will log the updated value of isOpen
  }, [isOpen]);

  const handleQuantityChange = (productId, quantity) => {
    try {
      updateCartItem(productId, quantity)
        .then(() => {
          fetchCartItems(token).then(data => setCartItems(data));
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
    } catch (error) {
      console.error('Error updating quantity:', error);
    } 
  };

  const handleDeleteItem = async (productId) => {
    try {
      const userId = getUserIdFromToken(token);
      await deleteCartItem(userId, productId);
      console.log('Product deleted successfully');
      fetchCartItems(token).then(data => setCartItems(data));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };
     
  return (
    <View style={[styles.container, isOpen ? styles.show : styles.hide]}>
    
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart</Text>
          {/* <TouchableOpacity onPress={handleCloseCart}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.separator} />
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.productId._id} style={styles.itemContainer}>
              <Image source={{ uri: item.productId.imageUrl }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.productId.name}</Text>
                <Text style={styles.calories}>{item.productId.calories}</Text>
                <View style={styles.priceSection}>
                  <Text style={styles.salePrice}> ${item.productId.sale_price}</Text>
                  <Text style={styles.price}> ${item.productId.price}</Text>
                </View>
                <View style={styles.quantitySection}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.productId._id, item.quantity - 1)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.productId._id, item.quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleDeleteItem(item.productId._id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        )}
      </View>
      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    // shadowColor: '#000',
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    //elevation: 5, // For Android shadow
  },
  content: {
    padding: 16,
    paddingBottom: 80, // Adjusted to accommodate the Proceed button
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: '#888',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calories: {
    marginBottom: 5,
  },
  priceSection: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  salePrice: {
    textDecorationLine: 'line-through',
     marginRight: 10,
 
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-end', // Aligning quantity buttons to the right
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5, // Adjusted for spacing between buttons
  },
  quantity: {
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  deleteText: {
    fontSize: 20,
    color: '#888',
  },
  emptyText: {
    color: '#888',
  },
  proceedButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    textAlign:'center',
    transform: [{ translateX: '-50%' }],
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:'90%'
  },
  proceedText: {
    color: 'white', 
    fontWeight: 'bold',
  },
});

export default CartSidebar;
