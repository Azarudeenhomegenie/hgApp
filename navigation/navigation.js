import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from "@expo/vector-icons";

import homeScreen from '../screens/Dashboard/homeScreen';
import login from '../screens/Dashboard/login';
import MyBookingScreen from '../screens/MyBookingScreen';
import GetgenieScreen from '../screens/GetgenieScreen';
import CategoryScreen from '../screens/CategoryScreen';
import OfferScreen from '../screens/OfferScreen';
import AccountScreen from '../screens/AccountScreen';

let imagePath = '../assets/icons/'
let imagePathImage = '../assets/icons/images/'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs(true);

const HomeScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage">
            {/* <Stack.Screen name="Home" component={homeScreen} options={{ gestureEnabled: false }} /> */}
            <Stack.Screen name="HomePage" component={BottomTab} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    )
}


const BottomTab = ({ navigation }) => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 70,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            },
            tabBarOptions: {
                style: {
                    marginTop: 10,
                },
            },
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Home") {
                    return (
                        <Image
                            source={require(imagePath + "homeIcon.png")}
                        />
                    );
                } else if (route.name === "Bookings") {
                    return (
                        <Image
                            source={require(imagePath + "bookings.png")}
                        />
                    );
                } else if (route.name === "GetGenie") {
                    return (
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require(imagePath + "genieNavbar.png")}
                        />
                    );
                } else if (route.name === "Offers") {
                    return (
                        <Image
                            source={require(imagePath + "bookings.png")}
                        />
                    );
                } else if (route.name === "Account") {
                    return (
                        <Image
                            source={require(imagePath + "bookings.png")}
                        />
                    );
                }
            },
            tabBarActiveTintColor: "#2EB0E4",
            tabBarInactiveTintColor: "#525252",
            tabBarLabelStyle: {
                fontSize: 14,
                color: "#2eb0e4",
                fontFamily: 'PoppinsM',
            },
        })}>
            <Tab.Screen
                name="Home"
                component={homeScreen}
                style={[styles.tabMenu, styles.homeMenu]}
            />
            <Tab.Screen
                name="Bookings"
                component={MyBookingScreen}
                style={[styles.tabMenu, styles.bookingMenu]}
            />
            <Tab.Screen
                name="GetGenie"
                component={GetgenieScreen}
                style={[styles.tabMenu, styles.getGenieMenu]}
            />
            <Tab.Screen
                name="Offers"
                component={OfferScreen}
                style={[styles.tabMenu, styles.offerMenu]}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                style={[styles.tabMenu, styles.accountMenu]}
            />
        </Tab.Navigator>
    )
}

const MainDrawer = ({ navigation }) => {
    return (
        <NavigationContainer>
            <HomeScreenStack />
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