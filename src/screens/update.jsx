import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react';
import Input from '../components/input';
import RadioInput from '../components/radioInput';
import Button from '../components/button';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActivityIndicator } from 'react-native-web';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../App';

const noteColorOption = ['red', 'blue', 'green']

export default function Update({navigation, route, user}) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.noteColor);
  const [loading, setLoading] = useState(false)

  const onPressUpdate = async () => {
    setLoading(true);
      try{
        await updateDoc(doc(db, 'notes', noteItem.id), {
          title: title,
          description: description,
          noteColor: noteColor
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
        <Input placeholder="Title" value={title} onChangeText={(text) => setTitle(text)}/>
        <Input placeholder="Description" value={description} multiline={true} onChangeText={(text) => setDescription(text)}/>

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
          <Button onPress={onPressUpdate} title="Submit" customStyles={{width: "100%", alignSelf: "center", marginTop: 60}}></Button>
        }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})