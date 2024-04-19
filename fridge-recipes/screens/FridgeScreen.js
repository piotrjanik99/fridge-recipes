import { View, TextInput, Text } from 'react-native'
import React from 'react'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function FridgeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">

        <View className="mx-4 space-y-2 mb-2 mt-10">
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">What do you have in</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">your <Text className="text-sky-300 font-bold">fridge</Text>?</Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
            placeholder='put ingredients here!'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"></TextInput>
            <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}></MagnifyingGlassIcon>
            </View>
        </View>

  </SafeAreaView>
  )
}