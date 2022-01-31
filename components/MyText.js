import { View, Text, } from "react-native";
import AllFonts from './AllFonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import css from './commonCss';
const MyText = (props) => {

    let [fontsLoaded] = useFonts({
        'Lobster': require('../assets/fonts/Lobster/Lobster.ttf'),
        'PoppinsBL': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
        'PoppinsM': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Text style={[css.blackC, css.fm, css.f14]} {...props} >{props.children}</Text>
        );
    }
}

export default MyText;