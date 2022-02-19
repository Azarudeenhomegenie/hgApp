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
    Pressable,
    Alert,
    FlatList,
    TouchableHighlight,
    Dimensions,
    TextInput,
} from "react-native";
import Modal from 'react-native-modal';
import { connect, useDispatch, useSelector } from "react-redux";
import { getAccessToken } from '../../reducers/authReducer';
import SocialMedia from "@components/socialMedia";
import Whatsapp800 from "@components/whtsApp";
import ModalComingSoon from "@components/ModalComingSoon";
import css from '@components/commonCss';
import StatusBarAll from "@components/StatusBar";
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SettingAddCardScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [modalComingsoon, setModalComingsoon] = useState(false);
    const [addcardModal, setAddcardModal] = useState(false);
    const toggleAddcreditModal = () => { setAddcardModal(!addcardModal) };
    const [removecardModal, setRemovecardModal] = useState(false);
    const toggleRemovecreditModal = () => { setRemovecardModal(!removecardModal) };

    const user = 'noCard';

    const token = useSelector(getAccessToken);
    const [allCardData, setAllCardData] = useState([])
    console.log('token', token);
    const getAllCard = async () => {
        try {
            const header = { headers: { Authorization: `Bearer ${token}` } };
            const api = 'https://api.homegenie.com/api/customer/getAllMyCard'

            const response = await fetch(api, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
                //body: userDataUpdate
            });
            const jsonData = await response.json();
            let array = jsonData.data.cards;
            console.log('usercard api response', array);
            setAllCardData(array);
        } catch (error) {
            console.error(error);
            alert('Login Required')
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllCard();
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
                        <Image style={[styles.titleIcon]} source={require("@assets/icons/iconCardWhite.png")} />
                        <Text style={[css.headerTitle, css.marginL10, css.f24,]}>ADD CARD</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                {user == 'noCar' ?
                    <View style={[css.section]}>
                        <View style={[css.container, { height: windowHeight - 100 }]}>
                            <View style={[css.flexDCSB, css.alignItemsC, { flex: 1 }]}>
                                <View><Text style={[css.f24, css.textCenter, css.blackC]}>ADD CARD</Text></View>
                                <View style={[css.imgBR150, css.whiteBG, css.alignCenter]}><Image style={[css.img100]} source={require('@assets/icons/iconAddCard.png')} /></View>
                                <TouchableOpacity style={[css.blueBtn, css.boxShadow, css.imgFull, { height: 50 }]} onPress={() => setAddcardModal(true)}>
                                    <Text style={[css.whiteC, css.f18, css.textCenter, css.fsb]}>+ ADD CARD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={[css.section]}>
                        <View style={[css.container,]}>
                            <View style={{ borderRadius: 5, borderColor: '#ccc', borderWidth: 1, padding: 10, backgroundColor: '#F2F4F8' }}>
                                <Text style={[css.f24, css.fm, css.marginT10, css.marginB10, css.blackC]}>ADD / REMOVE YOUR CARDS</Text>
                                <FlatList
                                    data={allCardData}
                                    keyExtractor={(item, index) => {
                                        return item._id;
                                    }}
                                    renderItem={({ item }) => (
                                        <View style={[css.whiteBG, css.borderGrey1, css.borderRadius5, css.marginB10]}>
                                            <Text style={[css.line5, css.brandC, css.f18, css.fm, css.padding20]}>Select card to pay with</Text>
                                            <View style={[css.flexDRSB, css.padding20]}>
                                                <View style={styles.rbWrapper}>
                                                    <TouchableOpacity style={styles.rbStyle}>
                                                        <View style={styles.selected} />
                                                    </TouchableOpacity>
                                                    <Text style={[styles.rbtextStyle,]}>{item.Digit ? item.Digit : ''}</Text>
                                                </View>
                                                <Pressable onPress={() => setRemovecardModal(true)}><Image source={require('@assets/icons/delete.png')} /></Pressable>
                                            </View>
                                        </View>
                                    )}
                                />

                            </View>
                            <View style={[css.flexDCSB, css.alignItemsC,]}>
                                <TouchableOpacity style={[css.blueBtn, css.boxShadow, css.imgFull, css.marginT20, { height: 50 }]} onPress={() => setAddcardModal(true)}>
                                    <Text style={[css.whiteC, css.f18, css.textCenter, css.fsb]}>+ ADD CARD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
            <Modal
                isVisible={addcardModal}
                animationIn='flipInX'
                animationInTiming={700}
                animationOut='flipOutX'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}>
                            <View><Text style={[css.modalNewText, { fontSize: 18, color: '#525252', lineHeight: 26, letterSpacing: 0.5 }]}>To <Text style={[css.brandC]}>ADD CARD</Text>, a security {"\n"} payment of AED 1.00 will be {"\n"} processed to ensure the card is {"\n"} verified.</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                            <View><Text style={[css.modalNewText, { fontSize: 18, color: '#525252', lineHeight: 26, letterSpacing: 0.5 }]}>Should we proceed?</Text></View>
                            <View style={[css.flexDRSE, css.imgFull]}>
                                <TouchableOpacity
                                    onPress={() => setAddcardModal(!addcardModal)}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, { backgroundColor: '#f4f4f4', width: '40%', height: 50, borderRadius: 10, }]}
                                >
                                    <Text style={[css.blackC, css.fsb, css.f18]}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setAddcardModal(!addcardModal)}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, { backgroundColor: '#f6b700', width: '40%', height: 50, borderRadius: 10, }]}
                                >
                                    <Text style={[css.whiteC, css.fsb, css.f18]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={removecardModal}
                animationIn='flipInX'
                animationInTiming={700}
                animationOut='flipOutX'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}>
                            <View><Text style={[css.modalNewText, { fontSize: 20, color: '#525252', lineHeight: 26, letterSpacing: 0.2, fontFamily: 'PoppinsM' }]}>Are you sure you want to delete the card?</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                            <View style={[css.flexDRSE, css.imgFull]}>
                                <TouchableOpacity
                                    onPress={() => setRemovecardModal(!removecardModal)}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, { backgroundColor: '#f4f4f4', width: '40%', height: 50, borderRadius: 10, }]}
                                >
                                    <Text style={[css.blackC, css.fsb, css.f18]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setRemovecardModal(!removecardModal)}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, { backgroundColor: '#f6b700', width: '40%', height: 50, borderRadius: 10, }]}
                                >
                                    <Text style={[css.whiteC, css.fsb, css.f18]}>Yes, I'm sure</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

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