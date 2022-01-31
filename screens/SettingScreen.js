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
    Pressable,
    Alert,
    FlatList
} from "react-native";
import Modal from 'react-native-modal';
import SocialMedia from "../components/SocialMedia";
import Whatsapp800 from "../components/Whatsapp800";
import ModalComingSoon from "../components/ModalComingSoon";
import css from '../components/commonCss';
import StatusBarAll from "../components/StatusBar";


let card = 'no'
let address = 'no'
export default function SettingScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [modalComingsoon, setModalComingsoon] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={[css.whiteBG], { flex: 1, backgroundColor: "#fff" }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={css.flexDR}>
                    <TouchableOpacity
                        style={[css.whiteC, css.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={require("../assets/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle]}>SETTINGS</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[css.section]}>
                    <View style={[css.container]}>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require("../assets/iconIndex.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16]}>BASIC INFO</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('SettingAddInfoPage')}>
                                    <Image
                                        source={require("../assets/iconEdit.png")}
                                        style={[styles.editIcon]}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[css.flexDR, css.spaceB5]}>
                                <Text style={[styles.settingShadowBoxText], { flex: 1, color: '#60604E' }}>Name</Text>
                                <Text style={[styles.settingShadowBoxText], { flex: 2 }}>Azarudeen</Text>
                            </View>
                            <View style={[css.flexDR, css.spaceB5]}>
                                <Text style={[styles.settingShadowBoxText], { flex: 1, color: '#60604E' }}>Mobile</Text>
                                <Text style={[styles.settingShadowBoxText], { flex: 2 }}>+971 588341424</Text>
                            </View>
                            <View style={[css.flexDR]}>
                                <Text style={[styles.settingShadowBoxText], { flex: 1, color: '#60604E' }}>Email ID</Text>
                                <Text style={[styles.settingShadowBoxText], { flex: 2 }}>azarudeen@gmail.com</Text>
                            </View>
                        </View>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require("../assets/iconLocation.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16]}>ADDRESS</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('SettingAddAddressPage')}>
                                    <Image
                                        source={require("../assets/iconEdit.png")}
                                        style={[styles.editIcon]}
                                    />
                                </TouchableOpacity>
                            </View>
                            {address == 'no' ? <View>
                                <Text style={[css.blackC, css.f14]}>No saved Address</Text>
                            </View> :
                                <View>
                                    <Text style={[css.lGreyC, css.f14, css.feb]}>(Home 1)</Text>
                                    <Text style={[css.blackC, css.f14]}>1209, Jumeirah village Triangle, Dubai (address)</Text>
                                </View>}
                        </View>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require("../assets/iconCard.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16]}>CARDS</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate('SettingAddCardPage')}>
                                        <Image
                                            source={require("../assets/iconEdit.png")}
                                            style={[styles.editIcon]}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                {card == 'no' ? <Text style={[css.lGreyC, css.f14, { color: '#60604E' }]}>No saved card</Text> : <Text style={[css.lGreyC, css.f14, { color: '#60604E' }]}>***************</Text>}
                            </View>
                        </View>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require("../assets/iconFav.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16]}>FAVOURITES</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => setModalComingsoon(true)}>
                                        <Image
                                            source={require("../assets/iconEdit.png")}
                                            style={[styles.editIcon]}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={[css.lGreyC, css.f14], { color: '#60604E' }}>0 Favourite Genie</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {modalComingsoon ? <ModalComingSoon title={true} /> : null}
            </ScrollView>
            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Coming soon - stay tuned</Text>
                        <TouchableOpacity
                            style={[css.yellowBtn]}
                            onPress={() => setModalComingsoon(false)}
                        >
                            <Text style={[css.whiteC, css.f16]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    settingShadowBoxText: { fontSize: 15 },
    settingShadowBox: {
        backgroundColor: "white",
        borderRadius: 5,
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.24,
        shadowRadius: 6.27,
        elevation: 10,
        padding: 20,
        marginBottom: 20
    },
    titleIcon: { width: 20, height: 20 },
    editIcon: { width: 20, height: 20 },
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
});