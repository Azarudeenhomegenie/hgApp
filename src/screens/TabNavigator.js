import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
// import AppLoading from 'expo-app-loading';
import { AntDesign } from "@expo/vector-icons";

import Header from "../components/Header";
import HomeScreen from './HomeScreen';
import BookingScreen from './BookingScreen';
import GetgenieScreen from './GetgenieScreen';
import CategoryScreen from './CategoryScreen';
import LoginScreen from './LoginScreen';
import OfferScreen from './OfferScreen';
import AccountScreen from './AccountScreen';
import SupportScreen from './SupportScreen';
import WalletScreen from './WalletScreen';
import SettingScreen from './SettingScreen';
import NotificationScreen from './NotificationScreen';
import ReferEarnScreen from './ReferEarnScreen';
import SettingAddCardScreen from './UserScreens/SettingAddCardScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const BookingsStack = createNativeStackNavigator();
const GetGenieStack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 100,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            },
            tabBarOptions: {
                style: {
                    marginTop: 10,
                },
            },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                    iconName = focused ? "home" : "home";
                } else if (route.name === "Bookings") {
                    iconName = focused ? "calendar" : "calendar";
                } else if (route.name === "GetGenie") {
                    iconName = focused ? "pluscircle" : "pluscircle";
                } else if (route.name === "Offers") {
                    iconName = focused ? "tago" : "tago";
                } else if (route.name === "Account") {
                    iconName = focused ? "user" : "user";
                }
                return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#2EB0E4",
            tabBarInactiveTintColor: "grey",
            tabBarLabelStyle: {
                fontSize: 12,
                color: "#2eb0e4",
                padding: 10,
                fontFamily: 'PoppinsM',
            },
        })}>
            <Tab.Screen name="Home" component={HomeScreen} screenOptions={{ headerShown: false }} style={[styles.tabMenu, styles.homeMenu]} />
            <Tab.Screen name="Bookings" component={BookingScreen} style={[styles.tabMenu, styles.bookingMenu]} />
            <Tab.Screen name="GetGenie" component={GetgenieScreen} style={[styles.tabMenu, styles.getGenieMenu]}
                options={{
                    title: "",
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: 70, height: 70 }}
                                source={require("@assets/genieNavbar.png")}
                            />
                        );
                    },
                }} />
            <Tab.Screen name="Offers" component={OfferScreen} style={[styles.tabMenu, styles.offerMenu]} />
            <Tab.Screen name="Account" component={AccountScreen} style={[styles.tabMenu, styles.accountMenu]} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});