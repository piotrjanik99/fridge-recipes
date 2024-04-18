import { View, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading(props) {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props}></ActivityIndicator>
    </View>
  )
}