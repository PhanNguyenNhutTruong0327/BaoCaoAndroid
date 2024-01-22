import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState([]);


  const [cartItemCount, setCartItemCount] = useState(0);

  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateSearch = (products) => {
    // console.log(products);
    navigation.navigate('SearchProduct', { products: products });
  };

  useEffect(() => {
    getAllProduct();

  }, []);

  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      const cartItems = JSON.parse(existingCartItems);
      const itemCount = cartItems ? cartItems.length : 0;
      console.log(itemCount);
      setCartItemCount(itemCount);
    } catch (error) {
      console.log( error);
    }
  }

  useEffect(() => {
    getCartItems();
  }, [cartItemCount]);

  const handleSearch = () => {
    // console.log(searchInput)
    const pro = products.products;
    // console.log(pro);
    const filteredProducts = pro.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    // console.log(filteredProducts);
    navigateSearch(filteredProducts);
  };


  const getAllProduct = () => {
    axios
      .get('https://dummyjson.com/products')
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <TouchableOpacity style={styles.searchButton}
        onPress={handleSearch}>

        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>


      <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
        <Ionicons name="cart" size={24} color="white" />
        {/* {cartItemCount > 0 && <Text style={styles.cartItemCount}>{cartItemCount}</Text>} */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    backgroundColor: '#f2f2f2',

  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartButton: {
    backgroundColor: '#FF6600',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  cartItemCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: 'bold', // Chỉnh kiểu chữ đậm
    textAlign: 'center', // Căn giữa nội dung
    minWidth: 16, // Đảm bảo số sản phẩm hiển thị có kích thước tối thiểu
  },
});

export default Search;