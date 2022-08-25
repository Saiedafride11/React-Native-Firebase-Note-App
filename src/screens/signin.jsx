import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react';
import { spacing } from '../theme/spacing'
import { colors } from '../theme/color'
import Button from '../components/button';
import Input from '../components/input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function Signin({ navigation}) {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(true);

      const auth = getAuth();

      const handleLogin = () => {
            // setLoading(true);
            try{
                  signInWithEmailAndPassword (auth, email, password)
                  .then( res => {
                        console.log("Signin successful", res)
                  }).catch( error => {
                        showMessage({
                              message: error.message,
                              type: "danger",
                        });
                        setLoading(false);
                  })
            } catch (error) {
                  showMessage({
                        message: error.message,
                        type: "danger",
                  });
                  setLoading(false);
            }       
        }
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Image resizeMode="contain" style={{height: 180}} source={require('../../assets/login.png')}/>
      <Text preset="h6" style={styles.neverForget}>Never forget your Notes</Text>
      <View style={{paddingHorizontal: 16, paddingVertical: 25}}>
            {/* <TextInput placeholder="Email address" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} /> */}
            <Input placeholder="Email address" autoCapitalize={'none'} onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-end"}}>
            {/* { error && <Text style={{ color: 'red', marginTop: 10}}>{error}</Text> } */}
            {/* {
                  loading ? 
                        <ActivityIndicator/>
                  :
                  <Button onPress={handleLogin} title="Login" customStyles={{alignSelf: "center", marginBottom: 60}}></Button>
            } */}
            <Button onPress={handleLogin} title="Login" customStyles={{alignSelf: "center", marginBottom: 60}}></Button>
            <Pressable onPress={() => {navigation.navigate('Signup')}}>
                  <Text>Don't have an account? <Text style={{ color: 'green', fontWeight: 'bold', marginLeft: 5}}>Sign up</Text></Text>
            </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
      neverForget: {
            fontSize: spacing[5],
            fontWeight: "bold",
            textAlign: "center"
      },
      // input: {
      //       height: 48,
      //       paddingHorizontal: spacing[2],
      //       borderBottomColor: '#ccc',
      //       borderBottomWidth: 1,
      //       marginBottom: spacing[6]
      // }
})