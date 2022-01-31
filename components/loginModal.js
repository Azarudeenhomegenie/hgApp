import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect, useRef } from "react";
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
    FlatList,
    TextInput
} from "react-native";
import Modal from 'react-native-modal';
import css from '../components/commonCss';
import CountryPicker from 'rn-country-picker';

const LoginModal = (props) => {
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
        // https://api.homegenie.com/api/customer/validatePhoneNo
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
                    
                    setOtpCodeOne(null);
                    setOtpCodeTwo(null);
                    setOtpCodeThree(null);
                    setOtpCodeFour(null);
                    setOtpModal(true);
                } else {
                    
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
                    props.userData(true)
                    setOtpCodeOne(null);
                    setOtpCodeTwo(null);
                    setOtpCodeThree(null);
                    setOtpCodeFour(null);
                    setDisplayEmail(res.data.userDetails.email);
                    setDisplyName(res.data.userDetails.name);
                    props.falseData(false)
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
        <>
        <Modal
        animationType="fade"
        isVisible={props.changeData} hasBackdrop={true}
        >
        <View >
            <View style={[styles.modalView], { padding: 15 }}>
                <View style={[styles.signupModalContainer], { borderRadius: 10, backgroundColor: '#fff' }}>
                    <View style={[styles.modalHeader], { backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>props.falseData(false)}
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: 20, height: 20 }}
                                source={require("../assets/icons/backArrowBlack.png")}
                            />
                        </Pressable>
                        <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 24, marginTop: 20 }}>Login/Signup to HomeGenie</Text>
                        <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 14, color: '#7e7e7e', marginTop: 10 }}>Login/Signup to access your stored addressess and service booking details.</Text>
                        {/* <CountryPicker
                                show={show}
                                pickerButtonOnPress={(item) => {
                                    console.log(item)
                                    setCountryCode(item.dial_code);
                                    setShow(false);
                                }}
                                style={{
                                    modal: {
                                        height: 500,
                                    },
                                    textInput: {
                                        height: 80,
                                        borderRadius: 0,
                                    },
                                    countryButtonStyles: {
                                        height: 80
                                    },
                                }}
                            /> */}

                    </View>
                    <View style={[styles.modalBody], { alignItems: 'center', padding: 20 }}>
                        <View style={[styles.flexRow]}>
                            <CountryPicker
                                disable={false}
                                animationType={'slide'}
                                containerStyle={styles.pickerStyle}
                                pickerTitleStyle={styles.pickerTitleStyle}
                                selectedCountryTextStyle={styles.selectedCountryTextStyle}
                                countryNameTextStyle={styles.countryNameTextStyle}
                                pickerTitle={'Country Picker'}
                                searchBarPlaceHolder={'Search......'}
                                hideCountryFlag={false}
                                hideCountryCode={false}
                                searchBarStyle={styles.searchBarStyle}
                                countryCode={countryCodeNew}
                                //selectedValue={(index) => setCountryCodeNew('+' + index)}
                                selectedValue={(index) => setCountryCodeNew(index)}
                            />
                            <TextInput
                                style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 5, width: '60%', padding: 10, height: 60 }}
                                placeholder="Enter Mobile number"
                                keyboardType="numeric"
                                value={phone}
                                onChange={(text) => setPhone(text.nativeEvent.text)}
                            />
                        </View>

                        <Pressable
                            style={[styles.offerBooknow]}
                            //onPress={() => onSubmitLogin()}
                            onPress={() => LoginApi()}
                        >
                            <Text style={[styles.textStyle, styles.offerBooknowText]}>Login/Signup</Text>
                        </Pressable>


                    </View>
                    {/* <View style={[styles.modalFooter], { backgroundColor: '#F4F4F4', padding: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Pressable
                            onPress={() => { setLoginModal(false), setRegisterModal(true) }}
                        ><Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 14, color: '#7e7e7e' }}>Don't have an account? <Text style={{ color: '#2eb0e4' }}>Signup</Text></Text></Pressable>
                    </View> */}
                </View>
            </View>
        </View>
    </Modal>
            <Modal
                    animationType="fade"
                    isVisible={registerModal} hasBackdrop={true}
                >
                    <View>
                        <View style={[styles.modalView], { padding: 15 }}>
                            <View style={[styles.signupModalContainer], { borderRadius: 10, backgroundColor: '#fff' }}>
                                <View style={[styles.modalHeader], { backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20 }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setRegisterModal(!registerModal)}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20 }}
                                            source={require("../assets/icons/backArrowBlack.png")}
                                        />
                                    </Pressable>
                                    <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 24, marginTop: 20 }}>SIGNUP</Text>
                                    <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 14, color: '#7e7e7e', marginTop: 10 }}>Signup and enjoy all the features including our amazing offers.</Text>
                                </View>
                                <View style={[styles.modalBody], { alignItems: 'center', padding: 20 }}>
                                    <TextInput
                                        style={[styles.input], { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, width: '90%', height: 40, marginBottom: 20, padding: 5 }}
                                        id="Name"
                                        placeholder="Name"
                                        keyboardType="default"
                                        required
                                        autoCapitalize="none"
                                        errorMessage="please enter your name."
                                        onChange={(text) => setUserName(text.nativeEvent.text)}
                                        value={userName}
                                    />
                                    {nameCheck && <Text style={{ color: 'red' }}>Please enter your name</Text>}
                                    <TextInput
                                        style={[styles.input], { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, width: '90%', height: 40, marginBottom: 20, padding: 5 }}
                                        id="Email"
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        required
                                        autoCapitalize="none"
                                        errorMessage="please enter your email-id."
                                        onChange={(text) => setEmail(text.nativeEvent.text)}
                                        value={email}
                                    />
                                    {emailCheck && <Text style={{ color: 'red' }}>Please enter your Email</Text>}
                                    <Pressable
                                        style={[styles.offerBooknow]}
                                        onPress={() => signUpApi()}
                                    >
                                        <Text style={[styles.textStyle, styles.offerBooknowText]}>SIGNUP</Text>
                                    </Pressable>
                                </View>
                                <View style={[styles.modalFooter], { backgroundColor: '#F4F4F4', padding: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    <Pressable
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                            props.falseData(false)
                                        }}
                                        onPress={() => { setRegisterModal(!registerModal), props.falseData(true) }}
                                    >
                                        <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 14, color: '#7e7e7e' }}>Already have an account? <Text style={{ color: '#2eb0e4' }}>Login</Text></Text></Pressable>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    isVisible={otpModal} hasBackdrop={true}
                >
                    <View >
                        <View style={[styles.modalView], { padding: 15 }}>
                            <View style={[styles.signupModalContainer], { borderRadius: 10, backgroundColor: '#fff' }}>
                                <View style={[styles.modalHeader], { backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20 }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setOtpModal(!otpModal)}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20 }}
                                            source={require("../assets/icons/backArrowBlack.png")}
                                        />
                                    </Pressable>
                                    <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 24, marginTop: 20 }}>ONE TIME PASSCODE (OTP)</Text>
                                    <Text style={{ alignItems: 'center', textAlign: 'center', fontSize: 14, color: '#7e7e7e', marginTop: 10 }}>Please enter 4 digit code sent via SMS</Text>
                                </View>
                                <View style={[styles.modalBody], { alignItems: 'center', padding: 20 }}>
                                    <View style={styles.flexRow}>
                                        <TextInput
                                            style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center' }}
                                            placeholder=""
                                            keyboardType="numeric"
                                            value={OtpCodeOne}
                                            maxLength={1}
                                            onChange={(text) => {
                                                setOtpCodeOne(text.nativeEvent.text);
                                                secondOtp.current.focus();
                                            }}
                                        />
                                        <TextInput
                                            style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center' }}
                                            placeholder=""
                                            keyboardType="numeric"
                                            value={OtpCodeTwo}
                                            maxLength={1}
                                            onChange={(text) => {
                                                setOtpCodeTwo(text.nativeEvent.text);
                                                thirdOtp.current.focus();
                                            }}
                                            ref={secondOtp}
                                        />
                                        <TextInput
                                            style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center' }}
                                            placeholder=""
                                            keyboardType="numeric"
                                            value={OtpCodeThree}
                                            maxLength={1}
                                            onChange={(text) => {
                                                setOtpCodeThree(text.nativeEvent.text);
                                                fourthOtp.current.focus();
                                            }}
                                            ref={thirdOtp}
                                        />
                                        <TextInput
                                            style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center' }}
                                            placeholder=""
                                            keyboardType="numeric"
                                            value={OtpCodeFour}
                                            maxLength={1}
                                            onChange={(text) => setOtpCodeFour(text.nativeEvent.text)}
                                            ref={fourthOtp}
                                        />
                                    </View>

                                    <Pressable
                                        style={[styles.offerBooknow]}
                                        //onPress={() => onSubmitLogin()}
                                        onPress={() => OtpVrifyApi()}
                                    >
                                        <Text style={[styles.textStyle, styles.offerBooknowText]}>CONFIRM</Text>
                                    </Pressable>
                                    {/* <Text style={{ color: 'green' }}>{otpSend ? 'OTP Sent' : 'OTP Sent Again'}</Text> */}
                                    <Text style={{ color: 'green' }}>{otpSend ? 'OTP Sent' : 'OTP Sent Again'}</Text>


                                </View>
                                <View style={[styles.modalFooter], { padding: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    <Pressable
                                        style={[styles.brand]}
                                        //onPress={() => onSubmitLogin()}
                                        onPress={() => ResetOtpApi()}
                                    >
                                        <Text style={[styles.brand, styles.textCenter]}>Resend OTP</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
        </>
        
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

export default LoginModal;