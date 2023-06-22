import React, { useState, useEffect,useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Stack, NativeBaseProvider } from 'native-base'
import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../Context/Context';


export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const navigation = useNavigation();
  const { setUser } = useContext(Context);

  const handleSubmit = async () => {
    try {
      setError('');

      if (!email || !password) {
        setError('Please Fill Your Information');
        return;
      }

      const response = await axios.post(
        'https://accounts.tnet.ge/api/ka/user/auth',
        {
          Email: email,
          Password: password
        }
      );

      const token = response?.data?.data?.access_token;
      const userInfo = response?.data?.data?.Data;

      setUser(userInfo);
      setAccessToken(token);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      navigation.replace('Products');
    } catch (e) {
      setError(e.response.data.message.error_data._error[0]);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');

      if(user) {
        setUser(JSON.parse(user));
      }

      if(token) {
        setAccessToken(token);
      }
    };

    getData();
  }, [accessToken]);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <View style={styles.loginContainer}>
          <Text style={styles.text}>Sign In To Continue</Text>
          <Stack style={styles.stack} space={4} w="75%" maxW="300px" mx="auto">
            <Input variant="underlined" placeholder="Enter Email" value={email} onChangeText={setEmail}/>
            <Input type='password' variant="underlined" placeholder="Enter Password" value={password} onChangeText={setPassword} />
            <Button onPress={handleSubmit} style={styles.button}>Sign In</Button>
            <Text style={styles.error}>{error}</Text>
          </Stack>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center"
  },

  text:{
    textAlign:"center"
  },

  stack:{
    marginTop: 10,
    borderColor:"#0d6efd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
  },

  button: {
    backgroundColor: '#0d6efd',
  },
  
  error:{
    color:"red",
    textAlign:"center"
  }
});