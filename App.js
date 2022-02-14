import { AppRegistry, View } from "react-native";
import Navigation from './navigation/navigation';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const fontLists = {
  'PoppinsBL': require('./assets/fonts/Poppins/Poppins-Black.ttf'),
  'PoppinsBO': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
  'PoppinsEB': require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
  'PoppinsEL': require('./assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
  'PoppinsL': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
  'PoppinsM': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
  'PoppinsR': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
  'PoppinsSB': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  'PoppinsT': require('./assets/fonts/Poppins/Poppins-Thin.ttf'),
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(fontLists);
      } catch (e) {
        console.warn(e);
        console.log('APP NOT REDY')
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  if (!appIsReady) {
    return null;
    //
  }

  console.log('*********************** APPPPPP REAADY ****************')
  
  return (
    // <SafeAreaView onLayout={onLayoutRootView}>
      <StoreProvider store={store} >
        <Navigation />
      </StoreProvider>
    // </SafeAreaView>
  );
}

AppRegistry.registerComponent('main', () => App);