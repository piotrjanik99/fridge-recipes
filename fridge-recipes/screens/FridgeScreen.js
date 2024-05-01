import { View, TextInput, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import axios from 'axios'
import MasonryList from '@react-native-seoul/masonry-list'

export default function FridgeScreen() {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [meals, setMeals] = useState([]);

  const handleSearch = async () => {
    const ingredients = inputValue.trim().toLowerCase().split(',').map(item => item.trim().replace(/\s+/g, '_')).join(',');

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredients}`)
      if(response && response.data) {
        setMeals(response.data.meals)
      }
    } catch(err) {
      console.log('error: ', err.message)
    }
    setInputValue('');
  };

  const RecipeCard = ({item, index, navigation}) => {
    let isEven = index%2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable 
            style={{width: '100%', paddingLeft: isEven ? 16 : 8, paddingRight: isEven ? 8 : 16}}
            className="flex justify-center mb-4 space-y-1"
            onPress={() => navigation.navigate('RecipeDetails', {...item})}>
                <Image 
                source={{uri: item.strMealThumb}}
                style={{width: '100%', height: index%3==0 ? hp(25) : hp(35), borderRadius: 35}}
                className="bg-black/5" />
                <Text style={{fontSize: hp(1.5)}} className="font-semibold ml-2 text-neutral-600">
                {
                item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                }
                </Text>
            </Pressable>
        </Animated.View>
    )
}

  return (
    <SafeAreaView className="flex-1 bg-white">

        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14 ">
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

        <View className="mb-5 mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
            placeholder='put ingredients here!'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            onChangeText={setInputValue}
            value={inputValue}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"></TextInput>
            <View className="bg-white rounded-full p-3">
            <TouchableOpacity onPress={inputValue.length > 0 ? handleSearch : null}>
              <MagnifyingGlassIcon size={20} strokeWidth={3} color={'gray'} />
            </TouchableOpacity>
            </View>
        </View>
        
          {
            meals?.length == 0 ? (
              <Text className="font-bold text-neutral-600 mx-4" style={{ marginTop: -8 }}>please separate the ingredients by commas</Text>
            ) : (
                <MasonryList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                onEndReachedThreshold={0.1}/>
            )
          }

  </SafeAreaView>
  )
}