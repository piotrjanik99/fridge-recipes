import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import axios from 'axios'

export default function FridgeScreen() {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [meals, setMeals] = useState([]);

  const handleSearch = async () => {
    const transformedText = inputValue.trim().toLowerCase().split(',').map(item => item.trim().replace(/\s+/g, '_')).join(',');

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${transformedText}`)
      if(response && response.data) {
        setMeals(response.data)
        console.log(meals)
      }
    } catch(err) {
      console.log('error: ', err.message)
    }
    setInputValue('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">

        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#7dd3fc"/>
        </TouchableOpacity>
        </Animated.View>

        <View className="mx-4 space-y-2 mb-2 mt-10 mt-20">
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
            onChangeText={setInputValue}
            value={inputValue}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"></TextInput>
            <View className="bg-white rounded-full p-3">
            <TouchableOpacity onPress={handleSearch}>
              <MagnifyingGlassIcon size={20} strokeWidth={3} color={'gray'} />
            </TouchableOpacity>
            </View>
        </View>

  </SafeAreaView>
  )
}