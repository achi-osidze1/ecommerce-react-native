import React from 'react'
import { Products } from '../products/Products'
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomePage = () => {
  const navigation = useNavigation();

  const CartPage = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={CartPage} style={styles.button}>
        <Text style={styles.text}>Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
    <Products/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  button:{
    width:35,
    height:35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#0d6efd',
    marginRight:12,
  },
  text:{
    color:"white"
  }
})




