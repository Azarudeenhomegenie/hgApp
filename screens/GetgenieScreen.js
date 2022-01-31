import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Button,
    Image,
    ViewBase,
    Linking,
    BackHandler,
    TouchableOpacity,
    TouchableHighlight,
    Pressable,
    Alert,
    FlatList,
    SafeAreaViewDecider,
    VirtualizedList,
} from "react-native";
import Modal from 'react-native-modal';
import { Searchbar } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SocialMedia from "../components/socialMedia";
import Whatsapp800 from "../components/whtsApp";
import ModalComingSoon from "../components/ModalComingSoon";
import css from '../components/commonCss';
import StatusBarAll from "../components/StatusBar";
import GetgenieCategories from "../components/GetgenieScreens/GetgenieCategories";
import Getgeniescreen1 from "../components/GetgenieScreens/Getgeniescreen1";
import Getgeniescreen2 from "../components/GetgenieScreens/Getgeniescreen2";
import Getgeniescreen3 from "../components/GetgenieScreens/Getgeniescreen3";
import Getgeniescreen4 from "../components/GetgenieScreens/Getgeniescreen4";
import Getgeniescreen5 from "../components/GetgenieScreens/Getgeniescreen5";
let categoryShowAll = 'categoryScreen4';
export default function GetgenieScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [categoryShow, setCategoryShow] = useState(true);
    const [categoryScreen1, setCategoryScreen1] = useState(false);
    const [categoryScreen2, setCategoryScreen2] = useState(false);
    const [categoryScreen3, setCategoryScreen3] = useState(false);
    const [categoryScreen4, setCategoryScreen4] = useState(false);
    const [categoryScreen5, setCategoryScreen5] = useState(false);
    useEffect(() => {
        console.log(global.gen)
    }, [global.gen])
    return (
        <SafeAreaView>
            <StatusBarAll />
            {

                global.gen == 1 ?
                    <GetgenieCategories />
                    : global.gen == 2 ?
                        <Getgeniescreen1 />
                        : global.gen == 3 ?
                            <Getgeniescreen2 />
                            : global.gen == 4 ?
                                <Getgeniescreen3 />
                                : global.gen == 5 ?
                                    <Getgeniescreen4 />
                                    : global.gen == 6 ?
                                        <Getgeniescreen5 />
                                        : null

            }

        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    activeBtn: {
        backgroundColor: '#2eb0e4',
        borderColor: '#2eb0e4'
    },
    activeText: {
        color: '#fff',
    }
})