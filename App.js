import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Create from './src/screens/create';
import Signup from './src/screens/signup';
import Signin from './src/screens/signin';
import FlashMessage from "react-native-flash-message";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Update from './src/screens/update';

const firebaseConfig = {
  apiKey: "AIzaSyCZKsJrbStxvkKaz5z-9-3yfoewSmjtjgY",
  authDomain: "acc-note-app-58fdb.firebaseapp.com",
  projectId: "acc-note-app-58fdb",
  storageBucket: "acc-note-app-58fdb.appspot.com",
  messagingSenderId: "903579234402",
  appId: "1:903579234402:web:d4e53f63dc54139830a13b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff"
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState(null);

  // useEffect(() => {
  //   signOut(auth);
  // }, [])

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
        setLoading(false);
      } else{
        setUser(null)
        setLoading(false);
      }

      return authSubscription;
    })
  }, [])

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="blue" size="large"/>
      </View>
    )
  }
  return (
    <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          {
            user ? 
            <>
              <Stack.Screen name="Home" options={{headerShown : false}}>
                  { (props) => <Home {...props} user={user}/> }
              </Stack.Screen>
              <Stack.Screen name="Update" component={Update} options={{headerShown : false}}/>
              <Stack.Screen name="Create" options={{headerShown : false}}>
                  { (props) => <Create {...props} user={user}/> }
              </Stack.Screen>
            </>
            :
            <>
              <Stack.Screen name="Signin" component={Signin} options={{headerShown : false}}/>
              <Stack.Screen name="Signup" component={Signup} options={{headerShown : false}}/>
            </>
          }
        </Stack.Navigator>
        <FlashMessage position="top"/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
