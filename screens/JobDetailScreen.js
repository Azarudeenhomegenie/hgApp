import React, { Component } from "react";
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
    TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Text from "../components/MyText";
import StatusBarAll from "../components/StatusBar";
import { List } from 'react-native-paper';
import { connect } from "react-redux";
import css, { justifyContentC, padding10 } from '../components/commonCss';
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function JobDetailScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFBFF" }}>
            <StatusBarAll />
            <View style={[css.section, styles.fixedContainer]}>
                <View style={[css.container, css.liteBlueBG, styles.fixedHeader, css.line]}>
                    <View style={[css.flexDR]}>
                        <Pressable onPress={() => props.navigation.goBack()} style={[css.alignSelfC]}><Image style={[css.marginR20]} source={require(imgPath + 'backArrowBlack.png')} /></Pressable>
                        <View><Image style={[css.img40, css.marginR10]} source={require(imgPathImage + 'acBooking.png')} /></View>
                        <View><Text style={[css.f24]}>AC</Text></View>
                    </View>
                    <View style={[css.flexDR,]}>
                        <View><Text style={[css.fm, css.marginR20, css.blackC, css.f24]}>Job Id</Text></View>
                        <View><Text style={[css.f24, css.fbo, css.brandC]}>221014926</Text></View>
                    </View>
                    <View style={[css.flexDC,]}>
                        <View><Text style={[css.fm, css.greyC]}>Booking For: 1/10/2022, 5:27:43 PM</Text></View>
                        <View><Text style={[css.f18, css.fm, css.greyC]}>Status: ASSIGNED</Text></View>
                    </View>
                </View>
            </View >
            <ScrollView>
                <View style={[css.section]}>
                    <View style={css.container}>
                        <View>
                            <Image style={{ width: '100%', height: 120, borderRadius: 10 }} source={require(imgPathImage + 'Ac_service.png')} />
                        </View>
                        <View style={[css.spaceT10]}><Text style={[css.f18, css.blackC]}>AC service (preventive)</Text></View>
                        <View style={[css.spaceT10]}><Text style={[css.f18, css.blackC]}>Genie has been assigned to you.</Text></View>
                        <View style={[css.spaceT10]}><Text style={[css.f24, css.blackC, css.fsb]}>Your HomeGenie</Text></View>
                        <View style={[styles.genieAssigned]} style={{ width: '100%', height: 120, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 10 }}><Text>Genie</Text></View>
                    </View>
                </View>
                <View style={[css.section]}>
                    <View style={[css.container]}>
                        <List.AccordionGroup>
                            <List.Accordion title="Booking Summary" id="1">
                                <View style={[css.line5, css.spaceT20]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f18, css.fm, css.brandC]}>Service</Text></View>
                                        <View style={[css.flexDR, css.alignSelfC]}>
                                            <Image source={require(imgPath + 'service-info.png')} />
                                            <Text style={[css.brandC, css.f14]}>Service Details</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Type</Text></View>
                                        <View style={[css.flexDR]}><Image source={require(imgPath + 'service-info.png')} /><Text style={[css.alignSelfC, css.blackC, css.fm]}>Inspection based service</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Priority</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.orangeC, css.fm]}>Scheduled</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Frequency</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>One Time</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Reason for the service ?</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>1. Dirty air</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Number of units to service ?</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>1</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Need external units serviced aswell ?</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>No</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line5, css.spaceT20]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f16, css.fsb, css.brandC]}>Date and Location</Text></View>
                                    </View>
                                </View>
                                <View style={[css.spaceB20]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Date and Time</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>Wed 12 Jan 2022 | 8AM - 10AM</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Address</Text></View>
                                        <View style={[css.flexDC]}>
                                            <Text style={[css.blackC, css.fsb, css.textRight]}>VILLA </Text>
                                            <Text style={[css.blackC, css.fr, css.textRight]}>123, Hor Al Anz </Text>
                                            <Text style={[css.blackC, css.fr, css.textRight]}>bb2, Dubai, UAE </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', padding: 20, flexDirection: 'column', marginBottom: 30 }}>
                                    <Text style={[css.brandC, css.f18]}>Your Note:</Text>
                                    <Text style={[css.blackC, css.f16]}>Testing by HomeGenie</Text>
                                </View>
                            </List.Accordion>
                            <List.Accordion title="Payment Summary" id="2">
                                <View style={[css.line5, css.spaceT20]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f18, css.fm, css.brandC]}>Pricing</Text></View>
                                        <View style={[css.flexDR, css.alignSelfC]}>
                                            <Image source={require(imgPath + 'tag.png')} />
                                            <Text style={[css.brandC, css.f14]}>Pricing Details</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fbo]}>Item</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>AED</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Service Charges</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>149</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Discount (online *)</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>0.74</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fbo]}>Total Charges</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>148.26</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Vat charges</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>7.41</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fbo]}>Total charges (incl VAT)</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>155.67</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fbo]}>Due Amount</Text></View>
                                        <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>155.67</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line5, css.spaceT10]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f16, css.fsb, css.brandC]}>Payment</Text></View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Plan</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.brandC]}>Upon Completion</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Status</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.brandC]}>PENDING</Text></View>
                                    </View>
                                </View>
                                <View style={[css.line5, css.spaceT10]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.f16, css.fsb, css.brandC]}>Document</Text></View>
                                    </View>
                                </View>
                                <View style={[css.spaceB20, css.line5,]}>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>Bill Estimate</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC]}>NA</Text></View>
                                    </View>
                                    <View style={[css.flexDRSB]}>
                                        <View><Text style={[css.greyC, css.fm]}>VAT invoice(s)</Text></View>
                                        <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC]}>NA</Text></View>
                                    </View>
                                </View>
                                <View style={[css.spaceT10]}>
                                    <View style={[css.flexDR]}>
                                        <View><Image style={[css.marginR20]} source={require(imgPath + 'warranty.png')} /></View>
                                        <View style={[css.flexDC, css.alignSelfC]}>
                                            <Text style={[css.liteBlackC, css.fbo]}>Warranty</Text>
                                            <Text style={[css.liteBlackC]}>30 days Warranty</Text>
                                            <Pressable style={[css.flexDR]}><Text style={[css.liteBlackC, css.f16]}>Visit </Text><Text style={[css.brandC, css.f16]}> HomeGenie Warranty Policy</Text></Pressable>
                                        </View>
                                    </View>
                                </View>
                            </List.Accordion>
                        </List.AccordionGroup>
                        <Pressable style={{ width: '100%', padding: 15, backgroundColor: '#d1d1d150', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}><Text style={{ color: '#525252', fontFamily: 'PoppinsBO', fontSize: 18 }}>Cancel Request</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
