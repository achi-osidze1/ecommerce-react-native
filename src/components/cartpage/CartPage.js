import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Context from '../Context/Context';

export const CartPage = () => {
  
  const { cartItems } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);

  const ProductPricesSum = () => {

    const sum = cartItems.reduce((total, product) => {
      const price = parseInt(product.original_price);
      return total + price;
    }, 0);
    return sum;
  };

  useEffect(() => {
    const total = ProductPricesSum();
    setTotalAmount(total);
  }, [cartItems]);

  return (
    <><ScrollView contentContainerStyle={styles.container}>
      {cartItems.map((product, index) => (
        <View key={index} style={styles.card}>
          <Image src={product?.thumb_img.files.file} style={styles.image} />
          <Text style={styles.price}>{product?.original_price} ლ</Text>
          <Text style={styles.name}>{product?.name}</Text>
        </View>
      ))}
    </ScrollView>
    <TouchableOpacity style={styles.button}><Text style={styles.totalprice}>Total: {totalAmount} ლ</Text></TouchableOpacity></>
  );
};

const styles = StyleSheet.create({
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

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
  },

  name: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom:10
  },

  button:{
    alignItems: "center",
    backgroundColor: "#0d6efd",
    width: "90%",
    marginHorizontal: "5%",
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 1
  },

  totalprice:{
    color:"white"
  }
});
