import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon, ClockIcon } from 'react-native-heroicons/solid';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function RecipeDetailsScreen(props) {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal)
  }, [])

  const getMealData = async (id)=> {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`)
      if(response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch(err) {
      console.log('error: ', err.message)
    }
  }

  const ingredientsIndexes = (meal) => {
    if(!meal) return [];
    let indexes = [];
    for(let i=1; i<=20; i++){
      if(meal['strIngredient'+i]){
        indexes.push(i);
      }
    }

    return indexes;
  }

  const getYoutubeVideoId = url=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
}
  
  return (
    <ScrollView 
    className="bg-white flex-1"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 30}}>

      <StatusBar style={"light"}/>

      <View className="flex-row justify-center">
        <Image
        source={{uri: item.strMealThumb}}
        style={{width: wp(100), height: hp(50)}}>
        </Image>
      </View>

      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#7dd3fc"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
        </TouchableOpacity>
      </Animated.View>

      { loading ? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
              <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-neutral-700">
                {meal?.strMeal}
              </Text>
              <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500">
                {meal?.strArea}
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
              <View className="flex rounded-full bg-sky-300 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full items-center justify-center">
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252"></ClockIcon>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    35
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Mins
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-sky-300 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full items-center justify-center">
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252"></UsersIcon>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    3
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Servings
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-sky-300 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full items-center justify-center">
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252"></FireIcon>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    768
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Cal
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-sky-300 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full items-center justify-center">
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252"></Square3Stack3DIcon>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700"></Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">Ingredients</Text>
              <View className="space-y-2 ml-3">
                {
                  ingredientsIndexes(meal).map(i => {
                    return (
                      <View key={i} className="flex-row space-x-4">
                        <View style={{height: hp(1.5), width: hp(1.5)}} className="bg-sky-300 rounded-full"></View>
                        <View className="flex-row space-x-2">
                          <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                          <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">Instructions</Text>
              <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
                {
                  meal?.strInstructions
                }
              </Text>
            </Animated.View>

            {meal.strYoutube && (
              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">Recipe Video</Text>
                <View>
                  <YoutubeIframe 
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}>
                  </YoutubeIframe>
                </View>
              </Animated.View>
            )}
          </View>
        )
      }

    </ScrollView>
  )
}