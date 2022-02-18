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
    FlatList
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
import css, { brandC } from "../components/commonCss";
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useDispatch, useSelector } from "react-redux";
import { getCurrentBookings, loadBookings } from '../reducers/bookingsReducer'

//Selectors
import { getLoggedInStatus, getUser, getAccessToken } from '../reducers/authReducer';
// import { FlatList } from "-";

const MyBookingScreen = ({ props, navigation, currentBookings, pastBookings, token }) => {
    const [userName, setUserName] = useState(token);
    //console.log('Props', token)
    // const isLoggedIn = useSelector(getLoggedInStatus);
    // const user = useSelector(getUser);
    // const token = useSelector(getAccessToken);
    //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjYwN2QxMGZjNTlkMTVhOTAxNDBiYjhjMSIsInR5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY0NDQzNzQyNX0.8ofowAJZCqukx09NbDP1ddduRbx6Fr6dnBt2yUygSkE'
    // const currentBookings = useSelector(getCurrentBookings);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: '1', title: 'Current Bookings' },
        { key: '2', title: 'Past Bookings' },
    ]);


    useEffect(async () => {
        if (token) {
            //console.log('TKN:', token)
            dispatch(loadBookings(token));
        }
    }, []);


    const renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return (
                    <View style={[styles.scene, styles.bookingTabs]}>
                        {currentBookings == '' ?
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
                                    onPress={() => navigation.navigate('GetgenieScreen')}
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
                            <View style={{ padding: 10 }}>
                                <FlatList
                                    data={currentBookings}
                                    keyExtractor={(item, index) => {
                                        return item._id;
                                    }}
                                    renderItem={({ item }) => (
                                        <View style={[styles.screen4box, {}]}>
                                            <View style={[styles.bookingHead, css.line10, css.padding10]}>
                                                <View style={[css.flexDR]}>
                                                    <Image style={[css.img30, css.marginR10]} source={{ uri: item.category.imageURL.thumbnail }} />
                                                    <Text style={[css.f16, css.blackC, css.fsb,]}>{item.category.name}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.bookingBody, css.padding10]}>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f14, css.liteBlackC, css.fm]}>Job ID</Text>
                                                    <Text style={[css.width75, css.f14, css.blackC, css.fbo]}>{item.uniqueCode}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f12, css.liteBlackC, css.fr]}>Service</Text>
                                                    <Text style={[css.width75, css.f12, css.blackC, css.fm]}>{item.subcategory.subCategoryName}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f12, css.liteBlackC, css.fr]}>Location</Text>
                                                    <Text style={[css.width75, css.f12, css.blackC, css.fm]}>{item.nickName}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f12, css.liteBlackC, css.fr]}>Status</Text>
                                                    <View style={[css.flexDR]}>
                                                        <Text style={[css.imgFull, css.f12, css.blackC, css.fm, css.alignSelfC]}>{item.status}{'  '}
                                                            {item.status === 'PAYMENT_PENDING' ?
                                                                <Text onPress={() => navigation.navigate('JobdetailPage')} style={[css.brandC, css.f10, css.fr]}>Pay Final Payment</Text>
                                                                : null}
                                                            {item.status === 'INSPECTION' ?
                                                                <Text onPress={() => navigation.navigate('JobdetailPage')} style={[css.brandC, css.f10, css.fr]}>Await Estimate</Text>
                                                                : null}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[styles.bookingFooter, css.padding10, css.liteGreyBG,]}>
                                                <View style={[css.flexDR, { justifyContent: 'flex-end' }]}>
                                                    {item.status === 'PAYMENT_PENDING' ?
                                                        <Pressable
                                                            style={[css.maroonBG, css.cButtonWH, css.borderRadius5, css.marginR10]}
                                                            onPress={() => navigation.navigate("JobdetailPage")}
                                                        >
                                                            <Text style={[css.whiteC, css.f14, css.fm]}>Pay Now</Text>
                                                        </Pressable>
                                                        : null
                                                    }
                                                    <Pressable
                                                        style={[css.whiteBG, css.cButtonWH, { borderWidth: 1, borderColor: '#2eb0e4', width: 100, height: 40 }]}
                                                        onPress={() => navigation.navigate("JobdetailPage", {
                                                            token: token, jobId: item._id
                                                        })}
                                                    >
                                                        <Text style={[css.brandC, css.f14, css.fm]}>View Details</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    )} />
                            </View>
                        }
                    </View>
                )
            case '2':
                return (
                    <View style={[styles.scene, styles.bookingTabs]}>
                        {pastBookings == '' ?
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
                                    onPress={() => navigation.navigate('GetgenieScreen')}
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
                                <FlatList
                                    data={pastBookings}
                                    keyExtractor={(item, index) => {
                                        return item._id;
                                    }}
                                    renderItem={({ item }) => (

                                        <View style={[styles.screen4box]}>
                                            <View style={[styles.bookingHead, css.line10, css.padding10]}>
                                                <View style={[css.flexDR]}>
                                                    <Image style={[css.img30, css.marginR10]} source={{ uri: item.category.imageURL.thumbnail }} />
                                                    <Text style={[css.f16, css.blackC, css.fsb,]}>{item.category.name}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.bookingBody, css.padding10]}>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f14, css.liteBlackC, css.fr]}>Job ID</Text>
                                                    <Text style={[css.width75, css.f14, css.blackC, css.fbo]}>{item.uniqueCode}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f12, css.liteBlackC, css.fr]}>Service</Text>
                                                    <Text style={[css.width75, css.f12, css.blackC, css.fm]}>{item.subcategory.subCategoryName}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f12, css.liteBlackC, css.fr]}>Location</Text>
                                                    <Text style={[css.width75, css.f12, css.blackC, css.fm]}>{item.nickName}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.width25, css.f12, css.liteBlackC, css.fr]}>Status</Text>
                                                    <Text style={[css.width75, css.f12, css.blackC, css.fm]}>{item.status}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.bookingFooter, css.padding10, css.liteGreyBG,]}>
                                                <View style={[css.flexDR, { justifyContent: 'flex-end' }]}>
                                                    <Pressable
                                                        style={[css.whiteBG, css.cButtonWH, { borderWidth: 1, borderColor: '#2eb0e4', width: 100, height: 40 }]}
                                                        onPress={() => navigation.navigate("JobdetailPage", {
                                                            token: token, jobId: item._id
                                                        })}
                                                    >
                                                        <Text style={[css.brandC, css.f14, css.fm]}>View Details</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    )} />
                            </View>
                        }

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
                        onPress={() => navigation.goBack()}
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
    screen4box: { shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#fff', borderRadius: 10, width: '96%', marginRight: '2%', marginLeft: '2%', marginTop: '2%', marginBottom: '2%' },
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

export default connect(
    state => ({
        currentBookings: state.bookings.currentBookings,
        pastBookings: state.bookings.pastBookings,
        token: state.auth.token
    }),
    null
)(MyBookingScreen);