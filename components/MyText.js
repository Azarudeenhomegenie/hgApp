import { View, Text, } from "react-native";
import AllFonts from './AllFonts';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import css from './commonCss';
const MyText = (props) => {

    let [fontsLoaded] = useFonts({
        'PoppinsBL': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
        'PoppinsM': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        // return <AppLoading />;
        return <View />;
    } else {
        return (
            <Text style={[css.blackC, css.fm, css.f14]} {...props} >{props.children}</Text>
        );
    }
}

export default MyText;