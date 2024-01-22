import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchProduct = ({ route, navigation }) => {
    const { products } = route.params;

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     getAllProduct();
    // }, []);

    // const getAllProduct = () => {
    //     axios
    //         .get('https://dummyjson.com/products')
    //         .then(function (response) {
    //             setProducts(response.data.products);
    //         })
    //         .catch(function (error) {
    //             console.log(error.message);
    //         });
    // };


    const renderProductItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.productItem,
                    //   { backgroundColor: isSelected ? '#e0e0e0' : '#f2f2f2' },
                ]}
                onPress={() => navigation.navigate('Detail', { product: item })}
            >
                <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => navigation.navigate('Detail', { product: item })}

                //   onPress={() => addToCartAndToggleSelection(item)}
                >
                    <Text style={{ color: 'red' }}>Chi tiết</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    if (products.length > 0) {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Sản phẩm tìm kiếm</Text>
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
    }
    else {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Sản phẩm tìm kiếm</Text>
                </View>
                <View style={styles.viewContent}>
                    <Text>Không có sản phẩm</Text>
                </View>
            </ScrollView>
        );

    }
};

const styles = StyleSheet.create({
    viewContent: {
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
      },
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
        // backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SearchProduct;