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
    Modal,
    Dimensions,
} from "react-native";
import css from '@components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';

export default function GetgenieFooter(props) {


    return (
        <View style={[css.section, styles.fixedContainer,]}>
            <View style={[css.container, css.whiteBG, styles.fixedFooter, css.padding30,]}>
                <View style={[css.flexDRSB]}>
                    <Pressable style={[css.flexDC]}><Text>Total</Text><Text>AED 190</Text></Pressable>
                    <TouchableOpacity style={[styles.continueBtn]} onPress={() => { console.log('hello') }}><Text style={[styles.continueBtnText]}>NEXT</Text></TouchableOpacity>
                    <Pressable style={[css.flexDC]}><Image style={[css.img30]} source={require('@assets/icons/percenttags.png')} /><Text style={[css.brandC]}>Offer</Text></Pressable>
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    activeText: {
        color: '#fff',
    },
    //Modal-css
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    modalHeader: {
        padding: 40,
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
    cancelBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f4f8',
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
        width: '45%'
    },
    cancelBtnText: {
        fontSize: 14,
        fontFamily: 'PoppinsM',
        letterSpacing: 0.25,
        color: '#000000a3',
        textTransform: 'uppercase',
    },
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
    fixedContainer: { flex: 1, zIndex: 1 },
    fixedHeader: { position: 'absolute', top: 0 },
    fixedFooter: {
        position: 'absolute', bottom: 0, left: 0, right: 0, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
})