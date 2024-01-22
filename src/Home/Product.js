import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Product = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    axios
      .get('https://dummyjson.com/products')
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  // const addToCart = async (selectedProducts) => {
  //   try {
  //     const existingCartItems = await AsyncStorage.getItem('cartItems');
  //     let cartItems = [];

  //     if (existingCartItems) {
  //       cartItems = JSON.parse(existingCartItems);
  //     }

  //     cartItems.push(...selectedProducts);

  //     await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

  //     console.log('Products added to cart:', cartItems);
  //   } catch (error) {
  //     console.log('Error adding products to cart:', error);
  //   }
  // };
  const addToCart = async (selectedProducts) => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];

      if (existingCartItems) {
        cartItems = JSON.parse(existingCartItems);
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingProductIndex = cartItems.findIndex(
        (item) => item.id === selectedProducts[0].id
      );

      if (existingProductIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
        cartItems[existingProductIndex].quantity += 1;
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
        const newProduct = {
          ...selectedProducts[0],
          quantity: 1,
        };
        cartItems.push(newProduct);
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Products added to cart:', cartItems);

      updateCartItemsCount();
    } catch (error) {
      console.log('Error adding products to cart:', error);
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const addToCartAndToggleSelection = (item) => {
    addToCart([item]);
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item.id]);
  };

  const renderProductItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.productItem,
          { backgroundColor: isSelected ? '#e0e0e0' : '#f2f2f2' },
        ]}
        onPress={() => navigation.navigate('Detail', { product: item })}
      >
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCartAndToggleSelection(item)}
        >
          <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sản phẩm</Text>
      </View>
      <View style={styles.productList}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productItem: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: '1%',
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Product;