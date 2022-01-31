import React, { Component } from "react";
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
    Dimensions,
    StatusBar,
    Pressable,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
let booked = 'yes'
let imagePath = '../assets/icons/'
let imagePathImage = '../assets/icons/images/'


export default function BookingScreen(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Current Bookings' },
        { key: '2', title: 'Past Bookings' },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{ marginTop: 25, backgroundColor: 'red' }}
        />
    );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return (
                    <View style={[styles.scene, styles.bookingTabs]}>
                        {booked != 'yes' ?
                            <View style={[styles.bookingTabsContent], { alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Image
                                    style={[styles.bookingTabsImage], { width: 150, height: 150, marginVertical: 40 }}
                                    source={require(imagePath + 'empty-ongoing.png')}
                                />
                                <Text style={[styles.bookingTabsText], { textAlign: 'center', fontSize: 16, lineHeight: 22, marginVertical: 20, color: '#303030' }} >No Bookings yet. {"\n"}start Booking and {"\n"} Enjoy HomeGenie Services</Text>
                                <Pressable style={[styles.button], {
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 12,
                                    paddingHorizontal: 32,
                                    borderRadius: 10,
                                    elevation: 3,
                                    backgroundColor: '#f6b700',
                                    marginVertical: 80,
                                    width: '90%'
                                }}
                                >
                                    <Text style={[styles.text], {
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
                                            <Image style={[css.img30, css.marginR10]} source={require(imagePathImage + 'acBooking.png')} />
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
                                            <Pressable
                                                style={{ borderWidth: 1, borderColor: '#2eb0e4', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, }}
                                                onPress={() => console.log(props.navigation.navigate("JobdetailPage"))}
                                            >
                                                <Text style={[css.brandC, css.f16]}>View Details</Text>
                                            </Pressable>
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
                            <Image
                                style={[styles.bookingTabsImage], { width: 150, height: 150, marginVertical: 40 }}
                                source={require(imagePath + 'empty-past.png')}
                            />
                            <Text style={[styles.bookingTabsText], { textAlign: 'center', fontSize: 16, lineHeight: 22, marginVertical: 20, color: '#303030' }} >No Past Bookings yet. {"\n"}start your journey by {"\n"} Booking a services {"\n"} @ HomeGenie</Text>
                            <Pressable style={[styles.button], {
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 12,
                                paddingHorizontal: 32,
                                borderRadius: 10,
                                elevation: 3,
                                backgroundColor: '#f6b700',
                                marginVertical: 80,
                                width: '90%'
                            }}
                            //onPress={() => props.navigation.navigate('BookingPage')} 
                            >
                                <Text style={[styles.text], {
                                    fontSize: 16,
                                    lineHeight: 21,
                                    fontWeight: 'bold',
                                    letterSpacing: 0.25,
                                    color: 'white',
                                }}>Book Now</Text>
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
                            source={require(imagePath + "backArrow.png")}
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
                            <Text style={{ color: 'black', margin: 8 }}>
                                {route.title}
                            </Text>
                        )}
                        activeColor={{ color: 'green', backgroundColor: 'yellow' }}
                        indicatorStyle={{ backgroundColor: 'rgba(46,176,228,.2)', height: 4 }}
                        style={{ backgroundColor: 'transparent' }}
                    />
                )}
                onIndexChange={(index) => setIndex(index)}
                style={[styles.container]}
            />
        </SafeAreaView >
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
    bookingFooter: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }
});