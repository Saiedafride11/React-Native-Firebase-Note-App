import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/input'
import { spacing } from '../theme/spacing';
import RadioInput from '../components/radioInput';
import Button from '../components/button';
import { addDoc, collection, getDocs, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../App';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActivityIndicator } from 'react-native-web';

const noteColorOption = ['red', 'blue', 'green']

export default function Create({navigation, route, user}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [noteColor, setNoteColor] = useState('blue');
  const [loading, setLoading] = useState(false)

  const onPressCreate = async () => {
    setLoading(true);
      try{
        await addDoc( collection(db, 'notes'), {
              title: title,
              description: description,
              noteColor: noteColor,
              uid: user.uid
        })
        setLoading(false);
        navigation.goBack();
        showMessage({
          message: "Note create a successfully",
          type: "success",
        });
      } catch (error) {
            showMessage({
                  message: error.message,
                  type: "danger",
            });
            setLoading(false)
      }
  }
  return (
    <SafeAreaView style={{marginHorizontal: 20, flex: 1}}>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)}/>
        <Input placeholder="Description" multiline={true} onChangeText={(text) => setDescription(text)}/>

        <View style={{marginTop: 25, marginBottom: 15}}>
              <Text>Select your note color</Text>
        </View>
        {
              noteColorOption.map( (option, index) => (
                <RadioInput
                  key={index}
                  option={option}
                  value={noteColor}
                  setValue={setNoteColor}
                />
        ))}
        {
          loading ? 
          <ActivityIndicator/>
          :
          <Button onPress={onPressCreate} title="Submit" customStyles={{width: "100%", alignSelf: "center", marginTop: 60}}></Button>
        }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})