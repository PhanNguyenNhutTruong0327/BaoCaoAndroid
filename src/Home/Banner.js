import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

const Banner = () => {
  const images = [
    { id: 1, source: require('../../assets/images/slider.jpg') },
    { id: 2, source: require('../../assets/images/slider1.jpg') },
    { id: 3, source: require('../../assets/images/slider3.jpg') },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.source} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={5000}
        autoplayLoop
        data={images}
        renderItem={renderItem}
        index={0}
      />
      <Image source={require('../../assets/images/slider1.jpg')}  style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    // alignItems: 'center',
    marginBottom:10
  },
  slide: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Banner;