import React, { Component, useState, useEffect } from "react";
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
    Dimensions,
    StatusBar,
    Pressable,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from "react-redux";
import axios from "axios";
import { getLogin } from "../actions/hgAction";
import Whatsapp from "../components/whtsApp";
import Text from "../components/MyText";
import SocialMedia from '../components/socialMedia';
import LoginModal from "../components/loginModal";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
let booked = 'no'
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const getMyBooking = () => {
//     let otpData = String(OtpCodeOne) + String(OtpCodeTwo) + String(OtpCodeThree) + String(OtpCodeFour);
//     let data = new FormData();
//     data.append("deviceType", "WEBSITE");
//     data.append("deviceToken", "151");
//     data.append("phoneNo", phone);
//     data.append("OTPCode", otpData);
//     data.append('countryCode', countryPlus + countryCodeNew)
//     data.append("timezone", "Asia/Calcutta");
//     data.append("latitude", "17.3753");
//     data.append("longitude", "78.4744");
//     //console.log(data)
//     fetch('https://api.homegenie.com/api/customer/verifyOTP1', {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//         },
//         body: data
//     })
//         .then(response => response.json())
//         .then(res => {
//             console.log('userDataLoginModal', res)
//             if (res.message == "Success") {
//                 setOtpModal(false)
//                 setUser('in')
//                 props.userData(true)
//                 setOtpCodeOne(null);
//                 setOtpCodeTwo(null);
//                 setOtpCodeThree(null);
//                 setOtpCodeFour(null);
//                 setDisplayEmail(res.data.userDetails.email);
//                 setDisplayName(res.data.userDetails.name);
//                 props.getName(res.data.userDetails.name);
//                 props.getEmail(res.data.userDetails.email);
//                 props.getPhone(res.data.userDetails.phoneNo);
//                 props.falseData(false)
//             }
//             console.log('userDataEmail', res.data.userDetails.email)
//             console.log('userDataName', res.data.userDetails.name)
//             console.log('userId', res.data.userDetails._id);
//             //setUserData(res.data);
//             //localStorage.setItem("user", JSON.stringify(res.data));
//         })
//         .catch(e => {
//             console.log(e)
//         })
// }

// useEffect(() => {
//     getMyBooking();
// }, []);

//const MyBookingScreen = (props) => {
const MyBookingScreen = ({ props, route }) => {
    const [userData, setUserData] = useState();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: '1', title: 'Current Bookings' },
        { key: '2', title: 'Past Bookings' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return (
                    <View style={[styles.scene, styles.bookingTabs]}>
                        {booked != 'yes' ?
                            <View style={[styles.bookingTabsContent], { alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <View style={{
                                    width: 150, height: 150,
                                    borderRadius: 200,
                                    backgroundColor: '#fff', justifyContent: 'center',
                                    alignItems: 'center', marginTop: 50,
                                }}>
                                    <Image
                                        style={[styles.bookingTabsImage], { width: 100, height: 100, }}
                                        source={require(imgPath + 'empty-ongoing.png')}
                                    />
                                </View>
                                <Text style={[styles.bookingTabsText]} >No Bookings yet. {"\n"}start Booking and {"\n"} Enjoy HomeGenie Services</Text>
                                <Pressable
                                    style={[styles.button, { backgroundColor: '#f6b700', }]}
                                    onPress={() => props.navigation.navigate('GetgenieScreen')}
                                >
                                    <Text style={[styles.buttonText], {
                                        fontSize: 16,
                                        lineHeight: 21,
                                        fontWeight: 'bold',
                                        letterSpacing: 0.25,
                                        color: 'white',
                                    }}>Book Now</Text>
                                </Pressable>
                            </View>
                            :
                            <View style={[css.container]}>
                                <View style={[styles.screen4box]}>
                                    <View style={[styles.bookingHead, css.line10, css.padding10]}>
                                        <View style={[css.flexDR]}>
                                            <Image style={[css.img30, css.marginR10]} source={require(imgPathImage + 'acBooking.png')} />
                                            <Text style={[css.f18]}>AC</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.bookingBody, css.padding10]}>
                                        <View style={[css.flexDR]}>
                                            <Text style={[css.width30, css.f16, css.liteBlackC]}>Job ID</Text>
                                            <Text style={[css.f16, css.fbo]}>221014926</Text>
                                        </View>
                                        <View style={[css.flexDR]}>
                                            <Text style={[css.width30, css.liteBlackC]}>Service</Text>
                                            <Text>AC service (preventive)</Text>
                                        </View>
                                        <View style={[css.flexDR]}>
                                            <Text style={[css.width30, css.liteBlackC]}>Location</Text>
                                            <Text>Azarudeen</Text>
                                        </View>
                                        <View style={[css.flexDR]}>
                                            <Text style={[css.width30, css.liteBlackC]}>Status</Text>
                                            <Text>ASSIGNED</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.bookingFooter, css.padding10, css.liteGreyBG,]}>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <TouchableOpacity
                                                style={{ borderWidth: 1, borderColor: '#2eb0e4', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, }}
                                                onPress={() => console.log(props.navigation.navigate("JobdetailPage"))}
                                            >
                                                <Text style={[css.brandC, css.f16]}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }

                    </View>
                )
            case '2':
                return (
                    <View style={[styles.scene, styles.bookingTabs]}>
                        <View style={[styles.bookingTabsContent], { alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                            <View style={{
                                width: 150, height: 150,
                                borderRadius: 200,
                                backgroundColor: '#fff', justifyContent: 'center',
                                alignItems: 'center', marginTop: 50,
                            }}>
                                <Image
                                    style={[styles.bookingTabsImage], { width: 100, height: 100, }}
                                    source={require(imgPath + 'empty-past.png')}
                                />
                            </View>
                            <Text style={[styles.bookingTabsText]} >No Past Bookings yet. {"\n"}start your journey by {"\n"} Booking a services {"\n"} @ HomeGenie</Text>
                            <Pressable style={[styles.button]}
                                onPress={() => props.navigation.navigate('GetgenieScreen')}
                            >
                                <Text style={[styles.buttonText]}>Book Now</Text>
                            </Pressable>
                        </View>
                    </View>
                )
            default:
                return null;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFBFF" }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        style={[styles.textWhite, styles.backButton]}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            style={{}}
                            source={require(imgPath + "backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle]}>Bookings</Text>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color }) => (
                            <Text style={[css.fr, css.f14, css.blackC]}>
                                {route.title}
                            </Text>
                        )}
                        activeColor={{ color: 'green', backgroundColor: 'yellow' }}
                        indicatorStyle={{ backgroundColor: 'rgba(46,176,228,.2)', height: 4 }}
                        style={{ backgroundColor: 'transparent', width: '80%', alignSelf: 'center', elevation: 0 }}
                    />
                )}
                onIndexChange={(index) => setIndex(index)}
                style={[styles.container, css.marginT20]}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scene: {
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
        fontFamily: 'PoppinsSB',
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
    screen4box: { marginTop: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#fff', borderRadius: 10, width: '100%', },
    bookingFooter: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
    bookingTabsText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 22,
        marginVertical: 20,
        color: '#525252',
        fontFamily: 'PoppinsM'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        backgroundColor: '#2eb0e4',
        marginVertical: 80,
        width: '90%'
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'PoppinsBO',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default MyBookingScreen;