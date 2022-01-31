import { View, } from "react-native";
import Navigation from './navigation/navigation';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Text from "./components/MyText";


export default function App() {
  let [fontsLoaded] = useFonts({
    'Lobster': require('./assets/fonts/Lobster/Lobster.ttf'),
    'PoppinsBL': require('./assets/fonts/Poppins/Poppins-Black.ttf'),
    'PoppinsBO': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'PoppinsEB': require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'PoppinsEL': require('./assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'PoppinsL': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    'PoppinsM': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    'PoppinsR': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'PoppinsSB': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'PoppinsT': require('./assets/fonts/Poppins/Poppins-Thin.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <StoreProvider store={store}>
        <Navigation />
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}><Text>test</Text></View> */}
      </StoreProvider>
    );
  }
  // return (
  //   <StoreProvider store={store}>
  //     <Navigation />
  //   </StoreProvider>
  // );
}
