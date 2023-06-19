import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Stack, NativeBaseProvider } from 'native-base'
import { StyleSheet, SafeAreaView, Text, View } from 'react-native'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError] = useState('')
  const navigation = useNavigation()

  const handleSubmit = (e) => {
    setError('')

    if(!email || !password){
      setError('Please Fill Your Information')
      return
    }

    else if(password.length < 7){
      setError('Password Must Contain Minimum 8 Characters')
      return
    }

    else{
      navigation.replace('Products')
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <View style={styles.loginContainer}>
          <Text style={styles.text}>Sign In To Continue</Text>
          <Stack style={styles.stack} space={4} w="75%" maxW="300px" mx="auto">
            <Input variant="underlined" placeholder="Enter Email" value={email} onChangeText={setEmail}/>
            <Input variant="underlined" placeholder="Enter Password" value={password} onChangeText={setPassword} />
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

