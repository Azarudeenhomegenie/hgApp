import React, { Component, useState } from "react";
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
    Pressable,
    Alert,
    Modal,
    Dimensions,
} from "react-native";
import SocialMedia from "../components/SocialMedia";
import Whatsapp800 from "../components/Whatsapp800";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
let imgPath = '../assets/'
let imgPathImage = '../assets/images'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ReferEarnScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f5f8" }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={[css.flexDR]}>
                    <TouchableOpacity
                        style={[styles.textWhite, styles.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            style={{}}
                            source={require("../assets/backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={css.headerTitle}>REFER and EARN</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[css.section]}>
                    <View style={[css.container]}>
                        <View style={[css.boxShadow, css.padding20, css.whiteBG, css.borderRadius20]}>
                            <View style={[css.fm, css.blackC]}><Text style={[css.f16, css.fm, css.textCenter, css.blackC]}>You have earned <Text style={[css.brandC]}> AED 0 {'\n'}</Text> in referral so far</Text></View>
                            <View><Image style={[css.imgFull, css.marginT20, css.marginB20,]} resizeMode="contain" source={require(imgPath + 'earnGenie.png')} /></View>
                            <View style={[css.alignItemsC, css.marginT20]}>
                                <Text style={[css.brandC, css.fsb, css.f24, css.spaceB5]}>Gift AED 50.00</Text>
                                <Text style={[css.yellowC, css.fsb, css.f24, css.spaceB5]}>Get AED 50.00</Text>
                                <Text style={[css.blackC, css.fr, css.f16, css.spaceB5, css.textCenter]} > Invite your friends to use a Home Genie service by gifting them AED 50.00, and get AED 50.00 in return when they book their first Home Genie Service.</Text>
                                <View style={[css.spaceB20, css.yellowBG, css.imgFull, css.borderRadius10, css.boxShadow, css.alignCenter, { height: 50 }]}><Text style={[css.whiteC, css.f24, css.feb]}>HGXPUWe1FGkX</Text></View>
                                <View style={[css.spaceB5,]}><Text style={[css.fm, css.f16, css.blackC]}>Share this code with your friends</Text></View>
                                <View style={[css.spaceB5, css.flexDRSE, css.width50]}>
                                    <Image source={require(imgPath + 'social-fb.png')} />
                                    <Image source={require(imgPath + 'social-Instagram.png')} />
                                    <Image source={require(imgPath + 'social-twitter.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    section: {
        padding: 20,
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        width: "100%",
        height: 120,
        paddingTop: 36,
        paddingLeft: 20,
        backgroundColor: "#2eb0e4",
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: "#52006A",
        color: "#fff",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        textTransform: "uppercase",
    },
    flexRow: {
        flexDirection: "row",
    },
    flexRowSpace: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textWhite: {
        color: "#fff",
    },
    backButton: {
        marginRight: 10,
        justifyContent: "center",
    },
    bgLiteBlue: {
        backgroundColor: "#eff7fc",
    },
    flexDirectionColumn: {
        flexDirection: "column",
    },
    padding10: {
        padding: 10,
    },
    padding20: {
        padding: 20,
    },
    padding30: {
        padding: 30,
    },

});