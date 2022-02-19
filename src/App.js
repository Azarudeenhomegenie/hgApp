/* eslint-disable global-require */
import { AppRegistry } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { NavtiveBaseProvider } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Navigation from '@navigation/navigation';
import store from './redux';

const fontLists = {
  PoppinsBL: require('@assets/fonts/Poppins/Poppins-Black.ttf'),
  PoppinsBO: require('@assets/fonts/Poppins/Poppins-Bold.ttf'),
  PoppinsEB: require('@assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
  PoppinsEL: require('@assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
  PoppinsL: require('@assets/fonts/Poppins/Poppins-Light.ttf'),
  PoppinsM: require('@assets/fonts/Poppins/Poppins-Medium.ttf'),
  PoppinsR: require('@assets/fonts/Poppins/Poppins-Regular.ttf'),
  PoppinsSB: require('@assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  PoppinsT: require('@assets/fonts/Poppins/Poppins-Thin.ttf'),
};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(fontLists);
      } catch (e) {
        console.warn(e);
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
  }

  return (
    <StoreProvider store={store}>
      <Navigation onLayout={onLayoutRootView} />
    </StoreProvider>
  );
};

export default App;

AppRegistry.registerComponent('main', () => App);
