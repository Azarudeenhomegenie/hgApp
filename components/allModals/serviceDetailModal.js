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
    TextInput,
    Dropdown,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { List } from 'react-native-paper';
import Modal from 'react-native-modal';
import StatusBarAll from "../StatusBar";
import css from '../commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';

const serviceDetailModal = (props) => {
    const [scopeModalVisible, setscopeModalVisible] = useState(false);
    const togglescopeModal = () => { setscopeModalVisible(!scopeModalVisible) };
    return (
        <Modal
            isVisible={scopeModalVisible}
            animationIn='slideInLeft'
            animationInTiming={700}
            animationOut='slideOutLeft'
            animationOutTiming={700}
            coverScreen={true}
            useNativeDriver={true}
            style={{ margin: 0, }}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
        >
            <ScrollView>
                <View style={bookModal.modalViewFull}>
                    <View style={[bookModal.modalHeader]}>
                        <TouchableOpacity
                            style={[css.flexDRR, css.padding20]}
                            onPress={() => setscopeModalVisible(!scopeModalVisible)}
                        >
                            <Image source={require(imgPath + 'backArrowBlack.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={[bookModal.modalBody]}>
                        <View style={[css.flexDR, css.line20]}>
                            <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'expert.png')} />
                            <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Scope Details</Text>
                        </View>
                        <View style={[css.line20]}>
                            <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>what's included</Text>
                            <Text style={[css.fm, css.blackC, css.spaceB5,]}>- Visit the customer location,{"\n"} - Inspection and diagnosis of the issue, on-site,{"\n"} - For minor repair - work that can be completed, on the spot, in 1 hour,{"\n"} - For major repair - detailed diagnosis and bill estimation, including ascertaining the availability of material and/ or spare parts,{"\n"} - Testing and demo; and{"\n"} - Post-inspection cleanup.</Text>
                        </View>
                        <View style={[css.spaceB20]}>
                            <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>NOTES</Text>
                            <Text style={[css.fm, css.blackC, css.spaceB5,]}>Customer to assist in getting access to community and service location, and electricity and water connection to be active.</Text>
                        </View>
                        <View style={[css.line20]}>
                            <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Availability</Text>
                            <View style={[css.flexDRSA]}>
                                <Image style={{ width: 50, height: 56 }} source={require(imgPath + 'emergency-2x.png')} />
                                <Image style={{ width: 50, height: 57 }} source={require(imgPath + 'sameday-2x.png')} />
                                <Image style={{ width: 51, height: 56 }} source={require(imgPath + 'friday-2x.png')} />
                                <Image style={{ width: 53, height: 56 }} source={require(imgPath + 'schedule-2x.png')} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};
const bookModal = StyleSheet.create({
    modalViewFull: {
        backgroundColor: "white",
        padding: 20,
        height: windowHeight,
    },
    modalHeader: { fontSize: 14, },

})
const styles = StyleSheet.create({
    activeText: {
        color: '#fff',
    },
    rbWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    rbtextStyle: {
        fontSize: 18,
        color: '#525252',
        fontFamily: 'PoppinsBO',
        marginLeft: 5,
    },
    rbStyle: {
        height: 25,
        width: 25,
        borderRadius: 110,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        width: 10,
        height: 10,
        borderRadius: 55,
        backgroundColor: '#2eb0e4',
    },
    // modal-css
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredViewFull: {
        //flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    modalViewFull: {
        backgroundColor: "white",
        padding: 20,
        //borderRadius: 10,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: windowHeight,
    },
    modalHeader: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#f2f4f8',
        borderRadius: 10,
        width: '100%',
        paddingBottom: 30,
    },
    modalBody: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',
    },
    modalText: {
        textAlign: "center",
        fontSize: 13,
        fontFamily: 'PoppinsR',
        color: '#606060',
        marginBottom: 10
    },
    fixedContainer: { flex: 1, zIndex: 1 },
    fixedFooter: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    continueBtn: {
        backgroundColor: '#f6b700',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 27,
        fontFamily: 'PoppinsM',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
        width: '25%',
    },
    continueBtnText: {
        fontSize: 14,
        fontFamily: 'PoppinsM',
        letterSpacing: 0.25,
        color: '#fff',
        textTransform: 'uppercase',
    },
    rbModaltextStyle: {
        fontSize: 18,
        color: '#525252',
        fontFamily: 'PoppinsSB',
        marginLeft: 5,
    },
    btnYes: {
        width: '49%', borderWidth: 1, borderColor: '#ccc', height: 35, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    },
    btnYesSelected: {
        width: '49%', height: 35, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eff7fc', shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 1,
    },
    btnYesSelectedText: {
        color: '#2eb0e4', fontFamily: 'PoppinsSB',
    }
})
export default serviceDetailModal;
