import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NAVIGATION_ICONS,
  NAVIGATION_ICONS_STYLE
} from '../constants/navigation';
import homeScreen from '../screens/Dashboard/homeScreen';
import UserScreen from '../screens/User';
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
import GetgenieCategories from '../screens/Booking/GetgenieCategories';
import Getgeniescreen1 from '../screens/Booking/Getgeniescreen1';
import Getgeniescreen2 from '../screens/Booking/Getgeniescreen2';
import Getgeniescreen3 from '../screens/Booking/Getgeniescreen3';
import Getgeniescreen4 from '../screens/Booking/Getgeniescreen4';
import Getgeniescreen5 from '../screens/Booking/Getgeniescreen5';
import color from '../constants/colors';
import { getLoggedInStatus } from '../redux/reducers/userSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs(true);

const gestureOption = { gestureEnabled: false };

const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomeTab} options={gestureOption} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="MyBookingPage" component={HomeTab} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgenieScreen" component={GetgenieScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="OfferPage" component={HomeTab} options={{ gestureEnabled: false }} />
      <Stack.Screen name="AccountPage" component={HomeTab} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SettingAddCardPage" component={SettingAddCardScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SettingAddAddressPage" component={SettingAddAddressScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SettingAddInfoPage" component={SettingAddInfoScreen} options={{ gestureEnabled: false }} />
      {/* <Stack.Screen name="GetgeniePage1" component={Getgeniescreen1} options={gestureOption} />
      <Stack.Screen name="GetgeniePage2" component={Getgeniescreen2} options={gestureOption} />
      <Stack.Screen name="GetgeniePage3" component={Getgeniescreen3} options={gestureOption} />
      <Stack.Screen name="GetgeniePage4" component={Getgeniescreen4} options={gestureOption} />
      <Stack.Screen name="GetgeniePage5" component={Getgeniescreen5} options={gestureOption} />
      <Stack.Screen
        name="SettingAddCardPage"
        component={SettingAddCardScreen}
        options={gestureOption} />
      <Stack.Screen
        name="SettingAddAddressPage"
        component={SettingAddAddressScreen}
        options={gestureOption} />
      <Stack.Screen
        name="SettingAddInfoPage"
        component={SettingAddInfoScreen}
        options={gestureOption} />
      <Stack.Screen name="ReferEarnPage" component={ReferEarnScreen} options={gestureOption} />
      <Stack.Screen name="SupportPage" component={SupportScreen} options={gestureOption} />
      <Stack.Screen name="WalletPage" component={WalletScreen} options={gestureOption} />
      <Stack.Screen
        name="NotificationPage"
        component={NotificationScreen}
        options={gestureOption} />
      <Stack.Screen name="JobdetailPage" component={JobDetailScreen} options={gestureOption} />
      <Stack.Screen name="SettingPage" component={SettingScreen} options={gestureOption} /> */}
    </Stack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyBookingPage">
      <Stack.Screen name="HomePage" component={homeScreen} options={gestureOption} />
      <Stack.Screen name="CategoryPage" component={CategoryScreen} options={gestureOption} />
    </Stack.Navigator>
  );
};
const MyBookingStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyBookingPage">
      <Stack.Screen name="MyBookingPage" component={MyBookingScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="JobdetailPage" component={JobDetailScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

const GetgenieStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GetgeniePage">
      <Stack.Screen name="GetgenieScreen" component={GetgenieScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgenieCategories" component={GetgenieCategories} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgeniePage1" component={Getgeniescreen1} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgeniePage2" component={Getgeniescreen2} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgeniePage3" component={Getgeniescreen3} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgeniePage4" component={Getgeniescreen4} options={{ gestureEnabled: false }} />
      <Stack.Screen name="GetgeniePage5" component={Getgeniescreen5} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

const OfferStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OfferScreen">
      <Stack.Screen name="OfferScreen" component={OfferScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="ReferEarnPage" component={ReferEarnScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

const AccountStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AccountPage">
      <Stack.Screen name="AccountPage" component={UserScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SupportPage" component={SupportScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="WalletPage" component={WalletScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="NotificationPage" component={NotificationScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SettingPage" component={SettingScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

const getTabIcon = (screen) => {
  const iconPath = NAVIGATION_ICONS[screen];
  const style = NAVIGATION_ICONS_STYLE[screen];

  return (<Image style={style} source={iconPath} />);
};

const tabBarStyle = {
  height: 80,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingTop: 10,
  paddingBottom: 10,
  shadowColor: color.black,
  shadowOpacity: 0.5,
  shadowRadius: 2,
  shadowOffset: {
    height: -4,
    width: 0
  },
  elevation: 5,
  zIndex: 3,
  backgroundColor: color.white
};

const tabBarOptions = {
  style: {
    marginTop: 10,
  },
};

const tabBarLabelStyle = {
  fontSize: 11,
  color: color.lightblue,
  fontFamily: 'PoppinsM',
};

const HomeTab = ({ navigation }) => {
  const isLoggedIn = useSelector(getLoggedInStatus);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle,
        tabBarOptions,
        tabBarIcon: () => getTabIcon(route.name),
        tabBarActiveTintColor: color.lightblue,
        tabBarInactiveTintColor: color.darkgrey,
        tabBarLabelStyle
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Bookings" component={MyBookingStackScreen} />
      <Tab.Screen name="GetgenieScreen" component={GetgenieScreen} options={{ title: '' }} />
      <Tab.Screen name="Offers" component={OfferStackScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>
  );
};

const MainDrawer = ({ onLayout }) => {
  useEffect(() => {
    onLayout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer style={styles.navigationContainer}>
      <StackScreen />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: -80,
      width: 2
    },
    elevation: 10,
    marginTop: 20,
  },
});

export default MainDrawer;
