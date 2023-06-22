import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NativeBaseProvider, HStack, Spinner } from 'native-base';
import { ProductsList } from '../productsList/ProductsList';
import Context from '../Context/Context';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setCartItems } = useContext(Context);

  const Products = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.vendoo.ge/api/beta/catalog?url=technics%2Fkompiuteruli-teqnika%2Fnoutbuqebi-da-misi-aqsesuarebi%2Fnoutbuqebi&sort=popular&sortDir=desc&page=1&limit=20`);
      setProducts(response.data.products);
    } catch (error) {
      alert('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Product Added To Cart")
  };

  useEffect(() => {
    Products();
  }, []);


  return (
  <>
    <NativeBaseProvider>
      {loading ? <HStack space={8} flex={1} justifyContent="center"  alignItems="center">
        <Spinner color="emerald.500" />
      </HStack> : loading}
    </NativeBaseProvider>
    <ProductsList products={products} addToCart={handleAddToCart} />
  </>
);
};
