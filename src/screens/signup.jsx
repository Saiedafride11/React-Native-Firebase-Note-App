import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/color';
import Button from '../components/button';
import Input from '../components/input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { addDoc, collection, getDocs, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from '../../App';
import RadioInput from '../components/radioInput';


const genderOptions = [ 'Male', 'Female' ]

export default function Signup() {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);
  
  const auth = getAuth();

//   const handleSignup = () => {
//       createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                   const user = userCredential.user;
//                   console.log(user)
//             })
//             .catch((error) => {
//                   const errorCode = error.code;
//                   const errorMessage = error.message;
//             });
//   }
  const handleSignup = async () => {
      setLoading(true);
      try{
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const nameAdd = await updateProfile(auth.currentUser, {displayName: name });
            // updateProfile(auth.currentUser, {
            //       displayName: name
            //   }).then(() => {
            //   }).catch((error) => {
            //   });
            await addDoc( collection(db, 'users'), {
                  name: name,
                  email: email,
                  age: age,
                  gender: gender,
                  uid: result.user.uid
            })
            setLoading(false);
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
      <View style={{paddingHorizontal: 16, paddingVertical: 25}}>
            <Input placeholder="Full Name" autoCapitalize={'words'} onChangeText={(text) => setName(text)}/>
            <Input placeholder="Email address" autoCapitalize={'none'} onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
            <Input placeholder="Age" onChangeText={(text) => setAge(text)}/>

            <View style={{marginVertical: 10}}>
                  <Text>Select gender</Text>
            </View>

            {
              genderOptions.map( (option, index) => (
                <RadioInput
                  key={index}
                  option={option}
                  value={gender}
                  setValue={setGender}
                />
            ))}

            {/* {
                  genderOptions.map( (option) => {
                        const selected = option === gender;
                        return (
                              <Pressable onPress={() => setGender(option)} key={option} style={styles.radioContainer}>
                                    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                          <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}></View>
                                    </View>
                                    <Text style={styles.radioText}>{option}</Text>
                              </Pressable>
                        )
                  })
            } */}
  
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-end"}}>
            <Button onPress={handleSignup} title={"Sign up"} customStyles={{alignSelf: "center", marginBottom: 60}}></Button>
            <Pressable>
                  <Text>ALready have an account? <Text style={{ color: 'green', fontWeight: 'bold', marginLeft: 5}}>Sign in</Text></Text>
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
      }
})