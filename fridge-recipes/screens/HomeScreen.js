import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-black text-3xl font-bold">HomeScreen</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}