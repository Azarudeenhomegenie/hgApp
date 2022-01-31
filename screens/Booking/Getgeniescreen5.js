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
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import GetgenieHeader from './GetgenieHeader';
import GetgenieFooter from './GetgenieFooter';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native-modal';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import StatusBarAll from "../../components/StatusBar";
import css from '../../components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';
export default function Getgeniescreen5(props) {
    const [textareaValue, setTextareaValue] = useState(null);
    const [modalComingsoon, setModalComingsoon] = useState(false);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        if (!_image.cancelled) {
            setImage(_image.uri);
            //setImageName(_image.filename);
        }
    };
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
                        <View style={[styles.screen4box]}>
                            <View style={[css.flexDR]}><Text style={{ fontSize: 18, fontFamily: 'PoppinsSB', color: '#2eb0e4' }}>Add additional information </Text><Text style={{ fontSize: 18, fontFamily: 'PoppinsSB', color: '#525252' }}>(optional)</Text></View>
                            <View style={[css.spaceT5]}>
                                <View>
                                    <Text style={[css.lGreyC]}>Tell us in short what is the exact issue you are facing.</Text>
                                    <Text style={[css.spaceT5, css.blackC, css.f16]}>Upload images</Text>
                                    <View>
                                        <TouchableOpacity onPress={addImage} style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginTop: 10 }}>
                                            <Image style={{ width: 20, height: 20 }} source={require(imgPath + 'icon_camera_placeholder.png')} />
                                            <Text style={[css.lGreyC, css.f18]}>| Browse</Text>
                                        </TouchableOpacity>
                                        <View style={[css.flexDRR, css.line10]}><Text style={[css.blackC, css.f16, css.fm, css.spaceT10,]}>Total Size: 30KB</Text></View>
                                        {
                                            image &&
                                            <View style={[css.flexDR, css.line10]}>
                                                <View style={[css.width40]}>
                                                    <Image source={{ uri: image }} style={{ width: 100, height: 80 }} />
                                                </View>
                                                <View style={[css.width30, css.alignSelfC]}>
                                                    <Text style={[css.blackC, css.f16]}>acBooking.png {imageName}</Text>
                                                    <Text style={[css.f12, css.greyC]}>size: 30KB</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => setImage(false)} style={{ flexDirection: 'row', position: 'absolute', bottom: 5, right: 0 }}>
                                                    <FontAwesomeIcon style={[css.cMaroon, css.marginR5,]} icon={faTimesCircle} />
                                                    <Text style={[css.cMaroon,]}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }

                                    </View>
                                    <View>
                                        <Text style={[css.spaceT5, css.blackC, css.f16]}>Write instructions if any to be followed *</Text>
                                        <View
                                            style={{
                                                backgroundColor: '#fff',
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                marginTop: 5,
                                                padding: 5,
                                                minHeight: 80,
                                            }}>
                                            <TextInput
                                                {...props}
                                                editable
                                                maxLength={40}
                                                multiline
                                                numberOfLines={4}
                                                onChangeText={text => setTextareaValue(text)}
                                                value={textareaValue}
                                                placeholder="Enter your instruction here."
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[css.flexDR, css.spaceT20,]}>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require(imgPath + 'expert-professionals-icon.png')} />
                                <Text style={[css.brandC, css.alignSelfC]} onPress={togglescopeModal}>Scope Details</Text>
                            </View>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require(imgPath + 'service-info.png')} />
                                <Text style={[css.brandC, css.alignSelfC]}>Terms of use</Text>
                            </View>
                        </View>
                        <View style={[css.flexDR, css.spaceT10, css.spaceB30]}>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require(imgPath + 'pricing-icon.png')} />
                                <Text style={[css.brandC, css.alignSelfC]}>Pricing Details</Text>
                            </View>
                            <View style={[css.flexDR, css.width50]}>
                                <Image source={require(imgPath + 'help-icon.png')} />
                                <Text style={[css.brandC, css.alignSelfC]}>FAQ</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[css.section, styles.fixedContainer,]}>
                    <View style={[css.container, css.whiteBG, styles.fixedHeader]}>
                        <View style={[css.flexDRSB]}>
                            <Pressable style={[css.flexDC]}><Text>Total</Text><Text>AED 190</Text></Pressable>
                            <TouchableOpacity style={{ backgroundColor: '#f6b700', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 27, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 1, width: '25%', }} onPress={() => { props.navigation.navigate("GetgeniePage4") }}><Text style={[styles.continueBtnText]}>NEXT</Text></TouchableOpacity>
                            <Pressable style={[css.flexDC]}><Image style={[css.img30]} source={require(imgPath + 'percenttags.png')} /><Text style={[css.brandC]}>Offer</Text></Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalComingsoon(!modalComingsoon);
                }}
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

const imageUploaderStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 200,
        width: 200,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    }
})