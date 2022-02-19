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
    Pressable,
    Alert,
    FlatList,
    TouchableHighlight,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from "react-native";
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios'
import SocialMedia from "@components/socialMedia";
import Whatsapp800 from "@components/whtsApp";
import ModalComingSoon from "@components/ModalComingSoon";
import css from '@components/commonCss';
import Text from '@components/MyText';
import MapView from 'react-native-maps';
import StatusBarAll from "@components/StatusBar";
import { connect, useDispatch, useSelector } from "react-redux";
import { getLoggedInStatus, getUser, } from '../../reducers/authReducer';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SettingAddInfoScreen = ({ navigation, token }) => {
    //export default function SettingAddInfoScreen({ navigation, token }) {
    const [isLoading, setLoading] = useState(true);
    const [modalComingsoon, setModalComingsoon] = useState(false);
    const isLoggedIn = useSelector(getLoggedInStatus);
    const dispatch = useDispatch();
    const userData = useSelector(getUser);
    const [displayName, setDisplayName] = useState(userData ? userData.name : '')
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState(userData ? userData.phoneNumber : '')
    const [displayCountryCode, setDisplayCountryCode] = useState(userData ? userData.countryCode : '')
    const [displayEmail, setDisplayEmail] = useState(userData ? userData.email : '')
    const [displayDOB, setDisplayDOB] = useState(userData ? userData.dob : null)
    const [displayLanguage, setDisplayLanguage] = useState(userData ? userData.language : '')
    const [displayNationality, setDisplayNationality] = useState(userData ? userData.nationality : '')
    const [displayProfilePic, setDisplayProfilePic] = useState(userData ? userData.profilePicURL : '')

    console.log('userDatasInfo', userData);

    const changeProfilePic = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });
        console.log('imageChange', result);
        if (!result.cancelled) {
            setDisplayProfilePic(result.uri);
        }
    };
    const [date, setDate] = useState(new Date(displayDOB));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };
    const updateUserData = async () => {
        console.log('working');
        console.log('getLoggedInStatus', isLoggedIn);
        console.log('userToken', token);
        if (isLoggedIn) {
            console.log('user loggedin');
            console.log(displayName);
            console.log(displayPhoneNumber);
            console.log(displayCountryCode);
            console.log(displayEmail);
            console.log(date);
            console.log(displayLanguage);
            console.log(displayNationality);
            console.log(displayProfilePic);
            try {
                const header = { headers: { Authorization: `Bearer ${token}` } };
                const api = 'https://api.homegenie.com/api/customer/updateProfile'
                const userDataUpdate = new FormData();
                userDataUpdate.append('profilePic', displayProfilePic)
                userDataUpdate.append('name', displayName)
                //userDataUpdate.append('email', displayEmail)
                userDataUpdate.append('countryCode', displayCountryCode)
                userDataUpdate.append('phoneNo', displayPhoneNumber)
                userDataUpdate.append('language', displayLanguage)
                userDataUpdate.append('dob', date)
                userDataUpdate.append('nationality', displayNationality)
                //userDataUpdate.Auth = token;
                //userDataUpdate._method = "PUT";
                // const response = await fetch(api, {
                //     method: 'PUT',
                //     headers: new Headers({
                //         'Authorization': `Bearer ${token}`,
                //     }),
                //     body: userDataUpdate
                // });
                const response = await axios.put(api, userDataUpdate, header);
                const jsonData = await response.json();
                console.log('response Data', response);
                let array = jsonData.data;
                console.log('userupdate api response', array);
                //setJobdetailsData(array);
            } catch (error) {
                console.error(error);
                alert('User details not updated')
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
    }, []);

    return (
        <SafeAreaView>
            <StatusBarAll />
            <View style={css.header}>
                <View style={css.flexDR}>
                    <TouchableOpacity
                        style={[css.whiteC, css.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={require("@assets/icons/backArrow.png")} />
                    </TouchableOpacity>
                    <View style={[css.flexDR_ALC]}>
                        <Image style={[styles.titleIcon]} source={require("@assets/icons/iconIndexWhite.png")} />
                        <Text style={[css.headerTitle, css.marginL10, css.f24,]}>BASIC INFO</Text>
                    </View>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <View style={[css.section]}>
                            <View style={[css.container]}>
                                <View style={[css.boxShadow, css.padding20]}>
                                    <View style={[css.alignCenter]}>
                                        <Pressable
                                            style={{ width: 70, height: 70, borderRadius: 50, marginBottom: 5 }}
                                            onPress={changeProfilePic}
                                        >
                                            {displayProfilePic ? <Image style={{ borderRadius: 50, width: 70, height: 70 }} source={{ uri: displayProfilePic }} />
                                                : <Image style={{ borderRadius: 50, }} source={require('@assets/icons/genieicon.png')} />
                                            }
                                        </Pressable>
                                        <View><Text style={[css.blackC, css.fm, css.f14]}>Profile Photo</Text></View>
                                    </View>
                                    <View style={[css.marginT10, css.line10]}>
                                        <View><Text style={[css.blackC, css.fm, css.f24]}>UPDATE / COMPLETE BASIC INFO</Text></View>
                                    </View>
                                    <View style={[css.marginB5]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Name"
                                            value={displayName ? displayName : ''}
                                            onChangeText={setDisplayName}
                                        />
                                        <Image style={{ position: 'absolute', right: 15, top: 15 }} source={require('@assets/icons/basicInfo_user.png')} />
                                    </View>
                                    <View style={[css.marginB5]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Date of Birth"
                                            value={date ?
                                                moment(new Date(date)).format("DD/MM/YYYY")
                                                : ''
                                            }
                                            onFocus={showDatepicker}
                                            onDateChange={(date) => { setDate({ date: date }) }}
                                        />
                                        {show && (
                                            <DateTimePicker
                                                style={[form.input,]}
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                is24Hour={false}
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                        <Image style={{ position: 'absolute', right: 15, top: 15 }} source={require('@assets/icons/basicInfo_calendar.png')} />
                                    </View>
                                    <View style={[css.marginB5]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Mobile Number"
                                            value={displayPhoneNumber ? (displayCountryCode + displayPhoneNumber) : ''}
                                            editable={false}
                                        />
                                        <Image style={{ position: 'absolute', right: 15, top: 15 }} source={require('@assets/icons/basicInfo_mobile.png')} />
                                    </View>
                                    <View style={[css.marginB5]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Email"
                                            value={displayEmail ? displayEmail : ''}
                                            editable={false}
                                        />
                                        <Image style={{ position: 'absolute', right: 15, top: 15 }} source={require('@assets/icons/basicInfo_mail.png')} />
                                    </View>
                                    <View style={[css.marginB5]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Language"
                                            value={displayLanguage ? displayLanguage : ''}
                                            onChangeText={setDisplayLanguage}
                                        />
                                        <Image style={{ position: 'absolute', right: 15, top: 15 }} source={require('@assets/icons/basicInfo_comment.png')} />
                                    </View>
                                    <View style={[css.marginB5]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Nationality"
                                            value={displayNationality ? displayNationality : ''}
                                            onChangeText={setDisplayNationality}
                                        />
                                        <Image style={{ position: 'absolute', right: 15, top: 15 }} source={require('@assets/icons/basicInfo_flag.png')} />
                                    </View>
                                </View>
                                <Pressable
                                    onPress={updateUserData}
                                    style={[css.boxShadow, css.yellowBtn, css.imgFull, css.alignItemsC, css.justifyContentC, { backgroundColor: "#4bdede", height: 50, }]}
                                >
                                    <Text style={[css.whiteC, css.fsb, css.f24]}>UPDATE </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
const bookModal = StyleSheet.create({
    modalViewFull: {
        backgroundColor: "white",
        //padding: 20,
        height: windowHeight,
    },
    modalHeader: { fontSize: 14, fontFamily: 'PoppinsR', backgroundColor: '#eff7fc', padding: 20, },
    modalBody: { fontSize: 14, fontFamily: 'PoppinsR', padding: 20 },
})
const form = StyleSheet.create({
    input: { borderRadius: 10, borderWidth: 1, borderColor: '#ccc', height: 50, width: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 12, fontFamily: 'PoppinsR', color: '#525252' },
})
const styles = StyleSheet.create({
    titleIcon: { width: 25, height: 25 },
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
    rbWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    rbtextStyle: {
        fontSize: 24,
        color: '#525252',
        fontFamily: 'PoppinsBO',
        marginLeft: 5,
        justifyContent: 'flex-end',
    },
    rbStyle: {
        height: 35,
        width: 35,
        borderRadius: 110,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        width: 15,
        height: 15,
        borderRadius: 55,
        backgroundColor: '#2eb0e4',
    },
});

export default connect(
    state => ({
        token: state.auth.token
    }),
    null
)(SettingAddInfoScreen);