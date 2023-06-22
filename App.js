import React, { useState } from 'react';
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from './src/components/auth/Auth';
import { HomePage } from './src/components/homepage/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { CartPage } from './src/components/cartpage/CartPage';
import Context from './src/components/Context/Context';

const Stack = createStackNavigator();

export default function App() {
  
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Context.Provider value={{ cartItems, setCartItems, user, setUser }}>
        <Stack.Navigator>
          <Stack.Screen name="Authorization" component={Auth}/>
          <Stack.Screen name="Products" component={HomePage} />
          <Stack.Screen name="Cart" component={CartPage}/>
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}