import React,{useContext} from 'react'
import { Products } from '../products/Products'
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Context from '../Context/Context';

export const HomePage = () => {
  const navigation = useNavigation();
  const { user } = useContext(Context)

  const CartPage = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>Hello {user.user_name} {user.user_surname}</Text>
      <TouchableOpacity onPress={CartPage} style={styles.button}><Text style={styles.text}>Cart</Text></TouchableOpacity>
    </SafeAreaView>
    <Products/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems:"center",
    margin:5,
  },

  button:{
    width:35,
    height:35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#0d6efd',
  },
  
  text:{
    color:"white"
  }
})




