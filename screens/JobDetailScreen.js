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
    TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Text from "../components/MyText";
import moment from 'moment';
import 'moment-timezone';
import StatusBarAll from "../components/StatusBar";
import { List } from 'react-native-paper';
import { connect } from "react-redux";
import css, { blackC, borderRadius30, imgFull } from '../components/commonCss';
import { FlatList } from "react-native-gesture-handler";
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let Genie = 'yes'

export default function JobDetailScreen({ route, props, navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [jobdetailsData, setJobdetailsData] = useState([]);
    const token = route.params.token
    const jobId = route.params.jobId
    const getJobdetails = async () => {
        try {
            console.log('Tokeninside', token);
            console.log('jobIdinside', jobId);
            const header = { headers: { Authorization: `Bearer ${token}` } };
            const api = 'https://api.homegenie.com/api/customer/getJobDetails'
            const data = new FormData();
            data.append('appointmentId', jobId);
            const response = await fetch(api, {
                method: 'post',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
                body: data
            });
            const jsonData = await response.json();
            let array = jsonData.data;
            // console.log('jobDetail', array);
            setJobdetailsData(array);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobdetails();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFBFF" }}>
            <StatusBarAll />
            <View style={[css.section, styles.fixedContainer]}>
                <FlatList
                    data={jobdetailsData}
                    keyExtractor={(item, index) => {
                        return item._id;
                    }}
                    renderItem={({ item }) => (
                        <View style={[css.container, css.liteBlueBG, styles.fixedHeader, css.line, css.paddingB10, css.paddingT10]}>
                            <View style={[css.flexDR]}>
                                <Pressable onPress={() => navigation.goBack()} style={[css.alignSelfC]}><Image style={[css.marginR20]} source={require(imgPath + 'backArrowBlack.png')} /></Pressable>
                                <View><Image style={[css.img30, css.marginR10]} source={{ uri: item.categoryImage.thumbnail }} /></View>
                                <View><Text style={[css.f18, css.fm, css.blackC]}>{item.categoryName}</Text></View>
                            </View>
                            <View style={[css.flexDR, css.marginT5]}>
                                <View><Text style={[css.fr, css.marginR20, css.blackC, css.f24]}>Job Id</Text></View>
                                <View><Text style={[css.f24, css.fbo, css.brandC]}>{item.uniqueCode}</Text></View>
                            </View>
                            <View style={[css.flexDC,]}>
                                <View><Text style={[css.fr, css.greyC, css.f12]}>Booking For: {item.utc_timing.requestedTime ?
                                    moment(new Date(item.utc_timing.requestedTime)).format("DD/MM/YYYY, LTS")
                                    :
                                    null}</Text>
                                </View>
                                <View><Text style={[css.f12, css.fr, css.greyC]}>Status: {item.status}</Text></View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <ScrollView>
                <View style={[css.section]}>
                    <View style={css.container}>
                        <FlatList
                            data={jobdetailsData}
                            keyExtractor={(item, index) => {
                                return item._id;
                            }}
                            renderItem={({ item }) => (
                                <View>
                                    <Image style={[css.imgFull, css.borderRadius10, { height: 120 }]} source={{ uri: item.subCategory.image }} />
                                    <View style={[css.spaceT10]}><Text style={[css.f18, css.blackC, css.fr]}>{item.subCategory.subCategoryName}</Text></View>
                                    {item.driverData == '' ? null : <View style={[css.spaceT10]}><Text style={[css.f16, css.blackC, css.fr]}>Genie has been assigned to you.</Text></View>}
                                    <View style={[css.spaceT10]}><Text style={[css.f20, css.blackC, css.fsb]}>Your HomeGenie</Text></View>
                                    {item.driverData == '' ?
                                        <View style={[styles.genieNotAssigned]}>
                                            <View style={[css.imgFull, css.alignCenter, css.liteBlueBG, css.padding10, css.borderRadius10]}>
                                                <View style={[css.flexDR, css.imgFull]}>
                                                    <View style={[css.whiteBG, css.imgg90, css.marginR10, { borderRadius: 50 }]}><Image style={[css.imgg80]} source={require(imgPath + 'homegenie-logo.png')} /></View>
                                                    <View style={[css.flexDC, css.alignSelfC]}>
                                                        <Text style={[css.f18, css.fm, css.blackC, css.line]}>Your HomeGenie</Text>
                                                        <Text style={[css.f16, css.fr, css.blackC]}>To be assigned</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View><Text style={[css.fr, css.f12, css.blackC, css.marginT5]}>We will intimate you via email and sms the professional coming over for the service.</Text></View>
                                        </View>
                                        :
                                        <View style={[styles.genieAssigned, css.borderGrey1, css.borderRadius10, css.imgFull]}>
                                            <View style={[css.flexDR, styles.genieHeader, css.padding20]}>
                                                <View style={[css.flexDC, css.marginR20, css.width30]}>
                                                    < Image style={[styles.genieLogo, css.img100, css.borderBlack1, { borderRadius: 50, }]} source={{ uri: item.driverData.profilePicURL.original }} />
                                                    <Pressable style={[css.alignCenter, css.marginT5]}><Text style={[css.brandC, css.f12, css.fm]}>View Profile</Text></Pressable>
                                                </View>
                                                <View style={[css.width60]}>
                                                    <View style={[css.line10, css.paddingT20]}>
                                                        <Text style={[css.fbo, css.f20, css.blackC]}>{item.driverData.name}</Text>
                                                        <Text style={[css.fr, css.f16, css.blackC]}>+971 {item.driverData.phoneNo}</Text>
                                                    </View>
                                                    <View style={[css.flexDR]}>
                                                        <Image style={[css.img20]} source={require(imgPath + 'star-fill.png')} />
                                                        <Text style={[css.fr, css.f12, css, blackC, css.alignSelfC, css.marginL5]}>{(item.driverData.rating / item.driverData.ratingPersonNo).toFixed(1)}/5 rated</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Pressable style={[styles.genieFooter, css.brandBG, css.alignCenter, css.imgFull, { height: 60, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
                                                <Text onPress={() => Linking.openURL('tel:+971' + item.driverData.phoneNo)} style={[css.feb, css.f18, css.whiteC]}><Image source={require(imgPath + 'call-white.png')} />{' '} CALL NOW</Text>
                                            </Pressable>
                                        </View>
                                    }
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={[css.section]}>
                    <View style={[css.container, { marginBottom: 50 }]}>
                        <List.AccordionGroup>
                            <FlatList
                                data={jobdetailsData}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <View>
                                        <List.Accordion title="Booking Summary" id="1"
                                            titleStyle={[css.blackC, css.fsb, css.f14]}
                                            style={[css.whiteBG, css.padding10]}
                                            right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }}
                                                source={require(imgPath + 'arrowDown_hg.png')} />}
                                        >
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
                                                    <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{item.scheduleDate}Wed 12 Jan 2022 | 8AM - 10AM</Text></View>
                                                </View>
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm]}>Address</Text></View>
                                                    <View style={[css.flexDC]}>
                                                        <Text style={[css.blackC, css.fsb, css.textRight]}>{item.address.addressType}</Text>
                                                        <Text style={[css.blackC, css.fr, css.textRight]}>{item.address.apartmentNo}, {item.address.streetAddress}</Text>
                                                        <Text style={[css.blackC, css.fr, css.textRight]}>{item.address.community}, {item.address.city}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', padding: 20, flexDirection: 'column', marginBottom: 30 }}>
                                                <Text style={[css.brandC, css.f18]}>Your Note:</Text>
                                                <Text>{item.problemDetails}</Text>
                                            </View>
                                        </List.Accordion>
                                        <List.Accordion title="Payment Summary" id="2"
                                            titleStyle={[css.blackC, css.fsb, css.f14]}
                                            style={[css.whiteBG, css.padding10]}
                                            right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }}
                                                source={require(imgPath + 'arrowDown_hg.png')} />}
                                        >
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
                                                    <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{item.charges.unitCharges}</Text></View>
                                                </View>
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm]}>Discount (online *)</Text></View>
                                                    <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{item.charges.discountCharges}</Text></View>
                                                </View>
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fbo]}>Total Charges</Text></View>
                                                    <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>{item.charges.totalCharges}</Text></View>
                                                </View>
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm]}>Vat charges</Text></View>
                                                    <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{item.charges.vatCharges}</Text></View>
                                                </View>
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fbo]}>Total charges (incl VAT)</Text></View>
                                                    <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>{item.charges.finalCharges}</Text></View>
                                                </View>
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fbo]}>Due Amount</Text></View>
                                                    <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>{item.charges.vatFinalCharges}</Text></View>
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
                                                    <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.brandC]}>{item.payment_status}</Text></View>
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
                                                        <Text style={[css.liteBlackC, css.fbo, css.f14]}>Warranty</Text>
                                                        <Text style={[css.liteBlackC, css.f14, css.fr]}>{item.warranty.warrantyText}</Text>
                                                        <Pressable style={[css.flexDR]}><Text style={[css.liteBlackC, css.f14, css.fr]}>Visit </Text><Text style={[css.brandC, css.f14, css.fr]}> HomeGenie Warranty Policy</Text></Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        </List.Accordion>
                                    </View>
                                )}
                            />
                        </List.AccordionGroup>
                    </View>
                </View>
            </ScrollView>
            {/* <FlatList
                data={jobdetailsData}
                keyExtractor={(item, index) => {
                    return item._id;
                }}
                renderItem={({ item }) => (
                    <View>
                        {item.status == "CANCELLED" ?
                            <View style={[styles.cancelButtonContainer]}><Pressable style={[styles.cancelButton]}><Text style={[css.blackC, css.fbo, css.f18]}>Cancel Request</Text></Pressable></View>
                            :
                            <View style={[styles.cancelButtonContainer]}><Pressable style={[styles.cancelButton]}><Text style={[css.blackC, css.fbo, css.f18]}>No</Text></Pressable></View>
                        }
                    </View>
                )}
            /> */}
            {Genie == 'no' ? null :
                <View style={[styles.cancelButtonContainer]}><Pressable style={[styles.cancelButton]}><Text style={[css.blackC, css.fbo, css.f18]}>Cancel Request</Text></Pressable></View>
            }
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    scene: { flex: 1 },
    cancelButtonContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, marginLeft: 20, marginRight: 20 },
    cancelButton: { width: '100%', height: 50, backgroundColor: '#d1d1d1', alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
});
