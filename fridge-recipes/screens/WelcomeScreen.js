import { View, Image, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

    const ringOnePadding = useSharedValue(0);
    const ringTwoPadding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ringOnePadding.value = 0;
        ringTwoPadding.value = 0;
        
        setTimeout(() => ringOnePadding.value = withSpring(ringOnePadding.value + hp(5), 100))
        setTimeout(() => ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(5.5), 300))
        setTimeout(() => navigation.navigate('Home'), 2500)
    })

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-sky-300">
      <StatusBar style="light" />

      <Animated.View className="bg-white/20 rounded-full" style={{padding: ringTwoPadding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ringOnePadding}}>
            <Image source={require('../assets/images/welcome.png')}
            style={{width: hp(20), height: hp(20)}} />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text style={{fontSize: hp(7)}} 
              className="font-bold text-white tracking-widest">
            Fridgey
        </Text>
        <Text style={{fontSize: hp(2)}} 
              className="font-medium text-white tracking-widest">
            Recipes made straight from your fridge.
        </Text>
      </View>

    </View>
  )
}