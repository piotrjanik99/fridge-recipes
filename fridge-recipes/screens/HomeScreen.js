import { View, ScrollView, Image, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

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
      const response = await axios.get('https://www.themealdb.com/api/json/v2/9973533/categories.php')
      if(response && response.data) {
        setCategories(response.data.categories);
      }
    } catch(err) {
      console.log('error: ', err.message)
    }
  }

  const getRecepies = async (category="Beef")=> {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${category}`)
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

        <View className="mx-4 flex-row items-center mb-2  shadow-md">
          <Pressable className="rounded-full bg-sky-300 p-1 items-center" style={{width: '100%'}} onPress={() => navigation.navigate('Fridge')}>
            <Image source={require('../assets/images/fridge-icon.png')} style={{height: hp(5), width: hp(5)}}></Image>
          </Pressable>
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