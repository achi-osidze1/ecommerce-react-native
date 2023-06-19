import React from 'react'
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native'

export const ProductsList = (props) => {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        {props.products.map((product, index) => {
          return (
            <View key={index} style={styles.card}>
              <Image src={product?.thumb_img.files.file} style={styles.image} />
              <Text style={styles.price}>{product?.original_price} ლ</Text>
              <Text numberOfLines={2} style={styles.name}>{product?.name}</Text>
              <TouchableOpacity style={styles.button} onPress={() => props.addToCart(product)}><Text>Add To Cart</Text></TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  card: {
    width: "45%",
    borderWidth:1,
    margin:10,
    borderRadius:10,
    borderColor:"#ededed",
    backgroundColor:"white"
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
  },

  name: {
    fontSize: 15,
    marginLeft:10
  },
  button:{
    backgroundColor:"rgb(234 236 252)",
    width:100,
    height:30,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:42,
    marginTop:10,
    marginBottom:10,
    borderRadius:5,
  }
});