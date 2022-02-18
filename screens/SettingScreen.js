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
    Pressable,
    Alert,
    FlatList,
    Dimensions,
} from "react-native";
import Modal from 'react-native-modal';
import Text from "../components/MyText";
import SocialMedia from "../components/socialMedia";
import Whatsapp800 from "../components/whtsApp";
import ModalComingSoon from "../components/ModalComingSoon";
import css from '../components/commonCss';
import StatusBarAll from "../components/StatusBar";
import { connect, useDispatch, useSelector } from "react-redux";
import { getUser } from '../reducers/authReducer';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = "../assets/icons/";
let imgPathImages = "../assets/icons/images/"

let card = 'no'
let address = 'no'
export default function SettingScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [modalComingsoon, setModalComingsoon] = useState(false);
    const userData = useSelector(getUser);
    const [customerAddresses, setCustomerAddresses] = useState(userData ? userData.customerAddresses : '')
    const [displayName, setDisplayName] = useState(userData ? userData.name : '')
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState(userData ? userData.phoneNumber : '')
    const [displayCountryCode, setDisplayCountryCode] = useState(userData ? userData.countryCode : '')
    const [displayEmail, setDisplayEmail] = useState(userData ? userData.email : '')
    const [displayDOB, setDisplayDOB] = useState(userData ? userData.dob : '')
    const [displayLanguage, setDisplayLanguage] = useState(userData ? userData.language : '')
    const [displayNationality, setDisplayNationality] = useState(userData ? userData.nationality : '')
    const [useraddressType, setuseraddressType] = useState(userData ? userData.addressType : '')
    const [userapartmentNo, setuserapartmentNo] = useState(userData ? userData.apartmentNo : '')
    const [usercity, setusercity] = useState(userData ? userData.city : '')
    const [usercommunity, setusercommunity] = useState(userData ? userData.community : '')
    const [usernickName, setusernickName] = useState(userData ? userData.nickName : '')
    const [userdefaultCards, setuserdefaultCards] = useState(userData ? userData.defaultCards : '')


    console.log('userDatas', userData);
    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={[css.whiteBG], { flex: 1, backgroundColor: "#fff" }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={css.flexDR}>
                    <TouchableOpacity
                        style={[css.whiteC, css.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={require(imgPath + "backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle]}>SETTINGS</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[css.section]}>
                    <View style={[css.container]}>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require(imgPath + "iconIndex.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16, css.fm, css.blackC]}>BASIC INFO</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('SettingAddInfoPage')}>
                                    <Image
                                        source={require(imgPath + "iconEdit.png")}
                                        style={[styles.editIcon]}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[css.flexDR, css.spaceB5]}>
                                <Text style={[styles.settingShadowBoxText, css.width30, { color: '#60604E' }]}>Name</Text>
                                <Text style={[styles.settingShadowBoxText, css.fm, css.width70]}>{displayName ? displayName : ''}</Text>
                            </View>
                            <View style={[css.flexDR, css.spaceB5]}>
                                <Text style={[styles.settingShadowBoxText, css.width30, { color: '#60604E' }]}>Mobile</Text>
                                <Text style={[styles.settingShadowBoxText, css.fm, css.f14, css.width70]}>{displayCountryCode && displayPhoneNumber ? (displayCountryCode + ' ' + displayPhoneNumber) : ''}</Text>
                            </View>
                            <View style={[css.flexDR]}>
                                <Text style={[styles.settingShadowBoxText, css.width30, { color: '#60604E' }]}>Email ID</Text>
                                <Text style={[styles.settingShadowBoxText, css.fm, css.f14, css.width70]}>{displayEmail ? displayEmail : ''}</Text>
                            </View>
                        </View>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require(imgPath + "iconLocation.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16, css.fm, css.blackC]}>ADDRESS</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('SettingAddAddressPage')}>
                                    <Image
                                        source={require(imgPath + "iconEdit.png")}
                                        style={[styles.editIcon]}
                                    />
                                </TouchableOpacity>
                            </View>
                            {customerAddresses ?
                                <View>
                                    <Text style={[css.lGreyC, css.f14, css.feb]}>{customerAddresses.nickName}</Text>
                                    <Text style={[css.blackC, css.f14, css.fr]}>{customerAddresses.apartmentNo}, {customerAddresses.addressType}, {customerAddresses.community}, {customerAddresses.city} </Text>
                                </View>
                                :
                                <View>
                                    <Text style={[css.blackC, css.f14, css.fr]}>No saved Address</Text>
                                </View>
                            }
                        </View>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require(imgPath + "iconCard.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16, css.fm, css.blackC]}>CARDS</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate('SettingAddCardPage')}>
                                        <Image
                                            source={require(imgPath + "iconEdit.png")}
                                            style={[styles.editIcon]}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={[css.lGreyC, css.f14, css.fr]}>{userdefaultCards ? userdefaultCards : 'No saved Cards'}</Text>
                            </View>
                        </View>
                        <View style={[styles.settingShadowBox]}>
                            <View style={[css.flexDRSB, css.line10]}>
                                <View style={[css.flexDR_ALC]}>
                                    <Image
                                        source={require(imgPath + "iconFav.png")}
                                        style={[styles.titleIcon]}
                                    />
                                    <Text style={[css.marginL10, css.f16, css.fm, css.blackC]}>FAVOURITES</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => setModalComingsoon(true)}>
                                        <Image
                                            source={require(imgPath + "iconEdit.png")}
                                            style={[styles.editIcon]}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={[css.lGreyC, css.f14], { color: '#60604E' }}>0 Favourite Genie</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
            {modalComingsoon ? <ModalComingSoon title={true} /> : null}
            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Coming soon - stay tuned</Text>
                        <TouchableOpacity
                            style={[css.yellowBtn]}
                            onPress={() => setModalComingsoon(false)}
                        >
                            <Text style={[css.whiteC, css.f16]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    settingShadowBoxText: { fontSize: 14, fontFamily: 'PoppinsR', color: '#525252' },
    settingShadowBox: {
        backgroundColor: "white",
        borderRadius: 5,
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.24,
        shadowRadius: 6.27,
        elevation: 10,
        padding: 20,
        marginBottom: 20
    },
    titleIcon: { width: 20, height: 20 },
    editIcon: { width: 20, height: 20 },
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
});