import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function AllFonts() {
    let [fontsLoaded, error] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
        // 'Poppins-Bold': require('./app/assets/fonts/Poppins/Poppins-Bold.ttf'),
        // 'Poppins-ExtraBold': require('./app/assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        // 'Poppins-ExtraLight': require('./app/assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
        // 'Poppins-Light': require('./app/assets/fonts/Poppins/Poppins-Light.ttf'),
        // 'Poppins-Medium': require('./app/assets/fonts/Poppins/Poppins-Medium.ttf'),
        // 'Poppins-Regular': require('./app/assets/fonts/Poppins/Poppins-Regular.ttf'),
        // 'Poppins-SemiBold': require('./app/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
        // 'Poppins-Thin': require('./app/assets/fonts/Poppins/Poppins-Thin.ttf'),
        // 'Pushster-Regular': require('../assets/fonts/Pushster/Pushster-Regular.ttf'),
    })
}