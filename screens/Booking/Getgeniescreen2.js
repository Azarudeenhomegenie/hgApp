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
    Dimensions,
} from "react-native";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import GetgenieHeader from './GetgenieHeader';
import { RadioButton } from 'react-native-paper';
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import DatePicker from 'react-native-date-picker';
import GetgenieFooter from './GetgenieFooter';
import StatusBarAll from "../../components/StatusBar";
import css from '../../components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';
export default function Getgeniescreen2(props) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return (
        <View>
            <StatusBarAll />
            <GetgenieHeader />
            <ScrollView>
                <View style={[css.section], { marginTop: 190 }}>
                    <View style={[css.container]}>
                        <View>
                            <Image style={{ width: '100%', height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10, }} source={require(imgPathImage + 'acCoolingBooking.png')} />
                            <View style={[styles.rating], {
                                position: 'absolute', top: 10, right: 10, borderRadius: 10, width: 50, height: 50, backgroundColor: '#fff', shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}>
                                <View style={[styles.ratingHeader], { backgroundColor: '#2eb0e4', alignItems: 'center', padding: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}><Text style={[css.whiteC]}>4.0 <Image style={{ width: 10, height: 10 }} source={require(imgPath + 'star-fill.png')} /></Text></View>
                                <View style={[styles.ratingFooter, css.flexDC, css.centeredView, css.padding5]}><Text style={[css.f10]}>658</Text><Text style={[css.f10]}>reviews</Text></View>
                            </View>
                            <Pressable onPress={() => props.navigation.goBack()} style={[styles.backButton], {
                                position: 'absolute', top: 10, left: 10, borderRadius: 50, width: 30, height: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Image source={require(imgPath + 'backArrowBlack.png')} />
                            </Pressable>
                        </View>
                        <View style={{
                            marginTop: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            backgroundColor: '#fff',
                            padding: 10,
                            paddingBottom: 20,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                        }}>
                            <View><Text style={{ fontSize: 18, fontFamily: 'PoppinsBO', color: '#2eb0e4' }}>When do you need the service ?</Text></View>
                            <View style={[styles.selectedDateList, css.alignItemsC, css.spaceT10]}>
                                <Text style={[css.alignItemsC]}>TUE, 2PM - 4PM, 18 JANUARY 2022</Text>
                            </View>
                            <View style={[css.spaceT10, css.alignItemsC]}>
                                <SwiperFlatList autoplay autoplayDelay={3} autoplayLoop={false} showPagination={false} paginationStyleItem={{ backgroundColor: 'grey' }} style={{ width: '75%' }}>
                                    <View style={[styles.serviceAllDates]}>
                                        <Text style={[styles.serviceDay]}>Thu</Text>
                                        <Text style={[styles.serviceDate]}>21</Text>
                                    </View>
                                    <View style={[styles.serviceAllDates]}>
                                        <Text style={[styles.serviceDay]}>Fri</Text>
                                        <Text style={[styles.serviceDate]}>22</Text>
                                    </View>
                                    <View style={[styles.serviceAllDatesSelected]}>
                                        <Text style={[styles.serviceDaySelected]}>Sat</Text>
                                        <Text style={[styles.serviceDateSelected]}>23</Text>
                                    </View>
                                </SwiperFlatList>
                            </View>
                            <View style={[css.flexDRSE, css.imgFull, css.spaceT5, css.flexWrapW]}>
                                <Pressable style={[styles.splitTime]}><Text>8AM - 10AM</Text></Pressable>
                                <Pressable style={[styles.splitTimeSelected]}><Text style={[styles.splitTimeSelectedText]}>10AM - 12PM</Text></Pressable>
                                <Pressable style={[styles.splitTime]}><Text>12PM - 2PM</Text></Pressable>
                                <Pressable style={[styles.splitTime]}><Text>2PM - 4PM</Text></Pressable>
                                <Pressable style={[styles.splitTime]}><Text>4PM - 6PM</Text></Pressable>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'PoppinsM' }}>Want to select date using a calendar ? </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[css.section, css.container]}>
                    <View style={[css.flexDR,]}>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'expert-professionals-icon.png')} />
                            <Text style={[css.brandC]}>Scope Details</Text>
                        </View>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'service-info.png')} />
                            <Text style={[css.brandC]}>Terms of use</Text>
                        </View>
                    </View>
                    <View style={[css.flexDR, css.spaceT10, css.spaceB10]}>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'pricing-icon.png')} />
                            <Text style={[css.brandC]}>Pricing Details</Text>
                        </View>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'help-icon.png')} />
                            <Text style={[css.brandC]}>FAQ</Text>
                        </View>
                    </View>
                </View>
                <View style={[css.section, styles.fixedContainer,]}>
                    <View style={[css.container, css.whiteBG, styles.fixedHeader, css.padding30,]}>
                        <View style={[css.flexDRSB]}>
                            <Pressable style={[css.flexDC]}><Text>Total</Text><Text>AED 190</Text></Pressable>
                            <TouchableOpacity style={[styles.continueBtn]} onPress={() => { props.navigation.navigate("GetgeniePage3") }}><Text style={[styles.continueBtnText]}>NEXT</Text></TouchableOpacity>
                            <Pressable style={[css.flexDC]}><Image style={[css.img30]} source={require(imgPath + 'percenttags.png')} /><Text style={[css.brandC]}>Offer</Text></Pressable>
                        </View>
                    </View>
                </View >
            </ScrollView >
        </View>
    );
}
const styles = StyleSheet.create({
    activeText: {
        color: '#fff',
    },
    fixedContainer: { flex: 1, zIndex: 1 },
    fixedFooter: { position: 'absolute', bottom: 0, left: 0, right: 0 },
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
    },
    serviceAllDates: {
        backgroundColor: '#fff', width: 65, height: 65, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 7, marginBottom: 5, marginLeft: 7,
    },
    serviceAllDatesSelected: { backgroundColor: '#fff', width: 65, height: 65, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 7, marginBottom: 5, marginLeft: 7, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 3, },
    serviceDay: { fontSize: 10, color: '#60604e', marginBottom: 3 },
    serviceDate: { fontSize: 18, fontFamily: 'PoppinsBO' },
    serviceDaySelected: { fontSize: 10, color: '#525252', marginBottom: 3, fontFamily: 'PoppinsBO' },
    serviceDateSelected: { fontSize: 18, fontFamily: 'PoppinsBO', color: '#2eb0e4' },
    splitTime: { width: '45%', borderWidth: 1, borderColor: '#ccc', height: 45, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10, },
    splitTimeSelected: { width: '45%', height: 45, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eff7fc', marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 1, },
    splitTimeSelectedText: { color: '#2eb0e4', fontFamily: 'PoppinsSB', },
})
