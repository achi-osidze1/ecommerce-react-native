import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ProductsList } from '../productsList/ProductsList'
import { HStack, Spinner, NativeBaseProvider } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';

export const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([]);

  const CallProducts = async (e) => {
    setLoading(true)
    try{
      const response = await axios.get(`https://api.vendoo.ge/api/beta/catalog?url=technics%2Fkompiuteruli-teqnika%2Fnoutbuqebi-da-misi-aqsesuarebi%2Fnoutbuqebi&sort=popular&sortDir=desc&page=4&limit=20`)
      setProducts(response.data.products);
    }catch (error) {
      alert("Error:", error);
    }finally{
      setLoading(false)
    }
  }

  const addToCart = async (product) => {
    try{
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Product Added To Cart');
    }catch (error) {
      alert('Error', error);
    }
  }
    
  const loadCart = async () => {
    try{
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData !== null) {
        setCart(JSON.parse(cartData));
      }
    }catch (error) {
      alert('Error', error);
    }
  };

  useEffect(() => {
    CallProducts()
    loadCart()
  },[])


  return (
    <>
    <NativeBaseProvider>
      {loading ? <HStack space={8} flex={1} justifyContent="center"  alignItems="center">
        <Spinner color="emerald.500" />
      </HStack> : loading}
    </NativeBaseProvider>
    <ProductsList products={products} addToCart={addToCart} />
    </>
  )
}
