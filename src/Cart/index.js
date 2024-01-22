import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);
        setCartItems(parsedCartItems);
      }
    } catch (error) {
      console.log('Error retrieving cart items:', error);
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);

        const updatedCartItems = parsedCartItems.filter(item => item.id !== itemId);

        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log('Error removing cart item:', error);
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    console.log(updatedCart);

    // // Lưu giỏ hàng mới vào AsyncStorage
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);

  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Lưu giỏ hàng mới vào AsyncStorage
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);

  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        {/* <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text> */}
        <View style={styles.actionButtons}>
          <View style={styles.action}>
            <View style={styles.congtru}>
              <TouchableOpacity
                onPress={() => handleDecreaseQuantity(item.id)}
              >
                <AntDesign name="minus" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <View style={styles.congtru}>
              <TouchableOpacity
                onPress={() => handleIncreaseQuantity(item.id)}
              >
                <AntDesign name="plus" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => removeCartItem(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (cartItems.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total:</Text>
          <Text style={styles.Price}>${calculateTotalPrice()}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Pay')} style={styles.payButton}>
          <Text style={styles.payButtonText}>Thanh toán </Text>
        </TouchableOpacity>

      </View>
    );

  }
  else {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Giỏ hàng</Text>
        </View>
        <View style={styles.viewContent}>
          <Text style={{ marginBottom: 5 }}>Hiện không có sản phẩm !</Text>
          <TouchableOpacity style={styles.payAddPro} onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>Thêm sản phẩm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Price: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    width: 100,
    height: 25,
  },

  actionButtons: {
    marginTop: 10,
    justifyContent: 'space-around',
    height: 20,
  },




  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  viewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  payButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    // margin:'40 0'
  },
  payAddPro: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    width: '30%',
    // margin:'40 0'
  },
  removeButtonText: {
    color: '#fff',
  },
  payButtonText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5
  },

});

export default Cart;