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
import GetgenieFooter from './GetgenieFooter';
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import StatusBarAll from "@components/StatusBar";
import css from '@components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';
export default function Getgeniescreen4(props) {
    const [modalComingsoon, setModalComingsoon] = useState(false);
    return (
        <View>
            <StatusBarAll />
            <GetgenieHeader />
            <ScrollView>
                <View style={[css.section], { marginTop: 190 }}>
                    <View style={[css.container]}>
                        <View>
                            <Image style={{ width: '100%', height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10, }} source={require('@assets/icons/images/acCoolingBooking.png')} />
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
                                <View style={[styles.ratingHeader], { backgroundColor: '#2eb0e4', alignItems: 'center', padding: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}><Text style={[css.whiteC]}>4.0 <Image style={{ width: 10, height: 10 }} source={require('@assets/icons/star-fill.png')} /></Text></View>
                                <View style={[styles.ratingFooter, css.flexDC, css.centeredView, css.padding5]}><Text style={[css.f10]}>658</Text><Text style={[css.f10]}>reviews</Text></View>
                            </View>
                            <Pressable onPress={() => props.navigation.goBack()} style={[styles.backButton], {
                                position: 'absolute', top: 10, left: 10, borderRadius: 50, width: 30, height: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Image source={require('@assets/icons/backArrowBlack.png')} />
                            </Pressable>
                        </View>
                        <View style={[styles.screen4box]}>
                            <View><Text style={{ fontSize: 18, fontFamily: 'PoppinsSB', color: '#2eb0e4' }}>Kindly review and confirm your booking.</Text></View>
                            <View style={[css.spaceT10]}>
                                <View style={[css.flexDR, css.line10]}>
                                    <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('@assets/icons/images/acBooking.png')} />
                                    <Text style={[css.fbo, css.f18]}>AC | </Text>
                                    <Text numberOfLines={1} style={[css.fm, css.f18, css.width70]}>AC Cooling Repair</Text>
                                </View>
                                <View style={[css.line10]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f18, css.fbo, css.blackC]}>Booking summary</Text></View>
                                        <View style={[css.flexDR, css.alignSelfC]}>
                                            <Image style={{ width: 15, height: 15 }} source={require('@assets/icons/edit.png')} />
                                            <Text style={[css.brandC, css.f14, css.marginL5]}>Edit</Text>
                                        </View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Type</Text></View>
                                        <View style={[css.flexDR]}><Image source={require('@assets/icons/service-info.png')} /><Text style={[css.alignSelfC, css.blackC, css.fm]}>Inspection based service</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Priority</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.orangeC, css.fm]}>Scheduled</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line10]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f16, css.fsb, css.brandC]}>Scope</Text></View>
                                        <View style={[css.flexDR, css.alignSelfC]}>
                                            <Image style={{ width: 15, height: 15 }} source={require('@assets/icons/edit.png')} />
                                            <Text style={[css.brandC, css.f14, css.marginL5]}>Edit</Text>
                                        </View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>What is the issue?</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>Low cooling</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Number of units to inspect ?</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>1</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Is this a furnished location ?</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>No</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line10]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f16, css.fsb, css.brandC]}>Schedule</Text></View>
                                        <View style={[css.flexDR, css.alignSelfC]}>
                                            <Image style={{ width: 15, height: 15 }} source={require('@assets/icons/edit.png')} />
                                            <Text style={[css.brandC, css.f14, css.marginL5]}>Edit</Text>
                                        </View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Date</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>Sun Jan 23 2022</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Time</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>8AM - 10AM </Text></View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text numberOfLines={1} style={[css.f16, css.fsb, css.brandC]}>Additional info & images (optional)</Text></View>
                                        <TouchableOpacity style={[css.flexDR, css.alignSelfC]} onPress={() => { props.navigation.navigate("GetgeniePage5") }}>
                                            <Image style={{ width: 15, height: 15 }} source={require('@assets/icons/edit.png')} />
                                            <Text style={[css.brandC, css.f14, css.marginL5]}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.screen4box]}>
                            <View style={[css.spaceT10]}>
                                <View>
                                    <View><Text style={[css.f18, css.fbo, css.blackC]}>Payment summary</Text></View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Plan</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>Upon completion</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Method</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>Cash/Card</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f16, css.fsb, css.brandC]}>Pricing</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line10, css.spaceT5]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fbo, css.f12]}>Item</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fbo, css.f12]}>AED</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Labor (including inspection)</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fr]}>129</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Discount (self*)</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fr]}>0.65 </Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.blackC, css.fbo]}>Total Amount (incl. VAT)</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>To be decided</Text></View>
                                    </View>
                                </View>
                                <View><Text style={[css.f12, css.liteBlackC]}>*For website and app bookings only.</Text></View>
                            </View>
                        </View>
                        <View style={[styles.screen4box]}>
                            <View style={[css.spaceT10]}>
                                <View style={[css.flexDR]}>
                                    <View><Image style={[css.marginR10]} source={require('@assets/icons/warranty.png')} /></View>
                                    <View style={[css.flexDC, css.alignSelfC]}>
                                        <Text style={[css.liteBlackC]}>As provided in the bill estimate.</Text>
                                        <Text style={[css.liteBlackC]}>For more details, visit</Text>
                                        <Pressable><Text style={[css.brandC, css.f16]}>HomeGenie Warranty Policy</Text></Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[css.flexDR, css.spaceT20,]}>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require('@assets/icons/expert-professionals-icon.png')} />
                                <Text style={[css.brandC]}>Scope Details</Text>
                            </View>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require('@assets/icons/service-info.png')} />
                                <Text style={[css.brandC]}>Terms of use</Text>
                            </View>
                        </View>
                        <View style={[css.flexDR, css.spaceT10, css.spaceB30]}>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require('@assets/icons/pricing-icon.png')} />
                                <Text style={[css.brandC]}>Pricing Details</Text>
                            </View>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require('@assets/icons/help-icon.png')} />
                                <Text style={[css.brandC]}>FAQ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[css.section, styles.fixedContainer,]}>
                <View style={[css.container, css.whiteBG, styles.fixedHeader, css.padding30,]}>
                    <View style={[css.flexDRSB]}>
                        <Pressable style={[css.flexDC]}><Text>Total</Text><Text>AED 190</Text></Pressable>
                        <TouchableOpacity style={[styles.continueBtn]} onPress={() => { props.navigation.navigate("GetgeniePage5") }}><Text style={[styles.continueBtnText]}>NEXT</Text></TouchableOpacity>
                        <Pressable style={[css.flexDC]}><Image style={[css.img30]} source={require('@assets/icons/percenttags.png')} /><Text style={[css.brandC]}>Offer</Text></Pressable>
                    </View>
                </View>
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
        </View >
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
        width: '100%',
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
    screen4box: { marginTop: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#fff', padding: 10, paddingBottom: 20, borderRadius: 10, width: '100%', },
})

