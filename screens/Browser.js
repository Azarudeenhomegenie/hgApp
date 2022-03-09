import React from "react";
import { View, TouchableOpacity, Dimensions } from 'react-native'
import StatusBarAll from "../components/StatusBar";
import css from '../components/commonCss';
import { BASE_URL } from '../base_file';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import WebView from "react-native-webview";
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BackButton = ({ navigation }) =>
    <TouchableOpacity
        onPress={() => { navigation.goBack() }}>
        <Text>Back</Text>
    </TouchableOpacity>
export default function Browser({ route, props, navigation }) {
    const navigationOptions = ({ navigation }) => ({
        title: 'Browser',
        headerLeft: <BackButton navigation={navigation} />
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFBFF" }}>
            <StatusBarAll />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: navigation.params.url }}
                        style={{ flex: 1 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}