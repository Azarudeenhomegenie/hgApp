import React, { Component, useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Button,
    Image,
    ViewBase,
    Linking,
    BackHandler,
    TouchableOpacity,
    Pressable,
    Alert,
    Modal,
    Dimensions,
} from "react-native";
import Text from "../components/MyText";
import SocialMedia from "../components/socialMedia";
import Whatsapp800 from "../components/whtsApp";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let notification = 'yes'

export default function NotificationScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={{ backgroundColor: "#f4f5f8" }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={[css.flexDR]}>
                    <TouchableOpacity
                        style={[css.whiteC, css.marginR10]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            style={{}}
                            source={require(imgPath + "backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle, css.alignSelfC]}>NOTIFICATION</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[css.section,]}>
                    <View style={[css.container,]}>
                        {notification == 'yes' ?
                            <View style={[css.boxShadow, css.imgFull, css.whiteBG, css.borderRadius10, css.padding20]}>
                                <View style={[css.line10, css.flexDR]}>
                                    <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'iconNotification.png')} />
                                    <Text style={[css.fm, css.f18, css.blackC, css.alignSelfC]}>Booking Confirmed</Text>
                                </View>
                                <View style={[css.line10]}>
                                    <View style={[css.flexDR,]}>
                                        <Text style={[css.fbo, css.f18, css.greyC, css.marginR20]}>Job ID</Text>
                                        <Text style={[css.fbo, css.f18, css.blackC]}>{181006452}</Text>
                                    </View>
                                    <View><Text style={[css.fr, css.f14, css.blackC]}>Congratulation! your booking JOB ID: {181006452} is now confirmed</Text></View>
                                </View>
                                <View style={[css.line10]}>
                                    <View style={[css.flexDR,]}>
                                        <Text style={[css.fbo, css.f18, css.greyC, css.marginR20]}>Job ID</Text>
                                        <Text style={[css.fbo, css.f18, css.blackC]}>{181006453}</Text>
                                    </View>
                                    <View><Text style={[css.fr, css.f14, css.blackC]}>Congratulation! your booking JOB ID: {181006453} is now confirmed</Text></View>
                                </View>
                            </View>
                            :
                            <View style={{ height: windowHeight }}>
                                <View style={[css.alignItemsC, css.justifyContentC, { flex: 0.7 }]}><Text style={[css.fsb, css.f24, css.blackC]}>No Notification</Text></View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
};

const styles = StyleSheet.create({


});