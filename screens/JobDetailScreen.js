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
    FlatList,
    TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Text from "../components/MyText";
import moment from 'moment';
import 'moment-timezone';
import Modal from 'react-native-modal';
import StatusBarAll from "../components/StatusBar";
import { List } from 'react-native-paper';
import { connect, useDispatch, useSelector } from "react-redux";
import css from '../components/commonCss';
//import { FlatList } from "react-native-gesture-handler";
import { loadJobDetails, getJobDetail, getGenie } from "../reducers/jobDetailReducer";
import { BASE_URL } from '../base_file';
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//let Genie = 'yes'

export default function JobDetailScreen({ route, props, navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [serviceDetailModal, setserviceDetailModal] = useState(false);
    const toggleserviceDetailModal = () => { setserviceDetailModal(!serviceDetailModal) };
    const [pricingDetailModal, setpricingDetailModal] = useState(false);
    const togglepricingDetailModal = () => { setpricingDetailModal(!pricingDetailModal) };
    const [typeModal, settypeModal] = useState(false);
    const toggletypeModal = () => { settypeModal(!typeModal) };
    const [genieData, setGenieData] = useState(null);
    const [genieModal, setGenieModal] = useState(false);
    const dispatch = useDispatch();
    let jobdetailsData = useSelector(getJobDetail);
    jobdetailsData = jobdetailsData ? jobdetailsData : null
    console.log('jobdetailsData_jobDetailScreen', jobdetailsData);
    const token = route.params.token
    const jobId = route.params.jobId
    console.log('jobId_jobDetailScreen', jobId);
    const getGenieData = async (genieId) => {
        console.log('Token for Genie', token);
        console.log('genieId', genieId);
        let gid = genieId;
        try {
            let formData = new FormData();
            formData.append('Auth', token);
            const api = `${BASE_URL}customer/getDriverDetails?id=${gid}`
            const response = await fetch(api, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
                ///body: formData
            });
            const jsonData = await response.json();
            let array = jsonData.data;
            console.log('genieData', array);
            setGenieData(array);
            setGenieModal(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const loadJobdetails = () => {
            dispatch(loadJobDetails(token, jobId));
        };
        loadJobdetails();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFBFF" }}>
            <StatusBarAll />
            <View style={[css.section, styles.fixedContainer]}>
                {jobdetailsData &&
                    <View style={[css.container, css.liteBlueBG, styles.fixedHeader, css.line, css.paddingB10, css.paddingT10]}>
                        <View style={[css.flexDR]}>
                            <Pressable onPress={() => navigation.goBack()} style={[css.alignSelfC]}><Image style={[css.marginR20]} source={require(imgPath + 'backArrowBlack.png')} /></Pressable>
                            <View><Image style={[css.img30, css.marginR10]} source={{ uri: jobdetailsData.categoryImage.thumbnail }} /></View>
                            <View><Text style={[css.f18, css.fm, css.blackC]}>{jobdetailsData.categoryName}</Text></View>
                        </View>
                        <View style={[css.flexDR, css.marginT5]}>
                            <View><Text style={[css.fr, css.marginR20, css.blackC, css.f24]}>Job Id</Text></View>
                            <View><Text style={[css.f24, css.fbo, css.brandC]}>{jobdetailsData.uniqueCode}</Text></View>
                        </View>
                        <View style={[css.flexDC,]}>
                            <View><Text style={[css.fr, css.greyC, css.f12]}>Booking For: {jobdetailsData.utc_timing.requestedTime ?
                                //moment(new Date(jobdetailsData.utc_timing.requestedTime)).format("DD/MM/YYYY")
                                (jobdetailsData.utc_timing.requestedTime.join(", "))
                                :
                                null}</Text>
                            </View>
                            <View><Text style={[css.f12, css.fr, css.greyC]}>Status: {jobdetailsData.status ? jobdetailsData.status : ''}</Text></View>
                        </View>
                    </View>
                }
            </View>
            <ScrollView>
                <View style={[css.section]}>
                    <View style={css.container}>
                        {jobdetailsData &&
                            <View>
                                <Image style={[css.imgFull, css.borderRadius10, { height: 120 }]} source={{ uri: jobdetailsData.subCategory.image }} />
                                <View style={[css.spaceT10]}><Text style={[css.f18, css.blackC, css.fr]}>{jobdetailsData.subCategory.subCategoryName}</Text></View>
                                {jobdetailsData.driverData ? <View style={[css.spaceT10]}><Text style={[css.f16, css.blackC, css.fr]}>Genie has been assigned to you.</Text></View> : null}
                                <View style={[css.spaceT10]}><Text style={[css.f20, css.blackC, css.fsb]}>Your HomeGenie</Text></View>
                                {jobdetailsData.driverData ?
                                    <View style={[styles.genieAssigned, css.borderGrey1, css.borderRadius10, css.imgFull]}>
                                        <View style={[css.flexDR, styles.genieHeader, css.padding20]}>
                                            <View style={[css.flexDC, css.marginR20, css.width30]}>
                                                <Image style={[styles.genieLogo, css.img100, css.borderBlack1, { borderRadius: 50, }]} source={{ uri: jobdetailsData.driverData.profilePicURL.original }} />
                                                <Pressable style={[css.alignCenter, css.marginT5]} onPress={() => getGenieData(jobdetailsData.driverData._id)}><Text style={[css.brandC, css.f12, css.fm]}>View Profile</Text></Pressable>
                                            </View>
                                            <View style={[css.width60]}>
                                                <View style={[css.line10, css.paddingT20]}>
                                                    <Text style={[css.fbo, css.f20, css.blackC]}>{jobdetailsData.driverData.name}</Text>
                                                    <Text style={[css.fr, css.f16, css.blackC]}>+971 {jobdetailsData.driverData.phoneNo}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Image style={[css.img20]} source={require(imgPath + 'star-fill.png')} />
                                                    <Text style={[css.fr, css.f12, css.blackC, css.alignSelfC, css.marginL5]}>{(jobdetailsData.driverData.rating / jobdetailsData.driverData.ratingPersonNo).toFixed(1)}/5 rated</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Pressable style={[styles.genieFooter, css.brandBG, css.alignCenter, css.imgFull, { height: 60, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
                                            <Text onPress={() => Linking.openURL('tel:+971' + jobdetailsData.driverData.phoneNo)} style={[css.feb, css.f18, css.whiteC]}><Image source={require(imgPath + 'call-white.png')} />{' '} CALL NOW</Text>
                                        </Pressable>
                                    </View>
                                    :
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
                                }
                            </View>
                        }
                    </View>
                </View>
                <View style={[css.section]}>
                    <View style={[css.container, { marginBottom: 50, }]}>
                        <List.AccordionGroup>
                            {jobdetailsData &&
                                <View>
                                    <List.Accordion title="Booking Summary" id="1"
                                        titleStyle={[css.blackC, css.fsb, css.f14]}
                                        style={[css.screenBG, css.padding10, { paddingLeft: 0, paddingRight: 0 }]}
                                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }}
                                            source={require(imgPath + 'arrowDown_hg.png')} />}
                                    >
                                        <View style={[css.line5, css.spaceT20]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.f18, css.fm, css.brandC]}>Service</Text></View>
                                                <Pressable
                                                    onPress={toggleserviceDetailModal}
                                                    style={[css.flexDR, css.alignSelfC]}
                                                >
                                                    <Image source={require(imgPath + 'service-info.png')} />
                                                    <Text style={[css.brandC, css.f14]}>Service Details</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Type</Text></View>
                                                <Pressable
                                                    onPress={() => settypeModal(!typeModal)}
                                                    style={[css.flexDR]}
                                                ><Image source={require(imgPath + 'service-info.png')} />
                                                    <Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.charges.unitCharges ? 'Fixed price' : 'Inspection based'} service</Text>
                                                </Pressable>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Priority</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.orangeC, css.fm]}>{jobdetailsData.serviceType}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Frequency</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>One Time</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Reason for the service ?</Text></View>
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.subCategory.questions[0].answer.answer ? jobdetailsData.subCategory.questions[0].answer.answer : '1. Dirty air'}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Number of units to service ?</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.subCategory.questions[1].answer.answer ? jobdetailsData.subCategory.questions[1].answer.answer : '1'}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Need external units serviced aswell ?</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.subCategory.questions[2].answer.answer ? jobdetailsData.subCategory.questions[2].answer.answer : 'No'}</Text></View>
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
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.scheduleDate ?
                                                    //moment(new Date(jobdetailsData.scheduleDate)).format("ddd DD MMM YYYY")
                                                    jobdetailsData.scheduleDate
                                                    :
                                                    null} </Text>
                                                    {/* <Text>| {jobdetailsData.slot[0] == '8' ? '8AM - 10AM' :
                                                        jobdetailsData.slot[0] == '10' ? '10AM - 12PM' :
                                                            jobdetailsData.slot[0] == '12' ? '12PM - 2PM' :
                                                                jobdetailsData.slot[0] == '14' ? '2PM - 4PM' :
                                                                    jobdetailsData.slot[0] == '16' ? '4PM - 6PM' :
                                                                        jobdetailsData.slot[0] == '18' ? '6PM - 8PM' : null}
                                                    </Text> */}
                                                </View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Address</Text></View>
                                                <View style={[css.flexDC]}>
                                                    <Text style={[css.blackC, css.fsb, css.textRight]}>{jobdetailsData.address.addressType}</Text>
                                                    <Text style={[css.blackC, css.fr, css.textRight]}>{jobdetailsData.address.apartmentNo}, {jobdetailsData.address.streetAddress}</Text>
                                                    <Text style={[css.blackC, css.fr, css.textRight]}>{jobdetailsData.address.community}, {jobdetailsData.address.city}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {jobdetailsData.problemImages != [''] ?
                                            <FlatList
                                                data={jobdetailsData.problemImages}
                                                keyExtractor={(item, index) => {
                                                    return item._id;
                                                }}
                                                renderItem={({ item }) => (
                                                    <View style={[css.borderRadius10, css.borderGrey1, css.padding20, css.marginB10, css.flexDRSB]}>
                                                        <Text style={[css.brandC, css.f16, css.fr, css.alignSelfC]}>Image Shared</Text>
                                                        <Image
                                                            style={{ width: 40, height: 40 }}
                                                            source={{ uri: item.original }}
                                                        />
                                                    </View>

                                                )}
                                            />
                                            : null
                                        }
                                        {jobdetailsData.problemDetails ?
                                            <View style={[css.borderRadius10, css.borderGrey1, css.padding20, css.marginB10, css.flexDC]}>
                                                <Text style={[css.brandC, css.f16, css.fr]}>Your Note:</Text>
                                                <Text>{jobdetailsData.problemDetails}</Text>
                                            </View>
                                            :
                                            null
                                        }

                                    </List.Accordion>
                                    <List.Accordion title="Payment Summary" id="2"
                                        titleStyle={[css.blackC, css.fsb, css.f14]}
                                        style={[css.screenBG, css.padding10, { paddingLeft: 0, paddingRight: 0 }]}
                                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }}
                                            source={require(imgPath + 'arrowDown_hg.png')} />}
                                    >
                                        <View style={[css.line5, css.spaceT20]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.f18, css.fm, css.brandC]}>Pricing</Text></View>
                                                <Pressable
                                                    onPress={() => togglepricingDetailModal()}
                                                    style={[css.flexDR, css.alignSelfC]}
                                                >
                                                    <Image source={require(imgPath + 'tag.png')} />
                                                    <Text style={[css.brandC, css.f14]}>Pricing Details</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fbo]}>jobdetailsData</Text></View>
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>AED</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Service Charges</Text></View>
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.charges.unitCharges}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Discount (online *)</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.charges.discountCharges}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fbo]}>Total Charges</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>{jobdetailsData.charges.totalCharges}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm]}>Vat charges</Text></View>
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fm]}>{jobdetailsData.charges.vatCharges}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fbo]}>Total charges (incl VAT)</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>{jobdetailsData.charges.finalCharges}</Text></View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fbo]}>Due Amount</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fbo]}>{jobdetailsData.charges.vatFinalCharges}</Text></View>
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
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.brandC]}>{jobdetailsData.payment_status}</Text></View>
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
                                                    <Text style={[css.liteBlackC, css.f14, css.fr]}>{jobdetailsData.warranty.warrantyText}</Text>
                                                    <Pressable style={[css.flexDR]}><Text style={[css.liteBlackC, css.f14, css.fr]}>Visit </Text><Text style={[css.brandC, css.f14, css.fr]} onPress={() => Linking.openURL('https://www.homegenie.com/en/warranty/')}> HomeGenie Warranty Policy</Text></Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                </View>
                            }
                        </List.AccordionGroup>
                    </View>
                </View>
            </ScrollView>
            {jobdetailsData && jobdetailsData.cancel &&
                <View style={[css.container, css.paddingT0, css.marginB10]}>
                    <View style={[styles.cancelButton]}>
                        <Pressable >
                            <Text style={[css.blackC, css.fbo, css.f18]}>Cancel Request</Text>
                        </Pressable></View>
                </View>
            }
            {jobdetailsData && jobdetailsData.Payment &&
                <View style={[css.container, css.paddingT0, css.marginB10]}>
                    <View style={[styles.cancelButton, css.yellowBG]}>
                        <Pressable onPress={() => navigation.navigate('PaymentPage', {
                            id: jobdetailsData._id, amount: jobdetailsData.charges.vatFinalCharges
                        })}>
                            <Text style={[css.whiteC, css.fbo, css.f18]}>Pay Now</Text>
                        </Pressable></View>
                </View>
            }
            <Modal
                animationType="fade"
                isVisible={genieModal}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={[css.modalNewView, { marginTop: 20, marginBottom: 20 }]}>
                        <View style={[css.modalNewHeader]}>
                            <Pressable
                                style={[css.flexDR,]}
                                onPress={() => setGenieModal(!genieModal)}
                            >
                                <Image source={require(imgPath + 'backArrowBlack.png')} />
                                <View style={[css.alignCenter, css.imgFull]}><Text style={[css.fsb, css.f20, css.brandC]}>Genie Profile</Text></View>
                            </Pressable>
                        </View>
                        <ScrollView>
                            {genieData &&
                                <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                                    <View>
                                        <View style={[css.flexDR, styles.genieHeader, css.padding10, css.line10]}>
                                            <View style={[css.flexDC, css.marginR20, css.width30]}>
                                                {genieData.profilePicURL.original ?
                                                    <Image style={[styles.genieLogo, css.img100, css.borderGrey1, { borderRadius: 50, }]} source={{ uri: genieData.profilePicURL.original }} />
                                                    :
                                                    <Image style={[styles.genieLogo, css.img100, css.borderGrey1, { borderRadius: 50, }]} source={{ uri: 'https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/document_602bdbdf0325e5467c866ffcgOkllk_WD.png' }} />
                                                }
                                            </View>
                                            <View style={[css.width60]}>
                                                <View style={[css.paddingT20]}>
                                                    <Text style={[css.fbo, css.f20, css.blackC]}>{genieData.name}</Text>
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Image style={[css.img15]} source={require(imgPath + 'star-fill.png')} />
                                                    <Text style={[css.fr, css.f12, css.blackC, css.alignSelfC, css.marginL5]}>
                                                        {jobdetailsData.driverData ?
                                                            (jobdetailsData.driverData.rating / jobdetailsData.driverData.ratingPersonNo).toFixed(1)
                                                            :
                                                            null
                                                        }
                                                        /5 rated</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[css.flexDC, css.padding10, css.line10]}>
                                            <View style={[css.flexDRSB]}>
                                                <Text>Resident Visa</Text>
                                                <Text>{genieData.validVisa ? 'VALID' : 'NOT VALID'}</Text>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <Text>Trade License </Text>
                                                <Text>{genieData.validTradeLicence ? 'VALID' : 'NOT VALID'}</Text>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <Text>Insurance</Text>
                                                <Text>{genieData.validInsurance ? 'VALID' : 'NOT VALID'}</Text>
                                            </View>
                                        </View>
                                        <View style={[css.padding10, css.line10]}>
                                            <View><Text style={[css.fm, css.f14, css.brandC]}>Skills</Text></View>
                                            <View style={[css.flexDR, { flexWrap: 'wrap' }]}>
                                                {genieData.categories ?
                                                    <FlatList
                                                        data={genieData.categories}
                                                        contentContainerStyle={[css.flexDR, { flexWrap: 'wrap' }]}
                                                        renderItem={({ item }) => (
                                                            <View style={[css.padding5, css.borderBlack1, css.borderRadius5, css.alignCenter, css.marginB5, css.marginR5, { flex: 1 }]}>
                                                                <Text>{item}</Text>
                                                            </View>
                                                        )}
                                                    />
                                                    : null}
                                            </View>
                                        </View>
                                        {genieData.feedback ?
                                            <View style={[css.padding10, css.line10]}>
                                                <View><Text style={[css.fm, css.f14, css.brandC]}>Ratings</Text></View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View ><Text>5*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '80%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, { height: 7, width: (genieData.feedback.fiveStar ? genieData.feedback.fiveStar : '0') + '%' }]}></View>
                                                    </View>
                                                    <View style={{ width: '10%' }}><Text>({genieData.feedback.fiveStar ? genieData.feedback.fiveStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View><Text>4*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '80%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, { height: 7, width: (genieData.feedback.fourStar ? genieData.feedback.fourStar : '0') + '%' }]}></View>
                                                    </View>
                                                    <View style={{ width: '10%' }}><Text>({genieData.feedback.fourStar ? genieData.feedback.fourStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View><Text>3*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '80%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, { height: 7, width: (genieData.feedback.threeStar ? genieData.feedback.threeStar : '0') + '%' }]}></View>
                                                    </View>
                                                    <View style={{ width: '10%' }}><Text>({genieData.feedback.threeStar ? genieData.feedback.threeStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View><Text>2*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '80%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, { height: 7, width: (genieData.feedback.twoStar ? genieData.feedback.twoStar : '0') + '%' }]}></View>
                                                    </View>
                                                    <View style={{ width: '10%' }}><Text>({genieData.feedback.twoStar ? genieData.feedback.twoStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View><Text>1*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.liteGreyBG, css.borderRadius10, { height: 7, width: '80%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, { height: 7, width: (genieData.feedback.oneStar ? genieData.feedback.oneStar : '0') + '%' }]}></View>
                                                    </View>
                                                    <View style={{ width: '10%' }}><Text>({genieData.feedback.oneStar ? genieData.feedback.oneStar : '0'})</Text></View>
                                                </View>
                                            </View>
                                            :
                                            null
                                        }
                                        {genieData.feedback.latestComments ?
                                            <View style={[css.padding10, css.line10]}>
                                                <View><Text style={[css.fm, css.f14, css.brandC]}>Reviews</Text></View>
                                                <View style={[css.flexDC, { flexWrap: 'wrap' }]}>
                                                    <View>
                                                        <Text style={[css.fm, css.f14, css.blackC, { lineHeight: 25 }]}>{genieData.feedback.latestComments ?
                                                            (genieData.feedback.latestComments).join("\n")
                                                            :
                                                            null
                                                        }</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            null
                                        }

                                    </View>
                                </View>
                            }
                        </ScrollView>

                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={serviceDetailModal}
                animationIn='slideInRight'
                animationInTiming={700}
                animationOut='slideOutRight'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                style={{ margin: 0, }}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <ScrollView>
                    <View style={bookModal.modalViewFull}>
                        <View style={[bookModal.modalHeader]}>
                            <TouchableOpacity
                                style={[css.flexDR, css.padding20, { paddingLeft: 0 }]}
                                onPress={() => setserviceDetailModal(!serviceDetailModal)}
                            >
                                <Image style={[css.alignSelfC, css.marginR10]} source={require(imgPath + 'backArrowBlack.png')} />
                                <Text style={[css.fm, css.f16, css.greyC]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <View style={[css.flexDR, css.line20]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'expert.png')} />
                                <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Service Details</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>What's included</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB5,]}> - Expose the AC coils, part of the external unit,{"\n"} - Brush away surface dirt, debris or ice from the AC coils {"\n"} - Identify any damage or water leaks from the AC coils,{"\n"} - Cover the electrical connections and parts {'\n'} - Spray water, or chemical cleaner, if applicable, on the AC coils {'\n'} - Rinse away the cleaner from the AC coils {'\n'} - Inspect the coil fins for any damage, and comb them; and {'\n'} - Reassemble the air conditioner. </Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Availability</Text>
                                <View style={[css.flexDRSA]}>
                                    <View>
                                        <Image style={{ width: 12, height: 12 }} source={require(imgPath + 'cross-icon.png')} />
                                        <Image style={{ width: 50, height: 56 }} source={require(imgPath + 'emergency.png')} />
                                    </View>
                                    <Image style={{ width: 50, height: 57 }} source={require(imgPath + 'sameday-2x.png')} />
                                    <Image style={{ width: 53, height: 56 }} source={require(imgPath + 'schedule-2x.png')} />
                                </View>
                            </View>
                            <View style={[css.spaceB20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>NOTES</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB5,]}>Customer to assist in getting access to community and service location, and electricity and water connection to be active.</Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={pricingDetailModal}
                animationIn='slideInRight'
                animationInTiming={700}
                animationOut='slideOutRight'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                style={{ margin: 0, }}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <ScrollView>
                    <View style={bookModal.modalViewFull}>
                        <View style={[bookModal.modalHeader]}>
                            <TouchableOpacity
                                style={[css.flexDR, css.marginT20, css.marginB20]}
                                onPress={() => setpricingDetailModal(!pricingDetailModal)}
                            >
                                <Image style={[css.alignSelfC, css.marginR10]} source={require(imgPath + 'backArrowBlack.png')} />
                                <Text style={[css.fm, css.f16, css.greyC]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <View style={[css.flexDR, css.line10]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'priceverification.png')} />
                                <Text style={[css.f20, css.lGreyC, css.alignSelfC, css.fsb]}>Pricing Details</Text>
                            </View>
                            <View style={[css.line20]}>
                                <View style={[css.flexDR]}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 10 }}
                                        source={require(imgPath + 'iconIndex.png')}
                                    />
                                    <Text style={[css.f16, css.fsb, css.brandC, css.spaceB10]}>{jobdetailsData.charges.unitCharges ? 'Fixed price' : 'Inspection based'} service</Text>
                                </View>
                                <Text style={[css.fm, css.blackC, css.spaceB20,]}>Minimum service* charges of AED PRICE per AC unit. AED PRICE for additional AC unit. {'\n'}*Minimum service charges are  applicable for coil cleaning of unfurnished apartments or villas. Service charges, fixed on the basis of information provided, may vary at the time of actual service due to any special condition or requirement.</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f16, css.fm, css.blackC, css.spaceB10]}>NOTES</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB5, css.f12]}>Additional charges apply for Emergency bookings, based on availability and permissions from community/ building, as confirmed by the customer. VAT charges are not included and are based on the total invoice amount.</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Warranty</Text>
                                <View style={[css.flexDR]}>
                                    <View style={[css.width30]}><Image style={{ width: 100, height: 90 }} source={require(imgPath + 'warranty.png')} /></View>
                                    <View style={[css.flexDC, css.alignSelfC]}>
                                        <Text style={[css.greyC, css.fm]}>For more details, visit</Text>
                                        <Text style={[css.brandC, css.fsb]} onPress={() => { Linking.openURL('https://www.homegenie.com/en/warranty') }}>HomeGenie warranty policy</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={typeModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}>
                            <View><Text style={[css.modalNewText, css.f18, css.blackC, css.fm]}>{jobdetailsData.charges.unitCharges ? 'Fixed price' : 'Inspection based'} service</Text></View>
                            <View><Text style={[css.textCenter, css.blackC, css.f14, css.fr]}>The selected service is a fixed price service with the price estimate calculated based on the details you select while booking the service.</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.paddingT0]}>
                            <View style={[css.imgFull, css.alignItemsC]}>
                                <TouchableOpacity
                                    onPress={() => settypeModal(!typeModal)}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.yellowBG, { width: '40%', height: 40, }]}
                                >
                                    <Text style={[css.whiteC, css.fm, css.f16]}>Okay, got it</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[css.marginT10]}>
                                <Text style={[css.modalNewText, css.blackC, css.fr, css.f14]}>An additional Emergency charges</Text>
                                <Text style={[css.modalNewText, css.blackC, css.fr, css.f14]}>are applicable to the booking.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    scene: { flex: 1 },
    cancelButtonContainer: { position: 'absolute', bottom: 0, left: 0, right: 10, marginLeft: 20, marginRight: 20 },
    cancelButton: { width: '100%', height: 50, backgroundColor: '#d1d1d1', alignItems: 'center', justifyContent: 'center', borderRadius: 10, },
});
const bookModal = StyleSheet.create({
    modalViewFull: {
        backgroundColor: "white",
        padding: 20,
        height: windowHeight,
    },
    modalHeader: { fontSize: 14, },

})
