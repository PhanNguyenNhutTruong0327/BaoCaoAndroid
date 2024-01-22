import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Login from './src/Login';
import Detail from './src/Product/Detail';
import Cart from './src/Cart';
import Register from './src/Register';
import SearchProduct from './src/SearchProduct';
import Pay from './src/Pay';
import ProductCategory from './src/ProductCategory';
import Account from './src/Account';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="ProductCategory" component={ProductCategory} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});