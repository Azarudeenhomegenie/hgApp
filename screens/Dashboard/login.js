import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { connect } from "react-redux";
import { getLogin } from "../../actions/hgAction";
import css from '../../components/commonCss';
import Whatsapp from "../../components/whtsApp";
import SocialMedia from '../../components/socialMedia';
import LoginModal from "../../components/loginModal";

const Login = (props) => {
    const [user, setUser] = useState(false)
    const [displayName, setDisplyName] = useState(null);
    const [displayEmail, setDisplayEmail] = useState(null);
    const [loginModal, setLoginModal] = useState(false);
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={css.header}>
            <View style={styles.flexRow}>
                <TouchableOpacity
                    style={[styles.textWhite, styles.backButton]}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image
                        resizeMode="contain"
                        style={{}}
                        source={require("../../assets/icons/backArrow.png")}
                    />
                </TouchableOpacity>
                <Text style={[css.headerTitle]}>My Accounts</Text>
            </View>
        </View>

        {user ? 
            <ScrollView style={styles.ScrollView}>
                <View style={[styles.screen]}>
                    <View style={[styles.bgLiteBlue]}>
                        <View
                            style={[
                                styles.flexRowSpace,
                                { padding: 15, paddingTop: 5, paddingBottom: 5 },
                            ]}
                        >
                            <View
                                style={
                                    ([styles.flexStarts],
                                        { justifyContent: "flex-start", flexDirection: "row" })
                                }
                            >
                                <View style={{ borderRadius: "50%" }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{ borderRadius: 50, width: 50, marginRight: 15 }}
                                        source={require("../../assets/icons/genieicon.png")}
                                    />
                                </View>
                                <View style={[css.flexDC]}>
                                    <Text
                                        style={[
                                            styles.accountName,
                                            { fontWeight: "bold", marginTop: 15 },
                                        ]}
                                    >
                                        {displayName}
                                    </Text>
                                    <Text style={[styles.accountEmail]}>
                                        {displayEmail}
                                    </Text>
                                </View>
                            </View>
                            <Pressable
                                style={[
                                    styles.notificationBell,
                                    { paddingTop: 20, paddingBottom: 10 },
                                ]}
                                onPress={() => navigation.navigate('NotificationPage')}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={{}}
                                    source={require("../../assets/icons/notify.png")}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.section]}>
                        <View style={[styles.container]}>
                            <Pressable
                                style={[
                                    styles.accountLinks,
                                    styles.flexRow,
                                    {
                                        borderBottomColor: "#C9C9C920",
                                        borderBottomWidth: 1,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                    },
                                ]}
                                onPress={() => navigation.navigate('Bookings')}
                            >
                                <Image
                                    style={{ marginRight: 10 }}
                                    source={require("../../assets/icons/booking-history.png")}
                                />
                                <Text
                                    style={[
                                        styles.accountLinkText,
                                        { fontSize: 14, justifyContent: "center", flex: 1 },
                                    ]}
                                >
                                    Bookings
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.accountLinks,
                                    styles.flexRow,
                                    {
                                        borderBottomColor: "#C9C9C920",
                                        borderBottomWidth: 1,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                    },
                                ]}
                                onPress={() => navigation.navigate('Offers')}
                            >
                                <Image
                                    style={{ marginRight: 10 }}
                                    source={require("../../assets/icons/offer-icon.png")}
                                />
                                <Text
                                    style={[
                                        styles.accountLinkText,
                                        { fontSize: 14, justifyContent: "center", flex: 1 },
                                    ]}
                                >
                                    Offers
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.accountLinks,
                                    styles.flexRow,
                                    {
                                        borderBottomColor: "#C9C9C920",
                                        borderBottomWidth: 1,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                    },
                                ]}
                                onPress={() => setModalComingsoon(true)}
                            >
                                <Image
                                    style={{
                                        marginRight: 10,
                                        width: 18,
                                        height: 18,
                                        resizeMode: "contain",
                                    }}
                                    source={require("../../assets/icons/wallet.png")}
                                />
                                <Text
                                    style={[
                                        styles.accountLinkText,
                                        { fontSize: 14, justifyContent: "center", flex: 1 },
                                    ]}
                                >
                                    Wallet
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.accountLinks,
                                    styles.flexRow,
                                    {
                                        borderBottomColor: "#C9C9C920",
                                        borderBottomWidth: 1,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                    },
                                ]}
                                onPress={() => navigation.navigate('SettingPage')}
                            >
                                <Image
                                    style={{ marginRight: 10 }}
                                    source={require("../../assets/icons/settings.png")}
                                />
                                <Text
                                    style={[
                                        styles.accountLinkText,
                                        { fontSize: 14, justifyContent: "center", flex: 1 },
                                    ]}
                                >
                                    Settings
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.accountLinks,
                                    styles.flexRow,
                                    {
                                        borderBottomColor: "#C9C9C920",
                                        borderBottomWidth: 1,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                    },
                                ]}
                                onPress={() => navigation.navigate('SupportPage')}
                            >
                                <Image
                                    style={{ marginRight: 10 }}
                                    source={require("../../assets/icons/Support.png")}
                                />
                                <Text
                                    style={[
                                        styles.accountLinkText,
                                        { fontSize: 14, justifyContent: "center", flex: 1 },
                                    ]}
                                >
                                    Support
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.accountLinks,
                                    styles.flexRow,
                                    { paddingTop: 20, paddingBottom: 10 },
                                ]}
                                onPress={() => setLoginModal(true)}
                            >
                                <Image
                                    style={{
                                        marginRight: 10,
                                        width: 18,
                                        height: 18,
                                        resizeMode: "contain",
                                    }}
                                    source={require("../../assets/icons/logout.png")}
                                />
                                <Text
                                    style={[
                                        styles.accountLinkText,
                                        { fontSize: 14, justifyContent: "center", flex: 1, color: '#2eb0e4' },
                                    ]}
                                    onPress={() => { setUser(false) }}
                                >
                                    Logout
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <SocialMedia />
                    <View style={styles.section}>
                        <View style={styles.flexRowSpace}>
                            <Whatsapp />
                        </View>
                        <View>
                            <Text
                                style={
                                    ([styles.copyrightsText],
                                    {
                                        fontSize: 12,
                                        color: "#d3d3d3",
                                        fontWeight: "bold",
                                        paddingLeft: 5,
                                        marginTop: 5,
                                    })
                                }
                            >
                                VERSION 2.0.0 Copyright HomeGenie
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        : 
        <ScrollView style={styles.ScrollView}>
            <View style={[styles.screen]}>
                <View style={[styles.bgLiteBlue]}>
                    <View
                        style={[
                            styles.flexRowSpace,
                            { padding: 15, paddingTop: 5, paddingBottom: 5 },
                        ]}
                    >
                        <View
                            style={[css.flexDRSB, css.imgFull]}
                        >
                            <View style={[css.flexDR]}>
                                <View style={{ borderRadius: 50 }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{ borderRadius: 50, width: 50, marginRight: 15 }}
                                        source={require("../../assets/icons/genieicon.png")}
                                    />
                                </View>
                                <View style={[styles.flexDirectionColumn], { marginVertical: 10 }}>
                                    <Text
                                        style={[
                                            styles.accountName,
                                            { fontWeight: "bold", marginTop: 15, fontSize: 20 },
                                        ]}
                                    >
                                        Guest
                                    </Text>
                                </View>
                            </View>
                            <View style={[css.alignSelfC]}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('NotificationPage')}
                                >
                                    <Image
                                        resizeMode="contain"
                                        style={{}}
                                        source={require("../../assets/icons/notify.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={[styles.container]}>
                        <Pressable
                            style={[
                                styles.accountLinks,
                                styles.flexRow,
                                {
                                    borderBottomColor: "#C9C9C920",
                                    borderBottomWidth: 1,
                                    paddingTop: 20,
                                    paddingBottom: 10,
                                },
                            ]}
                            onPress={() => navigation.navigate('Bookings')}
                        >
                            <Image
                                style={{ marginRight: 10 }}
                                source={require("../../assets/icons/booking-history.png")}
                            />
                            <Text
                                style={[
                                    styles.accountLinkText,
                                    { fontSize: 14, justifyContent: "center", flex: 1 },
                                ]}
                            >
                                Bookings
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.accountLinks,
                                styles.flexRow,
                                {
                                    borderBottomColor: "#C9C9C920",
                                    borderBottomWidth: 1,
                                    paddingTop: 20,
                                    paddingBottom: 10,
                                },
                            ]}
                            onPress={() => navigation.navigate('Offers')}
                        >
                            <Image
                                style={{ marginRight: 10 }}
                                source={require("../../assets/icons/offer-icon.png")}
                            />
                            <Text
                                style={[
                                    styles.accountLinkText,
                                    { fontSize: 14, justifyContent: "center", flex: 1 },
                                ]}
                            >
                                Offers
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.accountLinks,
                                styles.flexRow,
                                {
                                    borderBottomColor: "#C9C9C920",
                                    borderBottomWidth: 1,
                                    paddingTop: 20,
                                    paddingBottom: 10,
                                },
                            ]}
                            onPress={() => navigation.navigate('WalletPage')}
                        >
                            <Image
                                style={{
                                    marginRight: 10,
                                    width: 18,
                                    height: 18,
                                    resizeMode: "contain",
                                }}
                                source={require("../../assets/icons/wallet.png")}
                            />
                            <Text
                                style={[
                                    styles.accountLinkText,
                                    { fontSize: 14, justifyContent: "center", flex: 1 },
                                ]}
                            >
                                Wallet
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.accountLinks,
                                styles.flexRow,
                                {
                                    borderBottomColor: "#C9C9C920",
                                    borderBottomWidth: 1,
                                    paddingTop: 20,
                                    paddingBottom: 10,
                                },
                            ]}
                            onPress={() => navigation.navigate('SettingPage')}
                        >
                            <Image
                                style={{ marginRight: 10 }}
                                source={require("../../assets/icons/settings.png")}
                            />
                            <Text
                                style={[
                                    styles.accountLinkText,
                                    { fontSize: 14, justifyContent: "center", flex: 1 },
                                ]}
                            >
                                Settings
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.accountLinks,
                                styles.flexRow,
                                {
                                    borderBottomColor: "#C9C9C920",
                                    borderBottomWidth: 1,
                                    paddingTop: 20,
                                    paddingBottom: 10,
                                },
                            ]}
                            onPress={() => navigation.navigate('SupportPage')}
                        >
                            <Image
                                style={{ marginRight: 10 }}
                                source={require("../../assets/icons/Support.png")}
                            />
                            <Text
                                style={[
                                    styles.accountLinkText,
                                    { fontSize: 14, justifyContent: "center", flex: 1 },
                                ]}
                            >
                                Support
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.accountLinks,
                                styles.flexRow,
                                { paddingTop: 20, paddingBottom: 10 },
                            ]}
                            onPress={() => setLoginModal(true)}
                        >
                            <Image
                                style={{
                                    marginRight: 10,
                                    width: 18,
                                    height: 18,
                                    resizeMode: "contain",
                                }}
                                source={require("../../assets/icons/signin.png")}
                            />
                            <Text
                                style={[
                                    styles.accountLinkText,
                                    { fontSize: 14, justifyContent: "center", flex: 1 },
                                ]}
                            >
                                Login/Signup
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.section]}>
                    < Whatsapp />
                </View>
            </View>
        </ScrollView>}
        <View style={styles.centeredView}>
            {
                loginModal && <LoginModal changeData={loginModal} falseData={(data) => setLoginModal(data)} userData={(data) => setUser(data)} />
            }
        </View>
    </SafeAreaView>
  );
}

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
        height: 780,
        paddingLeft: 20,
        backgroundColor: "#2eb0e4",
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 10,
        shadowColor: "#000",
        color: "#fff",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        textTransform: "uppercase",
        // fontFamily: 'PoppinsSB',
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
    textCenter: {
        textAlign: 'center'
    },
    backButton: {
        marginRight: 10,
        marginTop:17,
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
    brand: {
        color: '#2eb0e4'
    },
    offerCopyCode: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderColor: '#2eb0e4',
        borderWidth: 1,
        width: '40%',
        marginTop: 10,
        marginBottom: 15
    },
    offerCopyCodeText: {
        fontSize: 12,
        lineHeight: 12,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#2eb0e4',
    },
    offerBooknow: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 50,
        backgroundColor: '#f6b700',
        borderColor: '#f6b700',
        borderWidth: 1,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginBottom: 15,
    },
    offerBooknowText: {
        fontSize: 16,
        lineHeight: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#fff',
    },
    //ModalCss
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalContentContainer: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    //country picker style
    titleText: {
        color: '#000',
        fontSize: 25,
        marginBottom: 25,
        fontWeight: 'bold',
    },
    pickerTitleStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    pickerStyle: {
        height: 60,
        width: '30%',
        marginBottom: 10,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
    selectedCountryTextStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000',
        textAlign: 'right',
    },

    countryNameTextStyle: {
        paddingLeft: 10,
        color: '#000',
        textAlign: 'right',
    },

    searchBarStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 10,
    },
});
  
  export default Login;