import { StyleSheet, Text, View, SafeAreaView, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, query, where, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../App';
import { signOut } from 'firebase/auth';

// useEffect(() => {
//     signOut(auth);
//    }, [])



export default function Home({ navigation, route, user}) {
  const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(true);


  useEffect( () => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach( (doc) => {
        list.push({...doc.data(), id: doc.id});
      })
      setNotes(list);
      setLoading(false);
    })
    return notesListenerSubscription;
  }, [])

  const renderItem = ({item}) => {
    const { title, description, noteColor, id } = item;
    return (
      <Pressable onPress={ () => navigation.navigate("Update", {item})} style={[styles.detailsPress, {backgroundColor: noteColor}]}>
          <Pressable onPress={ () => deleteDoc(doc (db, "notes", id))}style={{position: "absolute", alignSelf: 'flex-end', zIndex: 4}}>
            <AntDesign name="delete" size={24} color="white" />
          </Pressable>
          <Text style={{color: "white", fontSize: 24}}>{title}</Text>
          <Text style={{color: "white", fontSize: 18, marginTop: 16}}>{description}</Text>
      </Pressable>
    )
  }

  const onPressCreate = () => {
    navigation.navigate("Create")
  }
 
  if(loading){
    return (
      <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={{flex : 1}}>
      <View style={{flexDirection: "row", justifyContent: "space-between", padding: 20}}>
        <Text>Hello <Text style={{color: "orange", textTransform: "capitalize"}}>{user.displayName || "user"}</Text></Text>
        <Pressable onPress={() => signOut(auth)}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between", padding: 20}}>
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}>
            <AntDesign name="pluscircleo" size={24} color="black"/>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={{padding: 20}}
        data={notes}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  detailsPress: {
    height: 60,
    marginBottom: 25,
    borderRadius: 16,
    padding: 15
  }
})