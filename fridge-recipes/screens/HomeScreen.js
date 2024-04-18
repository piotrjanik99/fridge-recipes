import { View, ScrollView, Image, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import axios from 'axios'

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecepies();
  }, [])

  const handleChangeCategory = category => {
    getRecepies(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async ()=> {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      if(response && response.data) {
        setCategories(response.data.categories);
      }
    } catch(err) {
      console.log('error: ', err.message)
    }
  }

  const getRecepies = async (category="Beef")=> {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(response && response.data) {
        setMeals(response.data.meals);
      }
    } catch(err) {
      console.log('error: ', err.message)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 50}}
      className="space-y-6 pt-14">

        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}}></Image>
          <BellIcon size={hp(4)} color="gray"></BellIcon>
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">Hello, Piotr!</Text>
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Make your own food!</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">stay at <Text className="text-sky-300">home</Text></Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
          placeholder='Search any recipe'
          placeholderTextColor={'gray'}
          style={{fontSize: hp(1.7)}}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"></TextInput>
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}></MagnifyingGlassIcon>
          </View>
        </View>

        <View>
          { categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}></Categories>}
        </View>

        <View>
          <Recipes meals={meals} categories={categories} ></Recipes>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}