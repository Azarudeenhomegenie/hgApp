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
import Text from "../MyText";
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios'
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import StatusBarAll from "../StatusBar";
import { List, Checkbox, RadioButton } from 'react-native-paper';
import { connect, useDispatch, useSelector } from "react-redux";
import css, { alignItemsC, justifyContentC } from '../commonCss';
import { loadJobDetails, getJobDetail, getGenie, addRating, updateInspection, deletetheJob, rejectAdvancePayment } from "../../reducers/jobDetailReducer";
import { getLoggedInStatus, getUser, getAccessToken } from '../../reducers/authReducer';
import { BASE_URL } from '../../base_file';
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function GenieModal({ route, props, navigation }) {
    console.log('testGenieMOdal');
    const [isLoading, setLoading] = useState(true);
    const [genieData, setGenieData] = useState(null);
    const [genieModal, setGenieModal] = useState(true);
    const dispatch = useDispatch();
    // const getGenieData = async (genieId) => {
    //     console.log('Token for Genie', token);
    //     console.log('genieId', genieId);
    //     let gid = genieId;
    //     try {
    //         let formData = new FormData();
    //         formData.append('Auth', token);
    //         const api = `${BASE_URL}customer/getDriverDetails?id=${gid}`
    //         const response = await fetch(api, {
    //             method: 'GET',
    //             headers: { Authorization: `Bearer ${token}` },
    //             ///body: formData
    //         });
    //         const jsonData = await response.json();
    //         let array = jsonData.data;
    //         console.log('genieData', array);
    //         setGenieData(array);
    //         setGenieModal(true);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    // useFocusEffect(
    //     useCallback(() => {
    //         const loadJobdetails = async () => {
    //             await dispatch(loadJobDetails(token, jobId));
    //         };

    //         loadJobdetails();
    //         console.log('loadJobdetails', loadJobdetails);
    //     }, [jobId, isFocused])
    // );
    return (
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
    )
}