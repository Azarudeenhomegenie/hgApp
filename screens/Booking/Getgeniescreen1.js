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
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import GetgenieHeader from './GetgenieHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { RadioButton, List } from 'react-native-paper';
import Modal from 'react-native-modal';
import GetgenieFooter from './GetgenieFooter';
import StatusBarAll from "../../components/StatusBar";
import css from '../../components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';

defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
        flex: 1,
        justifyContent: 'center'
    }
};
onNextStep = () => {
    console.log('called next step');
};

onPrevStep = () => {
    console.log('called previous step');
};

onSubmitSteps = () => {
    console.log('called on submit step.');
};
const progressStepsStyle = {
    activeStepIconBorderColor: '#f6b700',
    activeLabelColor: '#fff',
    activeStepNumColor: 'transparent',
    activeStepIconColor: 'transparent',
    completedStepIconColor: '#f6b700',
    completedProgressBarColor: '#f6b700',
    completedCheckColor: '#fff',
    progressBarColor: 'grey',
    borderWidth: 2,
    disabledStepIconColor: '#ebebe4',
    disabledStepNumColor: 'transparent',
};

const buttonTextStyle = {
    color: 'grey',
    fontWeight: 'bold'
};
export default function Getgeniescreen1(props) {
    const [scopeModalVisible, setscopeModalVisible] = useState(false);
    const [termModalVisible, settermModalVisible] = useState(false);
    const [pricingModalVisible, setpricingModalVisible] = useState(false);
    const [faqModalVisible, setfaqModalVisible] = useState(false);
    const [modalServicePriority, setModalServicePriority] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [totalPriceModal, setTotalPriceModal] = useState(false);
    const [promocodeModal, setPromocodeModal] = useState(false);
    const [offerlistModal, setOfferlistModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('low-cooling');
    const [items, setItems] = useState([
        { label: '1. Low Cooling', value: 'low-cooling' },
        { label: '2. Too much cooling', value: 'too-much-cooling' },
        { label: '3. No cooling', value: 'no-cooling' },
        { label: '4. Other', value: 'other' },
    ]);
    const [radioValue, setRadioValue] = useState('first');
    const togglescopeModal = () => { setscopeModalVisible(!scopeModalVisible) };
    const toggletermModal = () => { settermModalVisible(!termModalVisible) };
    const togglepricingModal = () => { setpricingModalVisible(!pricingModalVisible) };
    const togglefaqModal = () => { setfaqModalVisible(!faqModalVisible) };
    const toggleratingModal = () => { setRatingModal(!ratingModal) };
    const toggletotalPriceModal = () => { setTotalPriceModal(!totalPriceModal) };
    const togglepromocodeModal = () => { setPromocodeModal(!promocodeModal) };
    const toggleofferlistModal = () => { setOfferlistModal(!offerlistModal) };
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    return (
        <View>
            <GetgenieHeader />
            <ProgressSteps {...progressStepsStyle}>
                <ProgressStep
                    label="Scope"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    scrollViewProps={defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 1!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Schedule"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    scrollViewProps={defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 1!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Location"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    scrollViewProps={defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 1!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Confirmation"
                    onPrevious={onPrevStep}
                    onSubmit={onSubmitSteps}
                    scrollViewProps={defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 1!</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
            <ScrollView>
                <View style={[css.section], { marginTop: 190 }}>
                    <View style={[css.container]}>
                        <View>
                            <Image style={{ width: '100%', height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10, }} source={require(imgPathImage + 'acCoolingBooking.png')} />
                            <TouchableOpacity style={[styles.rating], {
                                position: 'absolute', top: 10, right: 10, borderRadius: 10, width: 50, height: 50, backgroundColor: '#fff', shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }} onPress={() => toggleratingModal()}>
                                <View style={[styles.ratingHeader], { backgroundColor: '#2eb0e4', alignItems: 'center', padding: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}><Text style={[css.whiteC]}>4.0 <Image style={{ width: 10, height: 10 }} source={require(imgPath + 'star-fill.png')} /></Text></View>
                                <View style={[styles.ratingFooter, css.flexDC, css.centeredView, css.padding5]}><Text style={[css.f10]}>658</Text><Text style={[css.f10]}>reviews</Text></View>
                            </TouchableOpacity>
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
                            <View><Text style={{ fontSize: 18, fontFamily: 'PoppinsBO', color: '#2eb0e4' }}>What service do you need?</Text></View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'PoppinsM' }}>What is the issue?</Text>
                                <DropDownPicker
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    style={{
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: '#d1d1d1',
                                        height: 40,
                                        marginTop: 5
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                {/* <Text style={{ fontSize: 14, fontFamily: 'PoppinsM' }}>Your service priority</Text>
                                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={radioValue}>
                                    <View style={[css.flexDR_ALC]}>
                                        <RadioButton value="first" />
                                        <Text>First</Text>
                                    </View>
                                </RadioButton.Group> */}
                                <Text style={{ fontSize: 14, fontFamily: 'PoppinsM' }}>Your service priority</Text>
                                <View style={[css.flexDR_ALC]}>
                                    <View style={styles.rbWrapper}>
                                        <TouchableOpacity style={styles.rbStyle} >
                                            <View style={styles.selected} />
                                        </TouchableOpacity>
                                        <Text style={styles.rbtextStyle}>Emergency</Text>
                                    </View>
                                    <Pressable onPress={() => setModalServicePriority(true)}><Text style={[css.brandC, css.f11, css.fm, css.marginL5]}>See other options</Text></Pressable>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'PoppinsM' }}>Number of units to inspect ?</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'PoppinsR', color: '#ccc' }}>Addition charges &nbsp; &nbsp; 50/units</Text>
                                <View style={[css.flexDR, css.imgFull, css.spaceT5]}>
                                    <Pressable style={{ width: '33%', alignItems: 'center', backgroundColor: '#f9f9f9', color: '#7b7b7b', borderColor: '#ccc', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: 35, justifyContent: 'center', borderWidth: 1, borderRightWidth: 0 }}><Text style={{ color: '#7b7b7b', fontSize: 24, fontFamily: 'PoppinsBO' }}>-</Text></Pressable>
                                    <View style={{ width: '34%', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderLeftwidth: 1, borderColor: '#ccc', justifyContent: 'center' }}><Text style={{ fontSize: 18 }}>1</Text></View>
                                    <Pressable style={{ width: '33%', alignItems: 'center', backgroundColor: '#2eb0e4', borderWidth: 1, borderLeftWidth: 0, borderColor: '#ccc', borderTopRightRadius: 5, borderBottomRightRadius: 5, height: 35, justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 24, fontFamily: 'PoppinsBO' }}>+</Text></Pressable>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'PoppinsM' }}>Is this a furnished location ?</Text>
                                <View style={[css.flexDRSE, css.imgFull, css.spaceT5]}>
                                    <Pressable style={[styles.btnYes]}><Text>YES</Text></Pressable>
                                    <Pressable style={[styles.btnYesSelected]}><Text style={[styles.btnYesSelectedText]}>NO</Text></Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[css.section, css.container]}>
                    <View style={[css.flexDR,]}>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'expert-professionals-icon.png')} />
                            <Text style={[css.brandC, css.alignSelfC]} onPress={togglescopeModal}>Scope Details</Text>
                        </View>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'service-info.png')} />
                            <Text style={[css.brandC, css.alignSelfC]} onPress={toggletermModal}>Terms of use</Text>
                        </View>
                    </View>
                    <View style={[css.flexDR, css.spaceT10, css.spaceB10]}>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'pricing-icon.png')} />
                            <Text style={[css.brandC, css.alignSelfC]} onPress={togglepricingModal}>Pricing Details</Text>
                        </View>
                        <View style={[css.flexDR, css.width50]}>
                            <Image source={require(imgPath + 'help-icon.png')} />
                            <Text style={[css.brandC, css.alignSelfC]} onPress={togglefaqModal}>FAQ</Text>
                        </View>
                    </View>
                </View>
                <View style={[css.section, css.fixedContainer, { zIndex: 999 }]}>
                    <View style={[css.container, css.whiteBG, styles.fixedHeader, css.padding30,]}>
                        <View style={[css.flexDRSB]}>
                            <TouchableOpacity onPress={() => toggletotalPriceModal
                                ()} style={[css.flexDC]}><Text style={[css.fr, css.f16, css.blackC]}>Total</Text><Text style={[css.fbo, css.f18, css.blackC]}>AED <Text style={[css.fbo, css.f18, { color: 'red' }]}>190</Text></Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.continueBtn]} onPress={() => { props.navigation.navigate("GetgeniePage2") }}><Text style={[css.fbo, css.f16, css.whiteC]}>NEXT</Text></TouchableOpacity>
                            <TouchableOpacity style={[css.flexDC, css.alignCenter]} onPress={() => togglepromocodeModal()}><Image style={[css.img30]} source={require(imgPath + 'percenttags.png')} /><Text style={[css.brandC, css.fsb, css.f18]}>Offer</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalServicePriority}
                width="100%"
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.modalHeader]}>
                            <Text style={styles.modalText}>How soon do you want us to attend?</Text>
                        </View>
                        <View style={[styles.modalBody]}>
                            <View style={[styles.radioBtns]}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={styles.rbWrapper}>
                                        <TouchableOpacity style={styles.rbStyle}></TouchableOpacity>
                                        <View style={[css.flexDC]}>
                                            <Text style={[styles.rbModaltextStyle]}>Scheduled *</Text>
                                            <View style={[css.flexDC]}>
                                                <Text style={[css.f10, css.marginL5]}>(After 24 hours, instant confirmation and best prices)</Text>
                                                <Text style={[css.f10, css.marginL5]}>*including Friday</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={styles.rbWrapper}>
                                        <TouchableOpacity style={styles.rbStyle}></TouchableOpacity>
                                        <View style={[css.flexDC]}>
                                            <Text style={[styles.rbModaltextStyle]}>Same Day</Text>
                                            <View style={[css.flexDC]}>
                                                <Text style={[css.f10, css.marginL5, css.flexWrapW]}>(In the same day, confirmation based on availability, and no additional charges)</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={styles.rbWrapper}>
                                        <TouchableOpacity style={styles.rbStyle} >
                                            <View style={styles.selected} />
                                        </TouchableOpacity>
                                        <View style={[css.flexDC]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={styles.rbModaltextStyle}>Emergency</Text>
                                                <Image style={{ width: 20, height: 20, marginLeft: 5 }} source={require(imgPath + 'emergency-icon-pink.png')} />
                                            </View>
                                            <View style={[css.flexDC]}>
                                                <Text style={[css.f10, css.marginL5, css.flexWrapW]}>(Within 2 hours, confirmation based on availability and additional charges)</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[css.alignItemsC, css.spaceT10]}>
                                <Pressable
                                    style={[styles.continueBtn]}
                                    onPress={() => setModalServicePriority(!modalServicePriority)}
                                >
                                    <Text style={[styles.continueBtnText]}>Continue</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={scopeModalVisible}
                animationIn='slideInLeft'
                animationInTiming={700}
                animationOut='slideOutLeft'
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
                                style={[css.flexDRR, css.padding20]}
                                onPress={() => setscopeModalVisible(!scopeModalVisible)}
                            >
                                <Image source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <View style={[css.flexDR, css.line20]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'expert.png')} />
                                <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Scope Details</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>what's included</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB5,]}>- Visit the customer location,{"\n"} - Inspection and diagnosis of the issue, on-site,{"\n"} - For minor repair - work that can be completed, on the spot, in 1 hour,{"\n"} - For major repair - detailed diagnosis and bill estimation, including ascertaining the availability of material and/ or spare parts,{"\n"} - Testing and demo; and{"\n"} - Post-inspection cleanup.</Text>
                            </View>
                            <View style={[css.spaceB20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>NOTES</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB5,]}>Customer to assist in getting access to community and service location, and electricity and water connection to be active.</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Availability</Text>
                                <View style={[css.flexDRSA]}>
                                    <Image style={{ width: 50, height: 56 }} source={require(imgPath + 'emergency-2x.png')} />
                                    <Image style={{ width: 50, height: 57 }} source={require(imgPath + 'sameday-2x.png')} />
                                    <Image style={{ width: 51, height: 56 }} source={require(imgPath + 'friday-2x.png')} />
                                    <Image style={{ width: 53, height: 56 }} source={require(imgPath + 'schedule-2x.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={termModalVisible}
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
                                onPress={() => settermModalVisible(!termModalVisible)}
                            >
                                <Image style={[css.transform180]} source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <View style={[css.flexDR, css.line20]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'service-info-big.png')} />
                                <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Terms of use</Text>
                            </View>
                            <View style={[css.spaceB10]}>
                                <Text style={[css.fm, css.blackC,]}>HomeGenie is a online on-demand "managed" marketplace which ensure that its Users get the Services they booked to the quality, price and as per their schedule they desire. We not only identify, train and onboard Service delivery Partners (or "Genie") using a very stringent criteria but also ensure that they are matched to only the right Service requested by the User based on verifying their skills, legal status, ratings and reviews, in real-time. All these activities are conducted on HomeGenie platform, our proprietary purpose built technology system. Kindly refer to the Terms of Use at https://www.homegenie.com/en/term-of-use/ for further information. </Text>
                            </View>
                            <View style={[css.spaceB10]}>
                                <Text style={[css.fm, css.brandC,]}>Cancellation charges:</Text>
                            </View>
                            <View style={[css.spaceB20]}>
                                <Text style={[css.fm, css.blackC,]}>Service booked by the User can be cancelled at any time before the booking has been attended at the User location. A cancellation charge might be applicable depending upon how close to the booking date/ time was the booking cancelled and whether a Service Delivery Partner (or "Genie") has already been assigned to the booking. Upon trying to cancel, the HomeGenie Platform will show the applicable cancellation charges in case the User proceeds with the cancellation. Kindly refer to the section on cancellation policy at https://www.homegenie.com/en/pricing-policy/ for further information.</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={pricingModalVisible}
                animationIn='slideInLeft'
                animationInTiming={700}
                animationOut='slideOutLeft'
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
                                style={[css.flexDRR, css.marginT20, css.marginB20]}
                                onPress={() => setpricingModalVisible(!pricingModalVisible)}
                            >
                                <Image source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <View style={[css.flexDR, css.line10]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'priceverification.png')} />
                                <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Pricing Details</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.brandC, css.spaceB10]}>Inspection based services.</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB20,]}>Minimum inspection call-out charges* AED 129{"\n"} Additional charges as per bill estimate.{"\n"} *Inspection call-out charges apply to inspection based services only, and include travel cost plus 1 hour of labor required to diagnose the issue, perform minor repairs, if time permits or provide a detailed bill estimate for a major repair.</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f16, css.fm, css.blackC, css.spaceB10]}>NOTES</Text>
                                <Text style={[css.fm, css.blackC, css.spaceB5, css.f12]}>Additional charges apply for Emergency and Friday bookings, based on availability and permissions from community/ building, as confirmed by the Customer. VAT charges are not included and are based on the total invoice Amount.</Text>
                            </View>
                            <View style={[css.line20]}>
                                <Text style={[css.f18, css.fsb, css.ttC, css.blackC, css.spaceB10]}>Warranty</Text>
                                <View style={[css.flexDR]}>
                                    <View style={[width30]}><Image style={{ width: 100, height: 90 }} source={require(imgPath + 'warranty.png')} /></View>
                                    <View style={[css.flexDC, css.alignSelfC]}>
                                        <Text style={[css.greyC, css.fm]}>For more details, visit</Text>
                                        <Text style={[css.brandC, css.fsb]}>HomeGenie warranty policy</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={faqModalVisible}
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
                                style={[css.flexDR, css.marginT20, css.marginB20,]}
                                onPress={() => setfaqModalVisible(!faqModalVisible)}
                            >
                                <Image style={[css.transform180]} source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody,]}>
                            <View style={[css.flexDR, css.line20]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'help-icon-medium.png')} />
                                <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>FAQ</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff' }}>
                                <List.AccordionGroup>
                                    <List.Accordion title="1. Are prices of all the services fixed?" id="1" style={[css.whiteBG,]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.blackC]}>No. Only services which show Fixed Price Service have their prices fixed at the time of booking based on inputs selected by the customer. Other services like Inspection and Survey Based Service require estimates to be prepared to arrive at the price </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="2. What warranty is applicable to a service?" id="2" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.blackC]}>The Pricingsection of the Fixed Price Service provides information on the warranty applicable on the service. For Inspection and Survey Based services, warranty is defined in the estimate sent to the customer on email. Further more details, visit </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="3. Can I book an urgent service or for Friday?" id="3" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>Yes. For a number of services, there is a possibility to book an Emergency Service or Friday Service if selected as an input at the time of the booking. These services come with an additional charge calculated as a percentage of the standard charge.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="4. When will the payment be collected?" id="4" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>With HomeGenie, we collect payment only after completion of the service unless if the service requires a purchase of materials or parts in which case we will request for an advance payment from the customer. This can also be paid through the website or mobile app.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="5. How and who can I pay for the service?" id="5" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>Multiple methods like credit or debit card, cash or bank transfer are available for customers to pay for a service. Credit and debit cards payments are collected on the HomeGenie website or mobile app, however, cash payments are collected by the staff </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="6. What will happen once I confirm the booking?" id="6" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>Once you confirm your booking, a message will be sent to all qualified teams and the one team which accepts first will be assigned the service. Scheduled services are confirmed instantly, however, Emergency and Same Day Service require real-time search to confirm.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="7. How can I get an estimate for the job?" id="7" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>Following an inspection or survey for a service, a detailed estimate will be prepared by the team and sent to the customer via Email and also can be seen on the website and mobile app where the estimate can be approved or rejected, for further review.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="8. How can I get a VAT invoice for the job?" id="8" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>A VAT invoice, alongwith other documents like estimates for the service can be dowloaded from Bookings/Current Bookings/View Details page on the website or mobile app after logging into your account.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="9. After the booking who do I coordinate with?" id="9" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>Following an inspection or survey for a service, a detailed estimate will be prepared by the team and sent to the customer via Email and also can be seen on the website and mobile app where the estimate can be approved or rejected, for further review.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="10. How to raise a complaint about a service?" id="10" style={[css.whiteBG]} titleStyle={[css.fm, { color: expanded ? css.brandC : css.blackC }]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View>
                                                <Text style={[css.blackC]}>All complaints should be raised via call or WhatsApp HomeGenie Customer Experience team on  or Support/Add Complaint on the website or mobile app after logging into your account. </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                </List.AccordionGroup>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={ratingModal}
                animationIn='flipInX'
                animationInTiming={700}
                animationOut='flipOutX'
                animationOutTiming={700}
            >
                <View style={[css.centeredView, css.imgFull]}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader, { backgroundColor: '#fff' }]}>
                            <TouchableOpacity style={[css.flexDR, css.line10, { marginBottom: 0, }]} onPress={() => toggleratingModal()}>
                                <Image style={[css.alignSelfC, css.marginR20]} source={require(imgPath + 'backArrowBlack.png')} />
                                <Text style={[css.fbo, css.f18, css.blackC, css.alignSelfC]}>Why HomeGenie? </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={[css.modalNewBody, css.imgFull, , { paddingTop: 0 }]}>
                                <View style={[css.flexDR]}>
                                    <Image style={[css.marginR20, css.img50]} source={require(imgPathImage + 'acBooking.png')} />
                                    <Text style={[css.fbo, css.f24, css.blackC, css.alignSelfC,]}>AC Service (Preventive) </Text>
                                </View>
                                <View style={[css.marginT5]}>
                                    <View style={[css.flexDR]}>
                                        <Image style={[css.marginR10, css.alignSelfC]} source={require(imgPath + 'bullet_right.png')} />
                                        <Text style={[css.fr, css.f16, css.blackC,]}>Instant anytime booking</Text>
                                    </View>
                                    <View style={[css.flexDR]}>
                                        <Image style={[css.marginR10, css.alignSelfC]} source={require(imgPath + 'bullet_right.png')} />
                                        <Text style={[css.fr, css.f16, css.blackC,]}>Instant anytime booking</Text>
                                    </View>
                                    <View style={[css.flexDR]}>
                                        <Image style={[css.marginR10, css.alignSelfC]} source={require(imgPath + 'bullet_right.png')} />
                                        <Text style={[css.fr, css.f16, css.blackC,]}>Instant anytime booking</Text>
                                    </View>
                                    <View style={[css.flexDR]}>
                                        <Image style={[css.marginR10, css.alignSelfC]} source={require(imgPath + 'bullet_right.png')} />
                                        <Text style={[css.fr, css.f16, css.blackC,]}>Instant anytime booking</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[css.brandBG, css.padding20,]}>
                                <Image source={require(imgPath + 'live.png')} />
                                <Text style={[css.whiteC, css.feb, css.f20]}>SERVICE RATING</Text>
                                <View style={[css.flexDR]}>
                                    <View style={[css.width50]}>
                                        <View style={[css.flexDC]}>
                                            <View style={[css.flexDR]}>
                                                <Image source={require(imgPath + 'star-white.png')} />
                                                <Text style={[css.fm, css.f18, css.whiteC]}> 4.0/5</Text>
                                            </View>
                                            <View><Text style={[css.fm, css.f12, css.whiteC]}>Based on 661 Ratings</Text></View>
                                        </View>
                                    </View>
                                    <View style={[css.width50]}>
                                        <View style={[css.flexDC]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.fm, css.f18, css.whiteC]}> 824</Text>
                                            </View>
                                            <View><Text style={[css.fm, css.f12, css.whiteC]}>Booking lasr year</Text></View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[css.marginT10]}>
                                    <Text style={[css.f20, css.fbo, css.whiteC]}>CUSTOMER FEEDBACK</Text>
                                    <View style={[css.padding20, css.borderRadius10, { backgroundColor: '#258fc980', width: '100%' }]}>
                                        <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={2} showPagination style={[css.imgFull]}>
                                            <View style={[{ width: 350, justifyContent: 'center', alignItems: 'center' }]}>
                                                <View>
                                                    <Text style={[css.f18, css.fm, css.whiteC]}>Content Content Content Content Content Content Content Content Content Content Content Content</Text>
                                                    <Text style={[css.f12, css.fbo, css.whiteC, css.marginT20]}>Name</Text>
                                                    <Text style={[css.f12, css.fm, css.whiteC]}>jlt, Dubai</Text>
                                                </View>
                                            </View>
                                            <View style={[{ width: 350, justifyContent: 'center', alignItems: 'center' }]}>
                                                <View>
                                                    <Text style={[css.f18, css.fm, css.whiteC]}>Content Content Content Content Content Content Content Content Content Content Content Content</Text>
                                                    <Text style={[css.f12, css.fbo, css.whiteC, css.marginT20]}>Name</Text>
                                                    <Text style={[css.f12, css.fm, css.whiteC]}>jlt, Dubai</Text>
                                                </View>
                                            </View>
                                            <View style={[{ width: 350, justifyContent: 'center', alignItems: 'center' }]}>
                                                <View>
                                                    <Text style={[css.f18, css.fm, css.whiteC]}>Content Content Content Content Content Content Content Content Content Content Content Content</Text>
                                                    <Text style={[css.f12, css.fbo, css.whiteC, css.marginT20]}>Name</Text>
                                                    <Text style={[css.f12, css.fm, css.whiteC]}>jlt, Dubai</Text>
                                                </View>
                                            </View>
                                            <View style={[{ width: 350, justifyContent: 'center', alignItems: 'center' }]}>
                                                <View>
                                                    <Text style={[css.f18, css.fm, css.whiteC]}>Content Content Content Content Content Content Content Content Content Content Content Content</Text>
                                                    <Text style={[css.f12, css.fbo, css.whiteC, css.marginT20]}>Name</Text>
                                                    <Text style={[css.f12, css.fm, css.whiteC]}>jlt, Dubai</Text>
                                                </View>
                                            </View>
                                        </SwiperFlatList>
                                    </View>
                                </View>
                            </View>
                            <View style={[css.modalNewBody, css.imgFull]}>
                                <View style={[css.flexDR]}>
                                    <View style={[css.width30]}><Image style={{ resizeMode: 'contain', }} source={require(imgPath + 'warranty.png')} /></View>
                                    <View style={[css.marginL10, css.width70]}>
                                        <Text style={[css.fbo, css.blackC, css.f18]}>HomeGenie Happiness Warranty</Text>
                                        <Text style={[css.fm, css.blackC, css.f14]}>As provided in the bill estimate. {'\n'} For more details, visit </Text>
                                        <TouchableOpacity onPress={() => { Linking.openURL('https://www.homegenie.com/en/warranty') }}>
                                            <Text style={[css.brandC, css.fm, css.f14]}>HomeGenie warranty policy</Text>
                                        </TouchableOpacity>
                                        <Text style={[css.blackC, css.fm, css.f14]}>To know more about our COVID19 precautions, please visit,</Text>
                                        <TouchableOpacity onPress={() => { Linking.openURL('https://www.homegenie.com/en/warranty') }}>
                                            <Text style={[css.brandC, css.fm, css.f14]}>HomeGenie warranty policy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={totalPriceModal}
                animationIn='slideInUp'
                animationInTiming={700}
                animationOut='slideOutDown'
                animationOutTiming={700}
                //coverScreen={true}
                useNativeDriver={true}
                style={{ margin: 0, }}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => toggletotalPriceModal()}
            >
                <View style={[bookModal.modalViewFull, { height: 'auto', marginTop: 'auto', }]}>
                    <View style={[bookModal.modalHeader]}>
                        {/* <TouchableOpacity
                            style={[css.flexDRR, css.marginT20, css.marginB20]}
                            onPress={() => toggletotalPriceModal()}
                        >
                            <Image source={require(imgPath + 'backArrowBlack.png')} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={[bookModal.modalBody, css.marginB30]}>
                        <View style={[css.flexDR, css.line10]}>
                            <Text style={[css.f20, css.lGreyC, css.alignSelfC, css.fsb]}>Booking Summary</Text>
                        </View>
                        <View style={[css.flexDR]}>
                            <Image style={[css.img30, css.marginR10]} source={require(imgPathImage + 'acBooking.png')} />
                            <Text style={[css.f16, css.fbo, css.brandC]}>AC </Text><Text style={[css.f16, css.fm, css.brandC]}>| AC service (preventive)</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Type</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>Fixed price service</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Priority</Text>
                            <Text style={[css.f12, css.orangeC, css.fsb]}>Scheduled</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Reason for the service ?</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>Dirty air</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Number of units to service?</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>1</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Need external units serviced aswell ?</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>No</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Date</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>Sat Jan 29 2022</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Time</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>8AM - 10AM </Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Address</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>Villa 123, hor al anz, Dubai</Text>
                        </View>
                        <View style={[css.flexDRSB]}>
                            <Text style={[css.f12, css.grayC, css.fsb]}>Type</Text>
                            <Text style={[css.f12, css.blackC, css.fsb]}>Fixed price service</Text>
                        </View>
                        <View style={[css.line10]}></View>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={promocodeModal}
                animationIn='slideInUp'
                animationInTiming={700}
                animationOut='slideOutDown'
                animationOutTiming={700}
                //coverScreen={true}
                useNativeDriver={true}
                style={{ margin: 0, }}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => togglepromocodeModal()}
            >
                <View style={[bookModal.modalViewFull, { height: 'auto', marginTop: 'auto', }]}>
                    <View style={[bookModal.modalHeader]}>
                        {/* <TouchableOpacity
                            style={[css.flexDRR, css.marginT20, css.marginB20]}
                            onPress={() => togglepromocodeModal()}
                        >
                            <Image source={require(imgPath + 'backArrowBlack.png')} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={[bookModal.modalBody, css.marginB30]}>
                        <View style={[css.flexDRSB,]}>
                            <View style={[css.width70]}>
                                <TextInput
                                    style={[, { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, width: '95%', height: 42, paddingLeft: 10, paddingRight: 10 }]}
                                    placeholder="Add Promo Code"
                                />
                            </View>
                            <View style={[css.width30]}>
                                <TouchableOpacity style={[, { borderRadius: 5, borderWidth: 2, borderColor: '#2eb0e4', height: 40, width: '100%', alignItems: 'center', justifyContent: 'center' }]}>
                                    <Text style={[css.f16, css.brandC, css.alignSelfC, css.fsb]}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[css.boxShadow, css.liteBlueBG, css.padding10, css.borderRadius10, css.marginT10]}>
                            <View style={[css.flexDRSB]}>
                                <View style={[css.flexDR]}>
                                    <View style={[css.alignSelfC]}><Image style={[css.img30, css.marginR5,]} source={require(imgPath + 'percenttags.png')} /></View>
                                    <View style={[css.flexDC]}>
                                        <Text style={[css.brandC, css.fbo, css.f16]}>Offers</Text>
                                        <Text style={[css.fr, css.f12, css.grayC]}>Select a PROMOCODE to apply</Text>
                                    </View>
                                </View>
                                <View style={[css.alignSelfC]}>
                                    <TouchableOpacity onPress={() => toggleofferlistModal()}>
                                        <Text style={[css.yellowC, css.fbo, css.f16, { textDecorationLine: 'underline' }]}>View Offers</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={offerlistModal}
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
                                onPress={() => setOfferlistModal()}
                            >
                                <Image style={[css.transform180, css.alignSelfC]} source={require(imgPath + 'backArrowBlack.png')} />
                                <Text style={[css.fr, css.f16, css, blackC, css.marginL10]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <View style={[css.flexDR, css.line10]}>
                                <Image style={[css.img30, css.marginR10]} source={require(imgPath + 'percenttags.png')} />
                                <Text style={[css.f24, css.lGreyC, css.alignSelfC, css.fsb]}>Offers</Text>
                            </View>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDC, css.width80]}>
                                    <Text style={[css.fsb, css.f16, css.blackC]}>25% OFF only First Time User</Text>
                                    <Text style={[css.fm, css.f14, css.blackC]}>25% OFF on your first booking</Text>
                                    <View style={[css.flexDR]}>
                                        <View style={[css.brandBG, css.alignCenter, { width: 70, height: 30, borderRadius: 5 }]}><Text style={[css.whiteC, css.f14, css.fbo,]}>HGSELF25</Text></View>
                                        <View style={[css.alignSelfC, css.marginL10]}><Text style={[css.brandC, css.fr, css.f14, { textDecorationLine: 'underline' }]}>+Terms & conditions</Text></View>
                                    </View>
                                </View>
                                <View style={[css.alignSelfC,]}><TouchableOpacity style={[css.alignCenter, css.borderRadius10, { borderColor: '#2eb0e4', borderWidth: 2, width: 70, height: 40, }]}><Text style={[css.brandC]}>APPLY</Text></TouchableOpacity></View>
                            </View>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDC, css.width80]}>
                                    <Text style={[css.fsb, css.f16, css.blackC]}>25% OFF only First Time User</Text>
                                    <Text style={[css.fm, css.f14, css.blackC]}>25% OFF on your first booking</Text>
                                    <View style={[css.flexDR]}>
                                        <View style={[css.brandBG, css.alignCenter, { width: 70, height: 30, borderRadius: 5 }]}><Text style={[css.whiteC, css.f14, css.fbo,]}>HGSELF25</Text></View>
                                        <View style={[css.alignSelfC, css.marginL10]}><Text style={[css.brandC, css.fr, css.f14, { textDecorationLine: 'underline' }]}>+Terms & conditions</Text></View>
                                    </View>
                                </View>
                                <View style={[css.alignSelfC,]}><TouchableOpacity style={[css.alignCenter, css.borderRadius10, { borderColor: '#2eb0e4', borderWidth: 2, width: 70, height: 40, }]}><Text style={[css.brandC]}>APPLY</Text></TouchableOpacity></View>
                            </View>
                            <View style={[css.flexDRSB, css.line]}>
                                <View style={[css.flexDC, css.width80]}>
                                    <Text style={[css.fsb, css.f16, css.blackC]}>25% OFF only First Time User</Text>
                                    <Text style={[css.fm, css.f14, css.blackC]}>25% OFF on your first booking</Text>
                                    <View style={[css.flexDR,]}>
                                        <View style={[css.fm]}>
                                            <View style={[css.brandBG, css.alignCenter, { width: 70, height: 30, borderRadius: 5 }]}><Text style={[css.whiteC, css.f14, css.fbo,]}>HGSELF25</Text></View>
                                        </View>
                                        <View style={[css.alignSelfC, css.marginL10, { width: '95%' }]}>
                                            <List.AccordionGroup>
                                                <List.Accordion
                                                    title="+Terms & conditions"
                                                    id="1"
                                                    titleStyle={[css.brandC, css.f14, css.fm, { textDecorationLine: 'underline', }]}
                                                    style={[, { backgroundColor: '#fff', padding: 0, }]}
                                                    right={props => (
                                                        <Text> </Text>
                                                    )}
                                                >
                                                    <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                                        <View style={[css.flexDR]}>
                                                            <Text>Home service is defined as either of the following:</Text>
                                                        </View>
                                                        <View style={[css.flexDR, css.marginL10]}>
                                                            <Text>{'\u2022'}{'  '}</Text>
                                                            <Text>a service related to a customer’s home e.g. AC, plumbing,  electrical, etc. or</Text>
                                                        </View>
                                                        <View style={[css.flexDR, css.marginL10]}>
                                                            <Text>{'\u2022'}{'  '}</Text>
                                                            <Text>a service delivered in the safety and comfort of a customers’ home which otherwise might have required customers to travel e.g.salon, pet grooming, etc.</Text>
                                                        </View>
                                                    </View>
                                                </List.Accordion>
                                            </List.AccordionGroup>
                                        </View>
                                    </View>
                                </View>
                                <View style={[css.alignSelfC,]}><TouchableOpacity style={[css.alignCenter, css.borderRadius10, { borderColor: '#2eb0e4', borderWidth: 2, width: 70, height: 40, }]}><Text style={[css.brandC]}>APPLY</Text></TouchableOpacity></View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View >
    );
}
const bookModal = StyleSheet.create({
    modalViewFull: {
        backgroundColor: "white",
        padding: 20,
        height: windowHeight,
    },
    modalHeader: { fontSize: 14, },

})
const styles = StyleSheet.create({
    activeText: {
        color: '#fff',
    },
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
    centeredViewFull: {
        //flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
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
    modalViewFull: {
        backgroundColor: "white",
        padding: 20,
        //borderRadius: 10,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: windowHeight,
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
    fixedContainer: { flex: 1, zIndex: 1 },
    fixedFooter: { position: 'absolute', bottom: 0, left: 0, right: 0 },
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
    }
})