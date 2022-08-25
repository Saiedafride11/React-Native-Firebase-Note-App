import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

export default function RadioInput({option, value, setValue}) {
const selected = option === value;
  return (
      <Pressable onPress={() => setValue(option)} style={styles.radioContainer}>
            <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                  <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}></View>
            </View>
            <Text style={styles.radioText}>{option}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create({
      radioContainer: {
            flexDirection: "row",
            alignItems: 'center',
            marginBottom: 10
      },
      outerCircle: {
            height: 30,
            width: 30,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#cfcfcf',
            justifyContent: 'center',
            alignItems: 'center',
      },
      innerCircle: {
            height: 15,
            width: 15,
            borderRadius: 7.5,
            borderWidth: 1,
            borderColor: '#cfcfcf',
      },
      radioText: {
            marginLeft: 10,
            fontWeight: 'bold'
      },
      selectedOuterCircle: {
            borderColor: "orange"
      },
      selectedInnerCircle: {
            backgroundColor: "orange",
            borderColor: "orange"
      }
})