import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
// import StarRating from 'react-native-star-rating';

const Detail = ({ route ,navigation }) => {
  const { product } = route.params;
  const [listPro, setListPro] = useState([]);
  const nameCat = product.category;
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getAllProduct();
  }, [product.id]);


  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Dữ liệu trong AsyncStorage đã được xóa thành công');
    } catch (error) {
      console.error('Lỗi xóa dữ liệu trong AsyncStorage:', error);
    }
  };

  const addToCart = async (selectedProducts) => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];
      // console.log(existingCartItems);
      if (existingCartItems) {
        cartItems = JSON.parse(existingCartItems);
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingProductIndex = cartItems.findIndex(
        (item) => item.id === selectedProducts.id
      );
      console.log(existingProductIndex);
      if (existingProductIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
        cartItems[existingProductIndex].quantity += 1;
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
        const newProduct = {
          ...selectedProducts,
          quantity: 1,
        };
        cartItems.push(newProduct);
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Products added to cart:', cartItems);

    } catch (error) {
      console.log('Error adding products to cart:', error);
    }

  };


  const handleRatingChange = (value) => {
    setRating(value);
  };

  const ListProCat = (listPro, nameCat) => {
    const filteredProducts = listPro.filter((product) =>
      product.category.toLowerCase().includes(nameCat.toLowerCase())
    );
    const filteredProductsExceptCurrent = filteredProducts.filter(
      (pro) => pro.id !== product.id
    );
    setListPro(filteredProductsExceptCurrent);
  }

  const getAllProduct = () => {
    axios
      .get('https://dummyjson.com/products')
      .then(function (response) {
        const listPro = response.data.products;
        ListProCat(listPro, nameCat);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => navigation.navigate('Detail', { product: item })}
      >
        <Image source={{ uri: item.images[0] }} style={styles.productImageOther} />
        <Text style={styles.productNameOther}>{item.title}</Text>
        <Text style={styles.productPriceOther}>{item.price}</Text>
        <TouchableOpacity
          style={styles.cartButtonOther}
          onPress={() => navigation.navigate('Detail',{ product: item })}
        >
          <Text>Chi tiết</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>Giá : {product.price}</Text>
      <Text style={styles.productDescription}>Chi tiết : {product.description}</Text>
      <TouchableOpacity style={styles.cartButton} onPress={() => addToCart(product)}>
        {/* <Icon name="shopping-cart" size={24} color="white" /> */}
        <Text style={{ color: '#FFFFFFCC' }}>Mua ngay</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>Đánh giá:</Text>
      <Rating style={styles.rating}
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={handleRatingChange}
        starSize={24}
        fullStarColor="gold"
        emptyStarColor="gold"
      />
      <ScrollView contentContainerStyle={styles.containerScorllView}>
        <View style={styles.header}>
          <Text style={{fontSize:20}}>Sản phẩm cùng loại</Text>
        </View>
        <View style={styles.productList}>
          <FlatList
            data={listPro}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 5,
    paddingBottom: 20,
  },

  productNameOther: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPriceOther: {
    fontSize: 14,
    color: '#888',
  },

  productImageOther: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: 'cover',
  },

  productItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: '1%',
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },

  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  containerScorllView: {
    // flexGrow: 1, 
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFFCC'
  },
  rating: {
    marginTop: 10
  }
});

export default Detail;