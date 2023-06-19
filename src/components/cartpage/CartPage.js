import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const ProductPricesSum = () => {
    const sum = cart.reduce((total, product) => {
      const price = parseInt(product.original_price);
      return total + price;
    }, 0);
    return sum;
  };

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if(cartData !== null) {
        setCart(JSON.parse(cartData));
        const total = ProductPricesSum();
        setTotalAmount(total);
      }
    } catch (error) {
      alert('Error', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const total = ProductPricesSum();
    setTotalAmount(total);
  }, [cart]);

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      {cart.map((product, index) => (
        <View key={index} style={styles.card}>
          <Image src={product?.thumb_img?.files?.file} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.price}>{product?.original_price} ლ</Text>
            <Text style={styles.name}>{product?.name}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
    <TouchableOpacity style={styles.amount}><Text>Total: {totalAmount} ლ</Text></TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  amount:{
    alignItems:"center"
  },

  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  card: {
    width: "90%",
    borderWidth:1,
    margin:10,
    borderRadius:10,
    borderColor:"#ededed",
    backgroundColor:"white",
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },

  details:{
    width:"100%",
    borderRadius:10,
    marginTop:10,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
  },

  name: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom:10
  }
});