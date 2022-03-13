import React, { Component, useState, useEffect, useCallback } from "react";
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
    RefreshControl,
} from "react-native";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Text from "../components/MyText";
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios'
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import StatusBarAll from "../components/StatusBar";
import { List, Checkbox, RadioButton } from 'react-native-paper';
import { connect, useDispatch, useSelector } from "react-redux";
import css from '../components/commonCss';
import { loadJobDetails, getJobDetail, getGenie, loadGenie, addRating, updateInspection, cancelJob, rejectAdvancePayment, getJobCancelCharge } from "../reducers/jobDetailReducer";
import { BASE_URL } from '../base_file';
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function JobDetailScreen({ route, props, navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [serviceDetailModal, setserviceDetailModal] = useState(false);
    const toggleserviceDetailModal = () => { setserviceDetailModal(!serviceDetailModal) };
    const [pricingDetailModal, setpricingDetailModal] = useState(false);
    const togglepricingDetailModal = () => { setpricingDetailModal(!pricingDetailModal) };
    const [typeModal, settypeModal] = useState(false);
    const toggletypeModal = () => { settypeModal(!typeModal) };

    //const [genieData, setGenieData] = useState(null);
    const [genieModal, setGenieModal] = useState(false);
    const dispatch = useDispatch();
    let genieData = useSelector(getGenie) || null;
    let jobdetailsData = useSelector(getJobDetail);
    jobdetailsData = jobdetailsData ? jobdetailsData : null
    // console.log('jobdetailsData_jobDetailScreen', jobdetailsData);
    const token = route.params.token
    const jobId = route.params.jobId
    const isFocused = useIsFocused();
    console.log('jobId_jobDetailScreen', jobId);
    console.log('token_jobDetailScreen', token);

    const [ratingModal, setratingModal] = useState(true);
    const toggleratingModal = () => { setratingModal(!ratingModal) };
    const [reviewTextArea, setReviewTextArea] = useState(null);
    const [favGeniechecked, setfavGenieChecked] = useState(false);
    const [starCount, setstarCount] = useState(null)
    const [starValidate, setstarValidate] = useState(false)
    const [reviewValidate, setreviewValidate] = useState(false)
    const [jobDeleteModal, setjobDeleteModal] = useState(false)
    const toggleJobDeleteModal = () => { setjobDeleteModal(!jobDeleteModal) };
    const [cancelReasonModal, setcancelReasonModal] = useState(false)
    const togglecancelReasonModal = () => { setcancelReasonModal(!cancelReasonModal) };
    const [deleteJobReason, setdeleteJobReason] = useState('Professional not assigned');
    const [rejectJobModal, setrejectJobModal] = useState(false)
    const togglerejectJobModal = () => { setrejectJobModal(!rejectJobModal) };
    const [advancePaynowModal, setadvancePaynowModal] = useState(false)
    const toggleadvancePaynowModal = () => { setadvancePaynowModal(!advancePaynowModal) };
    const [advancePaynowRejectModal, setadvancePaynowRejectModal] = useState(false)
    const toggleadvancePaynowRejectModal = () => { setadvancePaynowRejectModal(!advancePaynowRejectModal) };
    const [inspectionAcceptRejectData, setinspectionAcceptRejectData] = useState(null)
    const [inspectionAcceptRejectJobID, setinspectionAcceptRejectJobID] = useState(null)
    const [cancelCharge, setcancelCharge] = useState(null)

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
            console.log('testGenie');
            // <GenieModal setGenieModal={true} />
            //setGenieModal(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const updateRatingData = async (appointmentId) => {
        if (starCount == null) {
            console.log('starCount', starCount);
            setstarValidate(true);
        } if (reviewTextArea == null) {
            console.log('reviewTextArea', reviewTextArea);
            setreviewValidate(true)
        } else {
            setstarValidate(false)
            setreviewValidate(false)
            const params = {
                appointmentId,
                driverRating: `${starCount}`,
                favouriteGenie: favGeniechecked,
                driverComment: reviewTextArea
            };
            console.log('Params', params, token);
            const isUpdated = await dispatch(addRating(token, params));
            if (isUpdated) {
                console.log('Rating success');
                navigation.navigate('MyBookingPage')
            } else {
                console.log('Rating Fail');
            }
        }

    }
    const deleteJob = async (appointmentId) => {
        const params = {
            jobId: appointmentId,
        };
        console.log('Params', params, token);
        const isDeleted = await dispatch(cancelJob(token, params));
        if (isDeleted) {
            console.log('Job Deleted');
            navigation.navigate('MyBookingPage')
        } else {
            console.log('Job Deleted Fail');
        }
    }
    const inspectionAccept = async (status, jobId) => {
        const params = {
            jobId: jobId,
            status: status,
        };
        console.log('Paramsds', params, token);
        const isUpdated = await dispatch(updateInspection(token, params));
        if (isUpdated) {
            console.log('Status updated success');
            navigation.navigate('MyBookingPage')
        } else {
            console.log('inspectionAcceptReject Fail');
        }
    }
    const inspectionAcceptReject = async () => {
        const params = {
            jobId: inspectionAcceptRejectJobID,
            status: inspectionAcceptRejectData,
        };
        console.log('Paramsds', params, token);
        const isUpdated = await dispatch(updateInspection(token, params));
        if (isUpdated) {
            console.log('Status updated success');
            navigation.navigate('MyBookingPage')
        } else {
            console.log('inspectionAcceptReject Fail');
        }
    }
    const advancePaynowReject = async (status, jobId) => {
        const params = {
            jobId: jobId,
            status: status,
        };
        console.log('advancePaynowRejectData', params, token);
        const isUpdated = await dispatch(rejectAdvancePayment(token, params));
        if (isUpdated) {
            console.log('Status updated success');
            navigation.navigate('MyBookingPage')
        } else {
            console.log('inspectionAcceptReject Fail');
        }
    }

    useFocusEffect(
        useCallback(() => {
            const loadJobdetails = async () => {
                const jD = await dispatch(loadJobDetails(token, jobId));
                console.log('jobdetailsData_idNNN', jD._id);
                await dispatch(loadGenie(token, jD.driverData._id));
                const cancelCharge = await dispatch(getJobCancelCharge(token, jD._id));
                setcancelCharge(cancelCharge)
            };
            loadJobdetails();
            console.log('loadJobdetails', loadJobdetails);
        }, [jobId, isFocused])
    );

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

                            <View><Text style={[css.fr, css.greyC, css.f12,]}>Booking For:{
                                //moment(new Date(jobdetailsData.utc_timing.requestedTime)).format("DD/MM/YYYY")
                                //moment(new Date(jobdetailsData.lastPossibleReminderTiming)).format(" DD/MM/YYYY, h:mm:ss a")
                                jobdetailsData.utc_timing.requestedTime
                            }
                            </Text>
                            </View>
                            <View>
                                <Text style={[css.f12, css.fr, css.blackC]}>Status: {jobdetailsData.status ? jobdetailsData.status : ''}
                                    {jobdetailsData.showAction}
                                </Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
            <ScrollView
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //     />
            // }
            >
                <View style={[css.section]}>
                    <View style={css.container}>
                        {jobdetailsData &&
                            <View>
                                <Image style={[css.imgFull, css.borderRadius10, { height: 120 }]} source={{ uri: jobdetailsData.subCategory.image }} />
                                <View style={[css.spaceT10]}><Text style={[css.f18, css.blackC, css.fr]}>{jobdetailsData.subCategory.subCategoryName}</Text></View>
                                {jobdetailsData.driverData && jobdetailsData.status != 'SETTLED' && jobdetailsData.status != 'CANCELLED' && <View style={[css.spaceT10]}><Text style={[css.f16, css.blackC, css.fr]}>Genie has been assigned to you.</Text></View>}
                                <View style={[css.spaceT10]}><Text style={[css.f20, css.blackC, css.fsb]}>Your Genie</Text></View>
                                {jobdetailsData.driverData ?
                                    <View style={[styles.genieAssigned, css.borderGrey1, css.borderRadius10, css.imgFull]}>
                                        <View style={[css.flexDR, styles.genieHeader, css.padding20]}>
                                            <View style={[css.flexDC, css.marginR20, css.width30]}>
                                                <Image style={[styles.genieLogo, css.imgg90, css.borderBlack1, { borderRadius: 50, }]} source={{ uri: jobdetailsData.driverData.profilePicURL.original }} />
                                                <Pressable style={[css.alignCenter, css.marginT5]} onPress={() => setGenieModal(true)}><Text style={[css.brandC, css.f12, css.fm, css.textCenter]}>View Profile</Text></Pressable>
                                            </View>
                                            <View style={[css.width60]}>
                                                <View style={[css.line10, css.paddingT10]}>
                                                    <Text style={[css.fbo, css.f20, css.blackC]}>{jobdetailsData.driverData.name}</Text>
                                                    {jobdetailsData.status != 'SETTLED' && jobdetailsData.status != 'CANCELLED' &&
                                                        <Text style={[css.fr, css.f16, css.blackC]}>+971 {jobdetailsData.driverData.phoneNo}</Text>
                                                    }
                                                </View>
                                                <View style={[css.flexDR]}>
                                                    <Image style={[css.img20]} source={require(imgPath + 'star-fill.png')} />
                                                    <Text style={[css.fr, css.f12, css.blackC, css.alignSelfC, css.marginL5]}>{(jobdetailsData.driverData.rating / jobdetailsData.driverData.ratingPersonNo).toFixed(1)}/5 rated</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {jobdetailsData.status == 'RATING' &&
                                            <Pressable
                                                onPress={() => setratingModal(true)}
                                                style={[styles.genieFooter, css.maroonBG, css.alignCenter, css.imgFull, { height: 60, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}
                                            >
                                                <Text style={[css.feb, css.f18, css.whiteC]}> RATE NOW</Text>
                                            </Pressable>
                                        }
                                        {jobdetailsData.status != 'SETTLED' && jobdetailsData.status != 'CANCELLED' && jobdetailsData.status != 'RATING' &&
                                            <Pressable style={[styles.genieFooter, css.brandBG, css.alignCenter, css.imgFull, { height: 60, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
                                                <Text onPress={() => Linking.openURL('tel:+971' + jobdetailsData.driverData.phoneNo)} style={[css.feb, css.f18, css.whiteC]}><Image source={require(imgPath + 'call-white.png')} />{' '} CALL NOW</Text>
                                            </Pressable>
                                        }
                                    </View>
                                    :
                                    <View style={[styles.genieNotAssigned]}>
                                        <View style={[css.imgFull, css.alignCenter, css.liteBlueBG, css.padding10, css.borderRadius10]}>
                                            <View style={[css.flexDR, css.imgFull]}>
                                                <View style={[css.whiteBG, css.imgg90, css.marginR10, { borderRadius: 50 }]}><Image style={[css.imgg80]} source={require(imgPath + 'homegenie-logo.png')} /></View>
                                                <View style={[css.flexDC, css.alignSelfC]}>
                                                    <Text style={[css.f18, css.fm, css.blackC, css.line]}>Your Genie</Text>
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
                    <View style={[css.container]}>
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
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Type</Text></View>
                                                <Pressable
                                                    onPress={() => settypeModal(!typeModal)}
                                                    style={[css.flexDR]}
                                                >
                                                    <Image source={require(imgPath + 'service-info.png')} />
                                                    <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>
                                                        {jobdetailsData.serviceBasedType}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Priority</Text></View>
                                                <View style={[css.flexDR, css]}>
                                                    {jobdetailsData.serviceType ==
                                                        'Emergency' ? <Text style={[css.alignSelfC, css.cMaroon, css.fm, css.f12]}>{jobdetailsData.serviceType}</Text>
                                                        : 'Sameday' ? <Text style={[css.alignSelfC, css.orangeC, css.fm, css.f12]}>{jobdetailsData.serviceType}</Text>
                                                            : 'Scheduled' ? <Text style={[css.alignSelfC, css.orangeC, css.fm, css.f12]}>{jobdetailsData.serviceType}</Text>
                                                                : null
                                                    }
                                                    {/* {jobdetailsData.serviceType} */}
                                                </View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Frequency</Text></View>
                                                <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>One Time</Text></View>
                                            </View>
                                            {jobdetailsData.questions &&
                                                <FlatList
                                                    data={jobdetailsData.questions}
                                                    keyExtractor={(item, index) => {
                                                        return item._id;
                                                    }}
                                                    renderItem={({ item }) => (
                                                        <View style={[css.flexDRSB, css.imgFull]}>
                                                            <View><Text style={[css.greyC, css.fm, css.f12]}>{item.question}</Text></View>
                                                            <View><Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{item.answer.answer}</Text></View>
                                                        </View>
                                                    )}
                                                />
                                            }
                                        </View>
                                        <View style={[css.line5, css.spaceT20]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.f16, css.fsb, css.brandC]}>Date and Location</Text></View>
                                            </View>
                                        </View>
                                        <View style={[css.spaceB20]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Date and Time</Text></View>
                                                <View style={[css.flexDR]}>
                                                    <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>
                                                        {jobdetailsData.scheduleDate}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Address</Text></View>
                                                <View style={[css.flexDC]}>
                                                    <Text style={[css.blackC, css.fsb, css.textRight, css.f12]}>{jobdetailsData.address.addressType}</Text>
                                                    <Text style={[css.blackC, css.fr, css.textRight, css.f12]}>{jobdetailsData.address.apartmentNo}, {jobdetailsData.address.streetAddress}</Text>
                                                    <Text style={[css.blackC, css.fr, css.textRight, css.f12]}>{jobdetailsData.address.community}, {jobdetailsData.address.city}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {jobdetailsData && jobdetailsData.materialImages.length ?
                                            <View>
                                                <FlatList
                                                    data={jobdetailsData.materialImages}
                                                    keyExtractor={(item, index) => {
                                                        return item._id;
                                                    }}
                                                    renderItem={({ item }) => (
                                                        <View style={[css.borderRadius10, css.borderGrey1, css.padding20, css.marginB10, css.flexDRSB]}>
                                                            <Text style={[css.brandC, css.f14, css.fr, css.alignSelfC]}>Material Image Shared</Text>
                                                            <Image
                                                                resizeMode="cover"
                                                                style={{ width: 100, height: 60, borderRadius: 10 }}
                                                                source={{ uri: item.original }}
                                                            />
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                            :
                                            <View>
                                                {jobdetailsData.problemImages &&
                                                    <FlatList
                                                        data={jobdetailsData.problemImages}
                                                        keyExtractor={(item, index) => {
                                                            return item._id;
                                                        }}
                                                        renderItem={({ item }) => (
                                                            <View style={[css.borderRadius10, css.borderGrey1, css.padding20, css.marginB10, css.flexDRSB]}>
                                                                <Text style={[css.brandC, css.f16, css.fr, css.alignSelfC]}>Image Shared</Text>
                                                                <Image
                                                                    resizeMode="cover"
                                                                    style={{ width: 100, height: 60, borderRadius: 10 }}
                                                                    source={{ uri: item.original }}
                                                                />
                                                            </View>
                                                        )}
                                                    />
                                                }
                                                {jobdetailsData.problemDetails &&
                                                    <View style={[css.borderRadius10, css.borderGrey1, css.padding20, css.marginB10, css.flexDC]}>
                                                        <Text style={[css.brandC, css.f16, css.fr]}>Your Note:</Text>
                                                        <Text style={[css.blackC, css.f12, css.fr]}>{jobdetailsData.problemDetails}</Text>
                                                    </View>
                                                }
                                            </View>
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
                                                <View><Text style={[css.greyC, css.fbo, css.f12]}>item</Text></View>
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.blackC, css.fbo, css.f12]}>AED</Text></View>
                                            </View>
                                            {jobdetailsData.showLabourChargeold && !!jobdetailsData.charges.labourCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>{jobdetailsData.charges.labourSubText}</Text></View>
                                                    <View style={[css.flexDR]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.labourCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {jobdetailsData.hideLabourCharges && !!jobdetailsData.charges.labourCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Labor {jobdetailsData.charges.labourSubText}</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.labourCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.unitCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Service Charges</Text></View>
                                                    <View style={[css.flexDR, css]}><Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.unitCharges}</Text></View>
                                                </View>
                                            }
                                            {jobdetailsData && jobdetailsData.estimateItems &&
                                                <FlatList
                                                    data={jobdetailsData.estimateItems}
                                                    keyExtractor={(item, index) => {
                                                        return item._id;
                                                    }}
                                                    renderItem={({ item }) => (
                                                        <View style={[css.flexDRSB]}>
                                                            <View><Text style={[css.greyC, css.fm, css.f12]}>{item.name}</Text></View>
                                                            <View style={[css.flexDR, css]}>
                                                                <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{item.charge}</Text>
                                                            </View>
                                                        </View>
                                                    )}
                                                />
                                            }
                                            {!!jobdetailsData.charges.emergencyCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Emergency Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.emergencyCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.fridayCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Friday Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.fridayCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {jobdetailsData.showMaterialOld && !!jobdetailsData.charges.materialCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Material</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.materialCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.additionalCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Other Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.additionalCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.peakCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Peak Hour Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.peakCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.offPeakCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Off Peak Hour Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>-{jobdetailsData.charges.offPeakCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.discountCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Discount (online*)</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.discountCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.totalCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fbo, css.f12]}>Total Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fbo, css.f12]}>{jobdetailsData.charges.totalCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!jobdetailsData.charges.totalCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fbo, css.f12]}>Total Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fbo, css.f12]}>0</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.vatCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Vat Charges</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.charges.vatCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {!!jobdetailsData.charges.vatFinalCharges &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.f12, css.fbo]}>Total Charges (incl VAT)</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fbo, css.f12]}>{jobdetailsData.charges.vatFinalCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {jobdetailsData.advanceAvail &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>(less) Advance</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>{jobdetailsData.AdvanceAmount}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {jobdetailsData.showDueAmount &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.f12, css.fbo]}>Due Amount</Text></View>
                                                    <View style={[css.flexDR, css]}>
                                                        <Text style={[css.alignSelfC, css.blackC, css.fbo, css.f12]}>{jobdetailsData.charges.dueCharges}</Text>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                        <View style={[css.line5, css.spaceT10]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.f16, css.fsb, css.brandC]}>Payment</Text></View>
                                            </View>
                                        </View>
                                        <View>
                                            {jobdetailsData &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Plan</Text></View>
                                                    <View><Text style={[css.alignSelfC, css.brandC, css.f12, css.fm]}>
                                                        {jobdetailsData.paymentPlan ? jobdetailsData.paymentPlan : 'NA'}
                                                    </Text></View>
                                                </View>
                                            }
                                            {jobdetailsData && jobdetailsData.payment_type &&
                                                <View style={[css.flexDRSB]}>
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>Method</Text></View>
                                                    <View><Text style={[css.alignSelfC, css.brandC, css.f12, css.fm]}>
                                                        {jobdetailsData.walletData ? `WALLET (${jobdetailsData.walletData}) + CARD` : jobdetailsData.payment_type}
                                                    </Text></View>
                                                </View>
                                            }
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Status</Text></View>
                                                <View style={[css.flexDR]}><Text style={[css.alignSelfC, css.brandC, css.f12, css.fm]}>{jobdetailsData.payment_status}</Text></View>
                                            </View>
                                        </View>
                                        <View style={[css.line5, css.spaceT10]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.f16, css.fsb, css.brandC]}>Document</Text></View>
                                            </View>
                                        </View>
                                        <View style={[css.spaceB20, css.line5,]}>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>Bill Estimate</Text></View>
                                                <View style={[css.flexDR]}>
                                                    {jobdetailsData.billAndInvoices.estimatedBill != null ?
                                                        <Pressable
                                                            onPress={() => Linking.openURL(jobdetailsData.billAndInvoices.estimatedBill)}
                                                            style={[css.alignSelfC]}>
                                                            <Image style={{ width: 20, height: 25 }} source={require(imgPath + 'downloadpdf.png')} />
                                                        </Pressable>
                                                        :
                                                        <Text style={[css.alignSelfC, css.blackC, css.f12, css.fr]}>NA</Text>
                                                    }
                                                </View>
                                            </View>
                                            <View style={[css.flexDRSB]}>
                                                <View><Text style={[css.greyC, css.fm, css.f12]}>VAT invoice(s)</Text></View>
                                                <View style={[css.flexDR]}>
                                                    {jobdetailsData.billAndInvoices.finalInvoice != null ?
                                                        <Pressable
                                                            onPress={() => Linking.openURL(jobdetailsData.billAndInvoices.finalInvoice)}
                                                            style={[css.alignSelfC]}
                                                        >
                                                            <Image style={{ width: 20, height: 25 }} source={require(imgPath + 'downloadpdf.png')} />
                                                        </Pressable>
                                                        :
                                                        <Text style={[css.alignSelfC, css.blackC, css.f12, css.fr]}>NA</Text>
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                        {jobdetailsData && jobdetailsData.showGenieNote &&
                                            <View style={[css.line5, css.spaceT10, css.paddingB10]}>
                                                <View><Text style={[css.f16, css.fsb, css.brandC]}>NOTES: </Text></View>
                                                {jobdetailsData.genieNotes &&
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>{jobdetailsData.genieNotes}, </Text></View>
                                                }
                                                {jobdetailsData.additionalGenieNote &&
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>{jobdetailsData.additionalGenieNote}, </Text></View>
                                                }
                                                {jobdetailsData && jobdetailsData.advanceNote &&
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>{jobdetailsData.advanceNote}</Text></View>
                                                }
                                                {jobdetailsData && jobdetailsData.breakdownNote &&
                                                    <View><Text style={[css.greyC, css.fm, css.f12]}>See detailed breakdown on email sent to registered email address.</Text></View>
                                                }
                                            </View>
                                        }
                                        <View style={[css.spaceT10, css.line5, css.paddingB20]}>
                                            <View style={[css.flexDR]}>
                                                <View style={[css.width30]}><Image style={[css.marginR20, { width: 80, height: 70 }]} source={require(imgPath + 'warranty.png')} /></View>
                                                <View style={[css.flexDC, css.alignSelfC]}>
                                                    <Text style={[css.liteBlackC, css.fbo, css.f12]}>Warranty</Text>
                                                    {!jobdetailsData.isWarrantyFalse ?
                                                        <Text style={[css.liteBlackC, css.f12, css.fr]}>{jobdetailsData.warranty.warrantyText}</Text>
                                                        :
                                                        <Text style={[css.cMaroon, css.f11, css.fr]}>No warranty applicable to this service</Text>
                                                    }
                                                    <Pressable>
                                                        <Text style={[css.liteBlackC, css.f12, css.fr,]}>Visit
                                                            <Text style={[css.brandC, css.f12, css.fr]} onPress={() => { navigation.navigate('Browser', { url: 'https://www.homegenie.com/en/warranty/' }) }}> HomeGenie Warranty Policy</Text>
                                                        </Text>
                                                    </Pressable>
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
                <View style={[css.justifyContentC, css.alignItemsC, css.marginB10]}>
                    <Pressable style={[styles.cancelButton]} onPress={() => toggleJobDeleteModal()}>
                        <Text style={[css.blackC, css.fbo, css.f18]}>Cancel Request</Text>
                    </Pressable>
                </View>
            }
            {jobdetailsData && jobdetailsData.Payment &&
                <View style={[css.justifyContentC, css.alignItemsC, css.marginB10]}>
                    <Pressable
                        style={[styles.cancelButton, css.yellowBG, css.borderRadius30, css.boxShadow]}
                        onPress={() => navigation.navigate('PaymentPage',
                            { jobId: jobdetailsData._id, amount: jobdetailsData.charges.finalCharges }
                        )}>
                        <Text style={[css.whiteC, css.fbo, css.f18]}>Pay Now</Text>
                    </Pressable>
                </View>
            }
            {jobdetailsData && jobdetailsData.accept && jobdetailsData.advancePayment === null &&
                <View style={[css.alignItemsC, css.justifyContentC]}>
                    <View style={[css.justifyContentC, css.alignItemsC, css.marginB10, css.flexDRSB, { width: '90%' }]}>
                        <Pressable
                            onPress={() => inspectionAccept('APPROVE', jobdetailsData._id)}
                            style={[styles.cancelButton, css.yellowBG, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                        >
                            <Text style={[css.whiteC, css.fbo, css.f18]}>Accept</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => (setinspectionAcceptRejectData('CLOSED'), setinspectionAcceptRejectJobID(jobdetailsData._id), setrejectJobModal(true))}
                            style={[styles.cancelButton, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                        >
                            <Text style={[css.whiteC, css.fbo, css.f18]}>Reject</Text>
                        </Pressable>
                    </View>
                </View>
            }
            {jobdetailsData && jobdetailsData.accept && jobdetailsData.advancePayment != null &&
                <View style={[css.alignItemsC, css.justifyContentC]}>
                    <View style={[css.justifyContentC, css.alignItemsC, css.marginB10, css.flexDRSB, { width: '90%' }]}>
                        <Pressable
                            onPress={() => inspectionAccept('APPROVE', jobdetailsData._id)}
                            style={[styles.cancelButton, css.yellowBG, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                        >
                            <Text style={[css.whiteC, css.fbo, css.f18]}>AcceptA</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => (setinspectionAcceptRejectData('CLOSED'), setinspectionAcceptRejectJobID(jobdetailsData._id), setrejectJobModal(true))}
                            style={[styles.cancelButton, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                        >
                            <Text style={[css.whiteC, css.fbo, css.f18]}>Reject</Text>
                        </Pressable>
                    </View>
                </View>
            }
            {/* {jobdetailsData && jobdetailsData.accept &&
                <View style={[css.alignItemsC, css.justifyContentC]}>
                    {jobdetailsData && jobdetailsData.isInspectionCompleted && !jobdetailsData.advancePayment ?
                        <View style={[css.justifyContentC, css.alignItemsC, css.marginB10, css.flexDRSB, { width: '90%' }]}>
                            <Pressable
                                onPress={() => inspectionAccept('APPROVE', jobdetailsData._id)}
                                style={[styles.cancelButton, css.yellowBG, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                            >
                                <Text style={[css.whiteC, css.fbo, css.f18]}>Accept</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => (setinspectionAcceptRejectData('CLOSED'), setinspectionAcceptRejectJobID(jobdetailsData._id), setrejectJobModal(true))}
                                style={[styles.cancelButton, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                            >
                                <Text style={[css.whiteC, css.fbo, css.f18]}>Reject</Text>
                            </Pressable>
                        </View>
                        :
                        <View style={[css.justifyContentC, alignItemsC, css.marginB10, css.flexDRSB, { width: '90%' }]}>
                            <Pressable
                                onPress={() => setadvancePaynowModal(true)}
                                style={[styles.cancelButton, css.yellowBG, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                            >
                                <Text style={[css.whiteC, css.fbo, css.f18]}>AcceptA</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setadvancePaynowRejectModal(true)}
                                style={[styles.cancelButton, css.borderRadius30, css.boxShadow, css.width50, css.marginR5]}
                            >
                                <Text style={[css.whiteC, css.fbo, css.f18]}>Reject</Text>
                            </Pressable>
                        </View>
                    }
                </View>
            } */}
            {/* <GenieModal /> */}
            <Modal
                animationType="fade"
                isVisible={genieModal}
                hasBackdrop={true}
                onBackButtonPress={() => setGenieModal(!genieModal)}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
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
                                                    <Image style={[styles.genieLogo, css.imgg90, css.borderGrey1, { borderRadius: 50, }]} source={{ uri: genieData.profilePicURL.original }} />
                                                    :
                                                    <Image style={[styles.genieLogo, css.imgg90, css.borderGrey1, { borderRadius: 50, }]} source={{ uri: 'https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/document_602bdbdf0325e5467c866ffcgOkllk_WD.png' }} />
                                                }
                                            </View>
                                            <View style={[css.width60]}>
                                                <View style={[css.paddingT10]}>
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
                                        {genieData.feedback &&
                                            <View style={[css.padding10, css.line10]}>
                                                <View><Text style={[css.fm, css.f14, css.brandC]}>Ratings</Text></View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View style={{ width: '10%' }}><Text>5*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '75%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, {
                                                            height: 7, width:
                                                                (genieData.feedback.fiveStar ? (genieData.feedback.fiveStar /
                                                                    (genieData.feedback.fiveStar + genieData.feedback.fourStar + genieData.feedback.threeStar + genieData.feedback.twoStar + genieData.feedback.oneStar)
                                                                    * 100) : '0') + '%'
                                                        }]}>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '15%' }}><Text>({genieData.feedback.fiveStar ? genieData.feedback.fiveStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View style={{ width: '10%' }}><Text>4*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '75%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, {
                                                            height: 7, width:
                                                                (genieData.feedback.fourStar ? (genieData.feedback.fourStar /
                                                                    (genieData.feedback.fiveStar + genieData.feedback.fourStar + genieData.feedback.threeStar + genieData.feedback.twoStar + genieData.feedback.oneStar)
                                                                    * 100)
                                                                    : '0') + '%'
                                                        }]}></View>
                                                    </View>
                                                    <View style={{ width: '15%' }}><Text>({genieData.feedback.fourStar ? genieData.feedback.fourStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View style={{ width: '10%' }}><Text>3*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '75%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, {
                                                            height: 7, width:
                                                                (genieData.feedback.threeStar ? (genieData.feedback.threeStar /
                                                                    (genieData.feedback.fiveStar + genieData.feedback.fourStar + genieData.feedback.threeStar + genieData.feedback.twoStar + genieData.feedback.oneStar)
                                                                    * 100)
                                                                    : '0') + '%'
                                                        }]}></View>
                                                    </View>
                                                    <View style={{ width: '15%' }}><Text>({genieData.feedback.threeStar ? genieData.feedback.threeStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View style={{ width: '10%' }}><Text>2*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.rgreyBG, css.borderRadius10, { height: 7, width: '75%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, {
                                                            height: 7, width:
                                                                (genieData.feedback.twoStar ? (genieData.feedback.twoStar /
                                                                    (genieData.feedback.fiveStar + genieData.feedback.fourStar + genieData.feedback.threeStar + genieData.feedback.twoStar + genieData.feedback.oneStar)
                                                                    * 100)
                                                                    : '0') + '%'
                                                        }]}></View>
                                                    </View>
                                                    <View style={{ width: '15%' }}><Text>({genieData.feedback.twoStar ? genieData.feedback.twoStar : '0'})</Text></View>
                                                </View>
                                                <View style={[css.flexDRSA, css.imgFull]}>
                                                    <View style={{ width: '10%' }}><Text>1*</Text></View>
                                                    <View style={[css.alignSelfC, css.marginR10, css.marginL10, css.liteGreyBG, css.borderRadius10, { height: 7, width: '75%' }]}>
                                                        <View style={[css.yellowBG, css.borderRadius10, {
                                                            height: 7, width:
                                                                (genieData.feedback.oneStar ? (genieData.feedback.oneStar /
                                                                    (genieData.feedback.fiveStar + genieData.feedback.fourStar + genieData.feedback.threeStar + genieData.feedback.twoStar + genieData.feedback.oneStar)
                                                                    * 100)
                                                                    : '0') + '%'
                                                        }]}></View>
                                                    </View>
                                                    <View style={{ width: '15%' }}><Text>({genieData.feedback.oneStar ? genieData.feedback.oneStar : '0'})</Text></View>
                                                </View>
                                            </View>
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
                hideModalContentWhileAnimating={true}
                onBackButtonPress={() => setserviceDetailModal(!serviceDetailModal)}
            >
                {jobdetailsData &&
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
                        <ScrollView>
                            <View style={[bookModal.modalBody]}>
                                <View style={[css.flexDR, css.line20]}>
                                    <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'expert.png')} />
                                    <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Service Details</Text>
                                </View>
                                <View style={[css.line20]}>
                                    <Text style={[css.f18, css.fsb, css.ttC, css.blackC,]}>What's included</Text>
                                    <Text style={[css.fm, css.blackC, css.spaceB5,]}>
                                        {jobdetailsData.Notes1}
                                    </Text>
                                </View>
                                <View style={[css.line20]}>
                                    <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Availability</Text>
                                    <View style={[css.flexDRSA]}>
                                        <View>
                                            {jobdetailsData.charges.unitCharges ?
                                                <Image style={{ width: 15, height: 15 }} source={require(imgPath + 'cross-icon.png')} />
                                                :
                                                <Image style={{ width: 15, height: 15 }} source={require(imgPath + 'right-icon.png')} />
                                            }
                                            <View style={[css.alignItemsC, { width: 60, height: 60, }]}>
                                                <Image style={{ width: 55, height: 55 }} source={require(imgPath + 'emergency.png')} />
                                            </View>
                                            <Text>Emergency</Text>
                                        </View>
                                        <View>
                                            <Image style={{ width: 15, height: 15 }} source={require(imgPath + 'right-icon.png')} />
                                            <View style={[css.alignItemsC, { width: 60, height: 60, }]}>
                                                <Image style={{ width: 55, height: 55 }} source={require(imgPath + 'sameDay.png')} />
                                            </View>
                                            <Text>same day</Text>
                                        </View>
                                        <View>
                                            <Image style={{ width: 15, height: 15 }} source={require(imgPath + 'right-icon.png')} />
                                            <View style={[css.alignItemsC, { width: 60, height: 60, }]}>
                                                <Image style={{ width: 55, height: 55 }} source={require(imgPath + 'schedule.png')} />
                                            </View>
                                            <Text>scheduled</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[css.line20]}>
                                    <Text style={[css.f18, css.fr, css.ttC, css.blackC,]}>Note:</Text>
                                    <Text style={[css.fm, css.blackC, css.spaceB5,]}>
                                        {jobdetailsData.Notes2}
                                    </Text>
                                </View>
                                {/* {jobdetailsData.subCategory.customerNotes &&
                                    <View style={[css.line20]}>
                                        <Text style={[css.f18, css.fsb, css.ttC, css.blackC,]}>Notes</Text>
                                        <Text style={[css.fm, css.blackC, css.spaceB5,]}>
                                            {jobdetailsData.subCategory.customerNotes}
                                        </Text>
                                    </View>
                                } */}
                            </View>
                        </ScrollView>
                    </View>

                }
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
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
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
                        <ScrollView>
                            <View style={[bookModal.modalBody]}>
                                <View style={[css.flexDR, css.line10]}>
                                    <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'priceverification.png')} />
                                    <Text style={[css.f20, css.lGreyC, css.alignSelfC, css.fsb]}>Pricing Details</Text>
                                </View>
                                <View>
                                    <View style={[css.line20]}>
                                        <View style={[css.flexDR]}>
                                            <Image
                                                style={{ width: 20, height: 20, marginRight: 10 }}
                                                source={require(imgPath + 'iconIndex.png')}
                                            />
                                            {jobdetailsData && !!jobdetailsData.serviceBasedType &&
                                                <Text style={[css.f16, css.fsb, css.brandC, css.spaceB10]}>
                                                    {jobdetailsData.serviceBasedType}
                                                </Text>
                                            }
                                        </View>
                                        {jobdetailsData && jobdetailsData.subCategory && !!jobdetailsData.subCategory.pricingUnitNote &&
                                            <View>
                                                <Text style={[css.fm, css.blackC, css.spaceB10, css.f14]}>
                                                    {jobdetailsData.subCategory.pricingUnitNote.mainUnitNote}{' '}
                                                    {jobdetailsData.subCategory.pricingUnitNote.additionalUnitNote}
                                                </Text>
                                                <Text style={[css.fm, css.blackC, css.spaceB10, css.f14]}>
                                                    {jobdetailsData.subCategory.pricingUnitNote.asteriskNote}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={[css.line20]}>
                                        <Text style={[css.f16, css.fm, css.blackC, css.spaceB10]}>NOTES: </Text>
                                        <Text style={[css.fm, css.blackC, css.spaceB5, css.f14]}>Additional charges apply for Emergency bookings, based on availability and permissions from community/ building, as confirmed by the customer. VAT charges are not included and are based on the total invoice amount.</Text>
                                    </View>
                                    <View style={[css.line20]}>
                                        <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Warranty</Text>
                                        <View style={[css.flexDR]}>
                                            <View style={[css.width30]}><Image style={[css.imgg80]} source={require(imgPath + 'warranty.png')} /></View>
                                            <View style={[css.flexDC, css.alignSelfC]}>
                                                {jobdetailsData.charges.unitCharges ? null : <Text style={[css.greyC, css.fm]}>As provided in the bill estimate.</Text>}
                                                <Text style={[css.greyC, css.fm]}>For more details, visit</Text>
                                                <Text style={[css.brandC, css.fsb]} onPress={() => { Linking.openURL('https://www.homegenie.com/en/warranty') }}>HomeGenie warranty policy</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                }
            </Modal>
            <Modal
                isVisible={typeModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
                    <View style={css.centeredView}>
                        <View style={css.modalNewView}>
                            <View style={[css.modalNewHeader]}>
                                <View><Text style={[css.modalNewText, css.f18, css.blackC, css.fm]}>
                                    {/* {jobdetailsData.charges.unitCharges != 0 && 'Fixed Price '}
                                    {jobdetailsData.charges.unitCharges == 0 && jobdetailsData.charges.callOutCharges != 0 && 'Inspection based '}
                                    {jobdetailsData.charges.unitCharges == 0 && jobdetailsData.charges.callOutCharges == 0 && 'Survey based '} */}
                                    {jobdetailsData.serviceBasedType}
                                </Text></View>
                                {jobdetailsData.charges.unitCharges != 0 &&
                                    <View><Text style={[css.textCenter, css.blackC, css.f14, css.fr]}>The selected service is a fixed price service with the price estimate calculated based on the details you select while booking the service.</Text></View>
                                }
                                {jobdetailsData.charges.unitCharges == 0 && jobdetailsData.charges.callOutCharges != 0 &&
                                    <View><Text style={[css.textCenter, css.blackC, css.f14, css.fr]}>If the service is an inspection based service e.g.an AC repair then it requires an inspection visit for a diagnosis and thereby an inspection charge is applicable to this service. The inspection will result in an estimate for the customer which needs to be approved or rejected. If approved the service is delivered at the agreed estimate. If rejected, the inspection charge should be paid by the customer.</Text></View>
                                }
                                {jobdetailsData.charges.unitCharges == 0 && jobdetailsData.charges.callOutCharges == 0 &&
                                    <View><Text style={[css.textCenter, css.blackC, css.f14, css.fr]}>The selected issue or service requires us to visit your location to survey and ascertail your requirements before we could provide you with an estimate.</Text></View>
                                }
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
                                    <Text style={[css.modalNewText, css.blackC, css.fr, css.f12]}>An additional Emergency charges</Text>
                                    <Text style={[css.modalNewText, css.blackC, css.fr, css.f12]}>are applicable to the booking.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
            {jobdetailsData && jobdetailsData.status == 'RATING' &&
                <Modal
                    isVisible={ratingModal}
                    animationIn='fadeIn'
                    animationInTiming={700}
                    animationOut='fadeOut'
                    animationOutTiming={700}
                    coverScreen={true}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                >
                    {jobdetailsData &&
                        <View style={css.centeredView}>
                            <View style={css.modalNewView}>
                                <View style={[css.modalNewHeader,]}>
                                    <TouchableOpacity
                                        style={[css.flexDR]}
                                        onPress={() => setratingModal(!ratingModal)}
                                    >
                                        <Image style={[css.alignSelfC, css.marginR10]} source={require(imgPath + 'backArrowBlack.png')} />
                                        <Text style={[css.fm, css.f16, css.greyC]}>Back</Text>
                                    </TouchableOpacity>
                                    <View><Text style={[css.modalNewText, css.f18, css.brandC, css.fm]}>Rate Your Genie</Text></View>
                                    <View>
                                        <View style={[css.flexDR, css.alignItemsC, css.justifyContentC]}>
                                            <Image
                                                style={[css.img30, css.marginR10]}
                                                source={{ uri: jobdetailsData.categoryImage.original }} />
                                            <Text>{jobdetailsData.categoryName}</Text>
                                        </View>
                                        <Text style={[css.textCenter, css.blackC, css.f14, css.fr]}>{jobdetailsData.subCategory.subCategoryName}</Text>
                                        <Text style={[css.brandC, css.fm, css.f18, css.textCenter, css.marginT10]}>JOB ID: {jobdetailsData.uniqueCode}</Text>
                                    </View>
                                </View>
                                <View style={[css.modalNewBody, css.paddingT0]}>
                                    <View style={[css.marginT10]}>
                                        <View style={[css.flexDRSA, css.padding10, css.alignItemsC, css.justifyContentC]}>
                                            <Image
                                                style={[styles.genieLogo, css.img100, css.borderGrey1, css.marginR20, css.borderRadius50]}
                                                source={{ uri: jobdetailsData.driverData.profilePicURL.original }}
                                            />
                                            <Text style={[css.fbo, css.f20, css.blackC]}>{jobdetailsData.driverData.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={[css.brandC, css.fr, css.f12, css.marginB5]}>Help us improve our services by rating your Genie</Text>
                                            <View style={[css.alignItemsC, css.justifyContentC]}>
                                                <StarRating
                                                    disabled={false}
                                                    emptyStar={'ios-star'}
                                                    fullStar={'ios-star'}
                                                    halfStar={'ios-star-half'}
                                                    iconSet={'Ionicons'}
                                                    maxStars={5}
                                                    rating={starCount}
                                                    selectedStar={(rating) => setstarCount(rating)}
                                                    fullStarColor={'#f6b700'}
                                                    emptyStarColor={'#ccc'}
                                                    starSize={30}
                                                    containerStyle={[css.width70]}
                                                />
                                                {starValidate && <Text style={[css.errorText]}>Please select star for rating</Text>}
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={[css.brandC, css.fr, css.f12, css.marginT10]}>Write a review</Text>
                                            <TextInput
                                                style={[form.input, css.marginT5, { height: 100 }]}
                                                onChangeText={setReviewTextArea}
                                                multiline={true}
                                                placeholder={'Write about the Genie and the way they performed the service'}
                                                numberOfLines={5}
                                            />
                                            {reviewValidate && <Text style={[css.errorText]}>Please enter some reviews</Text>}
                                        </View>
                                        <View style={[css.marginT10, css.flexDR]}>
                                            <Checkbox
                                                status={favGeniechecked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setfavGenieChecked(!favGeniechecked);
                                                }}
                                                color={'#2eb0e4'}
                                            />
                                            <Text style={[css.brandC, css.fr, css.f12, css.alignSelfC]}>Mark Genie as your favourite</Text>
                                        </View>
                                        <Pressable
                                            onPress={() => updateRatingData(jobdetailsData._id)}
                                            style={[css.brandBG, css.alignItemsC, css.justifyContentC, css.borderRadius5, css.marginT5, css.borderRadius30, css.boxShadow, { height: 40 }]}
                                        ><Text style={[css.whiteC, css.fm, css.f16]}>SUBMIT</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </Modal>
            }
            <Modal
                isVisible={jobDeleteModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
                    <View style={css.centeredView}>
                        <View style={css.modalNewView}>
                            <View style={[css.modalNewHeader]}>
                                <View>
                                    <Text style={[css.modalNewText, css.f12, css.blackC, css.fm]}>Are you sure you want to cancel the Booking?</Text></View>
                                <View>
                                    <Text style={[css.textCenter, css.blackC, css.f12, css.fm]}>You have to pay {cancelCharge} AED as cancellation charges.</Text>
                                </View>
                            </View>
                            <View style={[css.modalNewBody, css.alignItemsC, css.paddingT0]}>
                                <View style={[css.flexDRSA, css.alignItemsC, css.imgFull, css.alignItemsC]}>
                                    <TouchableOpacity
                                        onPress={() => togglecancelReasonModal()}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.liteGreyBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.blackC, css.fm, css.f14]}>Yes, I am sure</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => toggleJobDeleteModal()}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.yellowBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.whiteC, css.fm, css.f14]}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
            <Modal
                isVisible={cancelReasonModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
                    <View style={css.centeredView}>
                        <View style={css.modalNewView}>
                            <View style={[css.modalNewHeader]}>
                                <TouchableOpacity
                                    style={[css.flexDR, css.padding0]}
                                    onPress={() => togglecancelReasonModal()}
                                >
                                    <Image style={[css.alignSelfC, css.marginR10]} source={require(imgPath + 'backArrowBlack.png')} />
                                    <Text style={[css.fm, css.f16, css.greyC]}>Back</Text>
                                </TouchableOpacity>
                                <View>
                                    <Text style={[css.modalNewText, css.f18, css.blackC, css.fm]}>Any reason for cancellation?</Text>
                                </View>
                            </View>
                            <View style={[css.modalNewBody,]}>
                                <View>
                                    <View style={[css.line5, css.flexDR]}>
                                        <RadioButton
                                            value="Professional not assigned"
                                            status={deleteJobReason === 'Professional not assigned' ? 'checked' : 'unchecked'}
                                            onPress={() => setdeleteJobReason('Professional not assigned')}
                                            uncheckedColor={'#ccc'}
                                            color={'#2eb0e4'}
                                        />
                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>Professional not assigned</Text>
                                    </View>
                                    <View style={[css.line5, css.flexDR]}>
                                        <RadioButton
                                            value="Placed the request by mistake"
                                            status={deleteJobReason === 'Placed the request by mistake' ? 'checked' : 'unchecked'}
                                            onPress={() => setdeleteJobReason('Placed the request by mistake')}
                                            uncheckedColor={'#ccc'}
                                            color={'#2eb0e4'}
                                        />
                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>Placed the request by mistake</Text>
                                    </View>
                                    <View style={[css.line5, css.flexDR]}>
                                        <RadioButton
                                            value="Service not required at the booked time"
                                            status={deleteJobReason === 'Service not required at the booked time' ? 'checked' : 'unchecked'}
                                            onPress={() => setdeleteJobReason('Service not required at the booked time')}
                                            uncheckedColor={'#ccc'}
                                            color={'#2eb0e4'}
                                        />
                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>Service not required at the booked time</Text>
                                    </View>
                                    <View style={[css.line5, css.flexDR]}>
                                        <RadioButton
                                            value="Concerned about service hygiene"
                                            status={deleteJobReason === 'Concerned about service hygiene' ? 'checked' : 'unchecked'}
                                            onPress={() => setdeleteJobReason('Concerned about service hygiene')}
                                            uncheckedColor={'#ccc'}
                                            color={'#2eb0e4'}
                                        />
                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>Concerned about service hygiene</Text>
                                    </View>
                                    <View style={[css.line5, css.flexDR]}>
                                        <RadioButton
                                            value="Prices are very high"
                                            status={deleteJobReason === 'Prices are very high' ? 'checked' : 'unchecked'}
                                            onPress={() => setdeleteJobReason('Prices are very high')}
                                            uncheckedColor={'#ccc'}
                                            color={'#2eb0e4'}
                                        />
                                        <Text style={[css.alignSelfC, css.blackC, css.fm, css.f12]}>Prices are very high</Text>
                                    </View>

                                </View>
                                <View style={[css.flexDRSA, css.alignItemsC, css.imgFull, css.alignItemsC]}>
                                    <TouchableOpacity
                                        onPress={() => deleteJob(jobdetailsData._id)}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.yellowBG, css.imgFull, { height: 40, }]}
                                    >
                                        <Text style={[css.whiteC, css.fm, css.f14]}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
            <Modal
                isVisible={rejectJobModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
                    <View style={css.centeredView}>
                        <View style={css.modalNewView}>
                            <View style={[css.modalNewHeader]}>
                                <TouchableOpacity
                                    style={[css.flexDR, css.padding0, css.marginB10]}
                                    onPress={() => togglerejectJobModal()}
                                >
                                    <Image style={[css.alignSelfC, css.marginR10]} source={require(imgPath + 'backArrowBlack.png')} />
                                    <Text style={[css.fm, css.f16, css.greyC]}>Back</Text>
                                </TouchableOpacity>
                                <View>
                                    <Text style={[css.modalNewText, css.f14, css.blackC, css.fm]}>Are you sure you want to cancel the Booking?</Text>
                                </View>
                            </View>
                            <View style={[css.modalNewBody, css.alignItemsC, css.paddingT0]}>
                                <View style={[css.flexDRSA, css.alignItemsC, css.imgFull, css.alignItemsC]}>
                                    <TouchableOpacity
                                        onPress={() => inspectionAccept('REJECTED', jobdetailsData._id)}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.yellowBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.whiteC, css.fm, css.f12, css.textCenter]}>NO, REQUEST REVISED</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => inspectionAccept('CLOSED', jobdetailsData._id)}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.liteGreyBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.blackC, css.fm, css.f12, css.textCenter]}>YES, CLOSE THE JOB</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
            <Modal
                isVisible={advancePaynowModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
                    <View style={css.centeredView}>
                        <View style={css.modalNewView}>
                            <View style={[css.modalNewHeader]}>
                                <View>
                                    <Text style={[css.modalNewText, css.f14, css.blackC, css.fm]}>Kindly pay Advance payment of {jobdetailsData.charges.advanceCharges ? jobdetailsData.charges.advanceCharges : ''}  AED in advance to continue the job service.</Text>
                                </View>
                            </View>
                            <View style={[css.modalNewBody, css.alignItemsC, css.paddingT0]}>
                                <View style={[css.flexDRSA, css.alignItemsC, css.imgFull, css.alignItemsC]}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PaymentPage',
                                            { jobId: jobdetailsData._id, amount: jobdetailsData.charges.advanceCharges })}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.yellowBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.whiteC, css.fm, css.f12, css.textCenter]}>Pay Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
            <Modal
                isVisible={advancePaynowRejectModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {jobdetailsData &&
                    <View style={css.centeredView}>
                        <View style={css.modalNewView}>
                            <View style={[css.modalNewHeader]}>
                                <View>
                                    <Text style={[css.modalNewText, css.f14, css.blackC, css.fm]}>Are you sure you want to reject the job?</Text>
                                </View>
                            </View>
                            <View style={[css.modalNewBody, css.alignItemsC, css.paddingT0]}>
                                <View style={[css.flexDRSA, css.alignItemsC, css.imgFull, css.alignItemsC]}>
                                    <TouchableOpacity
                                        onPress={() => advancePaynowReject('REJECTED', jobdetailsData._id)}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.yellowBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.whiteC, css.fm, css.f12, css.textCenter]}>NO, REQUEST REVISED</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => advancePaynowReject('CLOSED', jobdetailsData._id)}
                                        style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.borderRadius10, css.liteGreyBG, { width: '40%', height: 40, }]}
                                    >
                                        <Text style={[css.blackC, css.fm, css.f12, css.textCenter]}>YES, CLOSE THE JOB { }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
        </SafeAreaView>
    );
}
const form = StyleSheet.create({
    input: { borderRadius: 10, borderWidth: 1, borderColor: '#ccc', height: 50, width: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 12, fontFamily: 'PoppinsR', color: '#525252' },
})
const styles = StyleSheet.create({
    scene: { flex: 1 },
    cancelButtonContainer: { position: 'absolute', bottom: 0, left: 0, right: 10, marginLeft: 20, marginRight: 20 },
    cancelButton: { width: '90%', height: 50, backgroundColor: '#d1d1d1', alignItems: 'center', justifyContent: 'center', borderRadius: 10, },
    reditems: { color: 'red' }
});
const bookModal = StyleSheet.create({
    modalViewFull: {
        backgroundColor: "white",
        padding: 20,
        height: windowHeight,
    },
    modalHeader: { fontSize: 14, },

})
//jobdetailsData.reditems
