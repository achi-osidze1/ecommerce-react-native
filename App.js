import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from './src/components/auth/Auth';
import { HomePage } from './src/components/homepage/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { CartPage } from './src/components/cartpage/CartPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Authorization" component={Auth}/>
        <Stack.Screen name="Products" component={HomePage} />
        <Stack.Screen name="Cart" component={CartPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}