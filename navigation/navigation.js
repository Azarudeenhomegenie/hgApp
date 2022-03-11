import * as React from 'react';
import { Image, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from "@expo/vector-icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { getLoggedInStatus, getUser, logout, verifyOTP, login } from '../reducers/authReducer';
import homeScreen from '../screens/Dashboard/homeScreen';
import AccountScreen from '../screens/Dashboard/login';
import MyBookingScreen from '../screens/MyBookingScreen';
import GetgenieScreen from '../screens/GetgenieScreen';
import CategoryScreen from '../screens/CategoryScreen';
import OfferScreen from '../screens/OfferScreen';
import SupportScreen from '../screens/SupportScreen';
import WalletScreen from '../screens/WalletScreen';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ReferEarnScreen from '../screens/ReferEarnScreen';
import SettingAddCardScreen from '../screens/UserScreens/SettingAddCardScreen';
import SettingAddAddressScreen from '../screens/UserScreens/SettingAddAddressScreen';
import SettingAddInfoScreen from '../screens/UserScreens/SettingAddInfoScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import GetgenieCategories from '../screens/Booking/GetgenieCategories';
import Getgeniescreen1 from '../screens/Booking/Getgeniescreen1';
import Getgeniescreen2 from '../screens/Booking/Getgeniescreen2';
import Getgeniescreen3 from '../screens/Booking/Getgeniescreen3';
import Getgeniescreen4 from '../screens/Booking/Getgeniescreen4';
import Getgeniescreen5 from '../screens/Booking/Getgeniescreen5';
import Browser from '../screens/Browser';
import { TabBar } from 'react-native-tab-view';

let imagePath = '../assets/icons/'
let imagePathImage = '../assets/icons/images/'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs(true);

const StackScreen = ({ navigation }) => {
    return (
        // <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage">
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={HomeTab} options={{ gestureEnabled: false }} screenOptions={{ headerShown: false }} />
            <Stack.Screen name="MyBookingPage" component={HomeTab} options={{ gestureEnabled: false }} />
            <Stack.Screen name="GetgenieScreen" component={GetgenieScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GetgenieCategories" component={GetgenieCategories} options={{ gestureEnabled: false }} />
            <Stack.Screen name="GetgeniePage1" component={Getgeniescreen1} options={{ gestureEnabled: false }} />
            <Stack.Screen name="GetgeniePage2" component={Getgeniescreen2} options={{ gestureEnabled: false }} />
            <Stack.Screen name="GetgeniePage3" component={Getgeniescreen3} options={{ gestureEnabled: false }} />
            <Stack.Screen name="GetgeniePage4" component={Getgeniescreen4} options={{ gestureEnabled: false }} />
            <Stack.Screen name="GetgeniePage5" component={Getgeniescreen5} options={{ gestureEnabled: false }} />
            <Stack.Screen name="OfferPage" component={HomeTab} options={{ gestureEnabled: false }} />
            <Stack.Screen name="AccountPage" component={HomeTab} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SettingAddCardPage" component={SettingAddCardScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SettingAddAddressPage" component={SettingAddAddressScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SettingAddInfoPage" component={SettingAddInfoScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Browser" component={Browser} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    )
}
const HomeStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyBookingPage">
            <Stack.Screen name="HomePage" component={homeScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="CategoryPage" component={CategoryScreen} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    );
}
const MyBookingStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyBookingPage">
            <Stack.Screen name="MyBookingPage" component={MyBookingScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="JobdetailPage" component={JobDetailScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="PaymentPage" component={PaymentScreen} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    );
}

const GetgenieStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="GetgeniePage" options={{ headerShown: false }}>
            <Stack.Screen name="GetgenieScreen" component={GetgenieScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
const OfferStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OfferScreen">
            <Stack.Screen name="OfferScreen" component={OfferScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ReferEarnPage" component={ReferEarnScreen} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    );
}
const AccountStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AccountPage">
            <Stack.Screen name="AccountPage" component={AccountScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SupportPage" component={SupportScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="WalletPage" component={WalletScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="NotificationPage" component={NotificationScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SettingPage" component={SettingScreen} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    );
}
const HomeTab = ({ navigation }) => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 80,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingTop: 10,
                paddingBottom: 10,
                shadowColor: "#000",
                shadowOpacity: 0.5,
                shadowRadius: 2,
                shadowOffset: {
                    height: -4,
                    width: 0
                },
                elevation: 5,
                zIndex: 3,
                backgroundColor: '#fff'
            },
            tabBarOptions: {
                style: {
                    marginTop: 10,
                },
            },
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Home") {
                    return (
                        <Image style={{ borderColor: '#ccc', borderRightWidth: 1 }}
                            source={require(imagePath + "homeIcon.png")}
                        />
                    );
                } else if (route.name === "Bookings") {
                    return (
                        <Image
                            source={require(imagePath + "bookings.png")}
                        />
                    );
                } else if (route.name === "GetgeniePage") {
                    return (
                        <Image
                            style={{ width: 70, height: 70, marginTop: -15 }}
                            source={require(imagePath + "genieNavbar.png")}
                        />
                    );
                } else if (route.name === "Offers") {
                    return (
                        <Image
                            source={require(imagePath + "offers-menu.png")}
                        />
                    );
                } else if (route.name === "Account") {
                    return (
                        <Image
                            source={require(imagePath + "userInfo.png")}
                        />
                    );
                }
            },
            tabBarActiveTintColor: "#2EB0E4",
            tabBarInactiveTintColor: "#525252",
            tabBarLabelStyle: {
                fontSize: 11, color: "#2EB0E4",
                fontFamily: 'PoppinsM',
            },
        })}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Bookings" component={MyBookingStackScreen} />
            <Tab.Screen name="GetgeniePage" component={GetgenieStackScreen} options={{ title: "", headerShown: false, tabBarStyle: { display: "none" } }} />
            <Tab.Screen name="Offers" component={OfferStackScreen} />
            <Tab.Screen name="Account" component={AccountStackScreen} />
        </Tab.Navigator>
    )
}

const MainDrawer = ({ navigation }) => {
    return (
        <NavigationContainer style={{
            backgroundColor: '#fff',
            shadowColor: "#000000",
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
                height: -80,
                width: 2
            },
            elevation: 10,
            marginTop: 20,
        }}
        >
            <StackScreen />
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
export default MainDrawer;