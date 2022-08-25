import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { spacing } from '../theme/spacing'

export default function Input({placeholder, onChangeText, autoCapitalize, multiline, value}) {
  return (
    <View>
       <TextInput 
          placeholder={placeholder}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          style={styles.input}
          multiline={multiline}
          value={value}
        />
    </View>
  )
}

const styles = StyleSheet.create({
      input: {
            height: 48,
            paddingHorizontal: spacing[2],
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginBottom: spacing[6]
      }
})