import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';
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
import SettingAddAddressScreen from './UserScreens/SettingAddAddressScreen';
import SettingAddInfoScreen from './UserScreens/SettingAddInfoScreen';
import JobDetailScreen from './JobDetailScreen';
import autoNav from './autoNav';
import GetgenieCategories from '../components/GetgenieScreens/GetgenieCategories';
import Getgeniescreen1 from '../components/GetgenieScreens/Getgeniescreen1';
import Getgeniescreen2 from '../components/GetgenieScreens/Getgeniescreen2';
import Getgeniescreen3 from '../components/GetgenieScreens/Getgeniescreen3';
import Getgeniescreen4 from '../components/GetgenieScreens/Getgeniescreen4';
import Getgeniescreen5 from '../components/GetgenieScreens/Getgeniescreen5';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Dash'>
            <HomeStack.Screen name="Dash" component={RootNavigation} />
            <HomeStack.Screen name="BookingPage" component={BookingScreen} />
            <HomeStack.Screen name="GetgeniePage" component={GetgenieCategories} />
            <HomeStack.Screen name="GetgeniePage1" component={Getgeniescreen1} />
            <HomeStack.Screen name="GetgeniePage2" component={Getgeniescreen2} />
            <HomeStack.Screen name="GetgeniePage3" component={Getgeniescreen3} />
            <HomeStack.Screen name="GetgeniePage4" component={Getgeniescreen4} />
            <HomeStack.Screen name="GetgeniePage5" component={Getgeniescreen5} />
            <HomeStack.Screen name="SettingAddCardPage" component={SettingAddCardScreen} />
            <HomeStack.Screen name="SettingAddAddressPage" component={SettingAddAddressScreen} />
            <HomeStack.Screen name="SettingAddInfoPage" component={SettingAddInfoScreen} />
        </HomeStack.Navigator>
    );
}


function HomeStackWithTab() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomePage'>
            <HomeStack.Screen name="HomePage" component={HomeScreen} />
            <HomeStack.Screen name="CategoryPage" component={CategoryScreen} />
            <HomeStack.Screen name="OfferPage" component={OfferScreen} />
            <HomeStack.Screen name="ReferEarnPage" component={ReferEarnScreen} />
            <HomeStack.Screen name="AccountPage" component={AccountScreen} />
            <HomeStack.Screen name="SupportPage" component={SupportScreen} />
            <HomeStack.Screen name="WalletPage" component={WalletScreen} />
            <HomeStack.Screen name="NotificationPage" component={NotificationScreen} />
            <HomeStack.Screen name="JobdetailPage" component={JobDetailScreen} />
            <HomeStack.Screen name="SettingPage" component={SettingScreen} />
        </HomeStack.Navigator>
    );
}

const RootNavigation = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 90,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
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
            <Tab.Screen name="Home" component={HomeStackWithTab} style={[styles.tabMenu, styles.homeMenu]} />
            <Tab.Screen name="Bookings" component={BookingScreen} style={[styles.tabMenu, styles.bookingMenu]} />
            <Tab.Screen name="GetGenie" component={autoNav} style={[styles.tabMenu, styles.getGenieMenu]}
                options={{
                    title: "",
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: 70, height: 70 }}
                                source={{
                                    uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_D2EwwBi571f8fef784f3f9e7f2779c3.png",
                                }}
                                source={require("../assets/genieNavbar.png")}

                            />
                        );
                    },
                }} />
            <Tab.Screen name="Offers" component={OfferScreen} style={[styles.tabMenu, styles.offerMenu]} />
            <Tab.Screen name="Account" component={AccountScreen} style={[styles.tabMenu, styles.accountMenu]} />
        </Tab.Navigator>
    );
}

const MainDrawer = ({ navigation }) => {
    return (
        <NavigationContainer>
            <HomeStackScreen />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        fontFamily: 'PoppinsM',
    },
});

export default MainDrawer;