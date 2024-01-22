import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TabBar = () => {

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('home');

  const navigationTab = (text, tab) => {
    setActiveTab(text);
    navigation.navigate(tab);
  }


  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigationTab('home','Home')}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={24}
          color={'gray'}
        />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setActiveTab('notification')}
      >
        <Ionicons
          name={activeTab === 'notification' ? 'notifications' : 'notifications-outline'}
          size={24}
          color={'gray'}
        />
        <Text style={styles.tabText}>Thông báo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigationTab('cart','Cart')}
      >
        <Ionicons
          name={activeTab === 'cart' ? 'cart' : 'cart-outline'}
          size={24}
          color={'gray'}
        />
        <Text style={styles.tabText}>Giỏ hàng</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigationTab('account','Account')}
      >
        <Ionicons
          name={activeTab === 'account' ? 'person' : 'person-outline'}
          size={24}
          color={'gray'}
        />
        <Text style={styles.tabText}>Tài khoản</Text>
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingVertical: 8,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TabBar;