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
import Modal from 'react-native-modal';
import LoginModal from "../components/loginModal";
import StatusBarAll from "../components/StatusBar";
import css, { brandC } from "../components/commonCss";
import { BASE_URL } from '../base_file';
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../reducers/jobDetailReducer";
import { getCurrentBookings, loadBookings } from '../reducers/bookingsReducer'
import { getLoggedInStatus, getUser, getAccessToken } from '../reducers/authReducer';

const PaymentScreen = ({ props, navigation, currentBookings, pastBookings, token, route }) => {
    const [isLoading, setLoading] = useState(true);
    const [userName, setUserName] = useState(token);
    const jobId = route.params.jobId;
    const amount = route.params.amount;
    const [paymentData, setPaymentData] = useState([]);
    const [amountPaidModal, setamountPaidModal] = useState(false)
    const toggleamountPaidModal = () => { setamountPaidModal(!amountPaidModal) };

    // console.log('token_PaymentPage', token);
    // console.log('jobID_PaymentPage', jobId);
    // console.log('amount_PaymentPage', amount);
    const dispatch = useDispatch();


    const getPaymentDetails = async (jobId) => {
        console.log('payment for job');
        console.log('jobId', jobId);
        console.log('userToken', token);
        console.log(amount);
        const isUpdated = await dispatch(updatePayment(token, jobId, amount));
        if (isUpdated) {
            console.log('Status updated success');
            setamountPaidModal(true)
        } else {
            console.log('payment Fail');
        }
    }
    useEffect(async () => {
        if (token) {
            //console.log('TKN:', token)
            dispatch(loadBookings(token));
        }
    }, []);




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
                    <Text style={[styles.headerTitle]}>Payment Method</Text>
                </View>
            </View>
            <View style={[css.container]}>
                <View style={[css.alignItemsC, css.marginT10]}><Text style={[css.fsb, css.f18, css.blackC]}>Please select a payment method</Text></View>
                <View style={[css.alignItemsC, css.marginT10]}><Text style={[css.greyC, css.f14, css.fr, css.textCenter]}>NOTE: You will receive a system generated invoice on your registered email address immediately after you complete the payment. If not received, please check your SPAM folder or contact <Text style={[css.greyC, css.fm, css.f14]} onPress={() => Linking.openURL('mailto:support@homegenie.com')}>support@homegenie.com</Text></Text></View>
                <View style={[css.borderGrey1, css.borderRadius5, css.padding10, css.liteBlueBG, css.marginT20, css.paddingT20, css.paddingB20]}>
                    <View style={[css.borderGrey1, css.borderRadius5, css.padding10, css.whiteBG]}>
                        <Text style={[css.brandC, css.f14, css.fm, css.textCenter]}>Select from your saved cards</Text>
                        <Text style={[css.brandC, css.f14, css.fm, css.textCenter]}>Cash on delivery</Text>
                    </View>
                </View>
                <Pressable
                    style={[css.blueBtn, css.imgFull, css.marginT20, css.boxShadow, css.alignItemsC, css.justifyContentC, css.borderRadius30, { height: 50 }]}
                    onPress={() => getPaymentDetails(jobId)}
                >
                    <Text style={[css.fsb, css.whiteC, css.f16]}>PAY NOW</Text>
                </Pressable>
            </View>
            <Modal
                isVisible={amountPaidModal}
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
                            <View>
                                <Text style={[css.modalNewText, css.f14, css.blackC, css.fm]}>Your amount {amount} was paid.</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.paddingT0]}>
                            <View style={[css.flexDRSA, css.alignItemsC, css.imgFull, css.alignItemsC]}>
                                <Pressable
                                    onPress={() => navigation.navigate('MyBookingPage')}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, css.yellowBG, css.borderRadius30, { width: '40%', height: 40, }]}
                                >
                                    <Text style={[css.whiteC, css.fm, css.f14]}>Got it</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
)(PaymentScreen);