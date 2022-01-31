import React, { Component, useState, useRef, useEffect } from "react";
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
    TextInput,
    PixelRatio,
    Dimensions,
} from "react-native";
import { useForm } from 'react-hook-form';
import Modal from 'react-native-modal';
import SocialMedia from "../components/socialMedia";
import Whatsapp800 from "../components/whtsApp";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
import CountryPicker from 'rn-country-picker';
import { Ionicons } from '@expo/vector-icons';
import ModalComingSoon from "../components/ModalComingSoon";
import LoginModal from "../components/loginModal";
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const user = 'inn';
const size = 50;
const cat = {
    uri: "https://reactnative.dev/docs/assets/p_cat1.png",
    width: size,
    height: size
};

const AccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [nameCheck, setNameCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [phone, setPhone] = useState(null);
    const [otp, setOtp] = useState(null);
    const [user, setUser] = useState('inn');
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [otpModal, setOtpModal] = useState(false);
    const [OtpCodeOne, setOtpCodeOne] = useState(null);
    const [OtpCodeTwo, setOtpCodeTwo] = useState(null);
    const [OtpCodeThree, setOtpCodeThree] = useState(null);
    const [OtpCodeFour, setOtpCodeFour] = useState(null);
    const [displayName, setDisplyName] = useState(null);
    const [displayEmail, setDisplayEmail] = useState(null);
    const [otpSend, setOtpSend] = useState(true);
    const [modalComingsoon, setModalComingsoon] = useState(false);

    const [show, setShow] = useState(true);
    const [countryCode, setCountryCode] = useState('');
    const [selectedCallingCode, setSelectedCallingCode] = useState('');
    const [countryCodeNew, setCountryCodeNew] = useState('971')
    const [countryPlus, setCountryPlus] = useState('+')
    const firtOtp = useRef();
    const secondOtp = useRef();
    const thirdOtp = useRef();
    const fourthOtp = useRef();

    const LoginApi = () => {
        let data = new FormData();
        data.append('phoneNo', phone);
        data.append('countryCode', countryPlus + countryCodeNew)
        console.log(countryPlus + countryCodeNew);
        console.log(phone);

        fetch('https://api.homegenie.com/api/customer/validatePhoneNo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: data
        })
            .then(response => response.json())
            .then(res => {
                console.log(res.data.isRegistered)
                if (res.data.isRegistered) {
                    setLoginModal(false)
                    setOtpCodeOne(null);
                    setOtpCodeTwo(null);
                    setOtpCodeThree(null);
                    setOtpCodeFour(null);
                    setOtpModal(true);
                } else {
                    setLoginModal(false)
                    setOtpCodeOne(null);
                    setOtpCodeTwo(null);
                    setOtpCodeThree(null);
                    setOtpCodeFour(null);
                    setRegisterModal(true);
                }
            })
    }

    const ResetOtpApi = () => {
        console.log('resend Api call')
        let data = new FormData();
        data.append('phoneNo', phone);
        data.append('countryCode', countryPlus + countryCodeNew)
        fetch('https://api.homegenie.com/api/customer/validatePhoneNo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: data
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setOtpSend(false)
            })
    }

    const OtpVrifyApi = () => {
        let otpData = String(OtpCodeOne) + String(OtpCodeTwo) + String(OtpCodeThree) + String(OtpCodeFour);
        let data = new FormData();
        data.append("deviceType", "WEBSITE");
        data.append("deviceToken", "151");
        data.append("phoneNo", phone);
        data.append("OTPCode", otpData);
        data.append('countryCode', countryPlus + countryCodeNew)
        data.append("timezone", "Asia/Calcutta");
        data.append("latitude", "17.3753");
        data.append("longitude", "78.4744");
        //console.log(data)
        fetch('https://api.homegenie.com/api/customer/verifyOTP1', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
            },
            body: data
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if (res.message == "Success") {
                    setOtpModal(false)
                    setUser('in')
                    setOtpCodeOne(null);
                    setOtpCodeTwo(null);
                    setOtpCodeThree(null);
                    setOtpCodeFour(null);
                    setDisplayEmail(res.data.userDetails.email);
                    setDisplyName(res.data.userDetails.name);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const signUpApi = () => {
        if (userName == null) {
            setNameCheck(true)
        } if (email == null) {
            setEmailCheck(true)
        } else {
            setNameCheck(false)
            setEmailCheck(false)
            let params = new FormData();
            params.append("name", userName);
            params.append("email", email);
            params.append("phoneNo", phone);
            params.append("countryCode", countryPlus + countryCodeNew)
            params.append("deviceType", "WEBSITE");
            params.append("appVersion", "100");
            params.append("timezone", "Asia/Calcutta");
            params.append("country", "Dubai");
            params.append("latitude", "17.3753");
            params.append("longitude", "78.4744");
            params.append("deviceToken", '151');
            fetch('https://api.homegenie.com/api/customer/registerViaPhone', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: params
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                    if (res.message == 'Success') {
                        setRegisterModal(false);
                        setOtpModal(true);
                    } if (res.message != 'Success') {
                        console.log('already loggedin');
                    }
                })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        style={[styles.textWhite, styles.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            style={{}}
                            source={require(imgPath + "backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle]}>My Accounts</Text>
                </View>
            </View>
            {(() => {
                if (user == 'in') {
                    return (
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
                                                    source={require(imgPath + "genieicon.png")}
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
                                                source={require(imgPath + "notify.png")}
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
                                                source={require(imgPath + "booking-history.png")}
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
                                                source={require(imgPath + "offer-icon.png")}
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
                                                source={require(imgPath + "wallet.png")}
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
                                                source={require(imgPath + "settings.png")}
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
                                                source={require(imgPath + "Support.png")}
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
                                                source={require(imgPath + "logout.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.accountLinkText,
                                                    { fontSize: 14, justifyContent: "center", flex: 1, color: '#2eb0e4' },
                                                ]}
                                                onPress={() => { setUser('inn') }}
                                            >
                                                Logout
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <SocialMedia />
                                <View style={styles.section}>
                                    <View style={styles.flexRowSpace}>
                                        <Whatsapp800 />
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
                    )
                }

                return (
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
                                                    source={require(imgPath + "genieicon.png")}
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
                                        {/* <View style={[css.alignSelfC]}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('NotificationPage')}
                                            >
                                                <Image
                                                    resizeMode="contain"
                                                    style={{}}
                                                    source={require("../assets/notify.png")}
                                                />
                                            </TouchableOpacity>
                                        </View> */}
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.section]}>
                                <View style={[styles.container]}>
                                    {/* <Pressable
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
                                            source={require("../assets/booking-history.png")}
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
                                            source={require("../assets/offer-icon.png")}
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
                                            source={require("../assets/wallet.png")}
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
                                            source={require("../assets/settings.png")}
                                        />
                                        <Text
                                            style={[
                                                styles.accountLinkText,
                                                { fontSize: 14, justifyContent: "center", flex: 1 },
                                            ]}
                                        >
                                            Settings
                                        </Text>
                                    </Pressable> */}
                                    <View style={styles.container}>
                                        <Text>Current Pixel Ratio is:</Text>
                                        <Text style={styles.value}>{PixelRatio.get()}</Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.value}>
                                            {PixelRatio.getPixelSizeForLayoutSize(size)} px
                                        </Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text>Current Font Scale is:</Text>
                                        <Text style={styles.value}>{PixelRatio.getFontScale()}</Text>
                                    </View>
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
                                            source={require(imgPath + "Support.png")}
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
                                            source={require(imgPath + "signin.png")}
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
                                < Whatsapp800 />
                            </View>
                        </View>
                    </ScrollView>
                );
            })()}
            <View style={styles.centeredView}>
                {
                    loginModal && <LoginModal changeData={loginModal} falseData={(data) => setLoginModal(data)} userData={(data) => setUser(data)} />
                }
            </View>

            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Coming soon - stay tuned</Text>
                        <Pressable
                            style={[css.yellowBtn]}
                            onPress={() => setModalComingsoon(!modalComingsoon)}
                        >
                            <Text style={[css.whiteC, css.f16]}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
export default AccountScreen;
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
        height: 70,
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
        fontFamily: 'PoppinsSB',
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



