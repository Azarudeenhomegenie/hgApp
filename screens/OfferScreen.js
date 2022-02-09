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
    TextInput,
    Dimensions,
} from "react-native";
import moment from 'moment';
import 'moment-timezone';
import { WebView } from 'react-native-webview';
import SocialMedia from "../components/socialMedia";
import Text from "../components/MyText";
import Modal from 'react-native-modal';
import Whatsapp800 from "../components/whtsApp";
import StatusBarAll from "../components/StatusBar";
import css, { marginT20 } from "../components/commonCss";
import Clipboard from '@react-native-clipboard/clipboard';
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OfferScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTermsandCondition, setModalTermsandCondition] = useState(false);
    const [offerData, setOfferData] = useState([]);
    const [termsData, setTermsData] = useState([]);
    const [termHtml, setTermHtml] = useState([]);

    const getOffers = async () => {
        try {
            const response = await fetch('https://api.homegenie.com/api/Webapi/offers?city=Dubai&language=en');
            const json = await response.json();
            let datas = json.data.data;
            let array = [];
            for (obj of datas) {
                var d = new Date(obj.promo.endTime);
                var dm = moment(d).format("DD MMM,  YY");
                array.push({
                    _id: obj._id,
                    validDate: dm,
                    name: obj.name,
                    image: obj.image,
                    promoName: obj.promo.name,
                    trending: obj.trending,
                    soldCount: obj.soldCount,
                    categoryName: obj.categoryName,
                    //termsCondition: obj.tnc
                })
            }
            setOfferData(array);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const getTermsandCondition = async (id) => {
        //console.log('id', id);
        try {
            const response = await fetch('https://api.homegenie.com/api/Webapi/offers?city=Dubai&language=en');
            const json = await response.json();
            let datas = json.data.data;
            datas = datas.filter(x => x._id === id);
            //console.log('idCheck', datas);
            let termArray = [];
            for (obj of datas) {
                termArray.push({
                    termsCondition: obj.tnc
                })
            }
            //termArray = termArray[0].termsCondition;
            setTermsData(termArray);
            //console.log('terms', termArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getOffers();
        //getTermsandCondition();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f5f8" }}>
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
                    <Text style={css.headerTitle}>OFFERS</Text>
                </View>
            </View>
            {isLoading ?
                <View style={{ height: windowHeight - 200 }}>
                    <View style={[css.alignItemsC, css.justifyContentC, { flex: 1, }]}>
                        <Image style={[css.img100]} source={require(imgPath + 'animateIcons/animateSpin.gif')} />
                    </View>
                </View> :
                <ScrollView>
                    <View style={[styles.screen]}>
                        <View style={[styles.section]}>
                            <View style={[css.boxShadow, css.borderRadius10, { backgroundColor: '#fff', padding: 20 }]}>
                                <Text style={[css.fr, css.f12, css.blackC]}>Current Offer you should not miss!</Text>
                                <FlatList
                                    data={offerData}
                                    keyExtractor={(item, index) => {
                                        return item._id;
                                    }}
                                    renderItem={({ item }) => (
                                        <View style={[styles.offerBoxEach], { borderBottomWidth: 1, borderColor: '#ccc', marginTop: 15 }}>
                                            <Image
                                                resizeMode="contain"
                                                style={[styles.OfferImage], { height: 175, borderRadius: 10, marginBottom: 10 }}
                                                source={{
                                                    uri: item.image,
                                                }}
                                            />
                                            <View style={{ position: 'absolute', top: 0, left: 15, width: 130, height: 25, backgroundColor: '#f6b700', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: '#fff', fontSize: 10, fontFamily: "PoppinsR" }}>{item.soldCount} claimed already! </Text>
                                            </View>
                                            {item.trending ? <Image
                                                style={{ top: -15, right: -10, position: 'absolute', }}
                                                source={require(imgPath + "trending.png")}
                                            /> : null}
                                            <Pressable onPress={() => { getTermsandCondition(item._id); setModalTermsandCondition(true) }}>
                                                <Text style={{ color: '#2eb0e4' }}>* Terms & Conditions</Text>
                                            </Pressable>
                                            <Text style={[css.f24, css.fbo, css.brandC]}>{item.name}</Text>
                                            <Text style={[css.f14, css.brandC, css.fbo]}>{item.promoName}</Text>
                                            <Text style={[css.f12, css.fr, css.blackC]}>{item.name}</Text>
                                            <Text style={[css.f12, css.fr, css.blackC]}>Valid till date {item.validDate}</Text>
                                            <View style={[css.flexDRSB, css.marginB20, css.marginT20]}>
                                                <TouchableOpacity
                                                    style={[styles.offerCopyCode, { height: 35 }]}
                                                    onPress={() => setModalVisible(true)}
                                                >
                                                    <Text style={[css.brandC, css.f14, css.fm]}>Copy Code</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[css.yellowBtn, css.borderRadius30, { height: 35, width: '35%' }]} onPress={() => navigation.navigate('GetgeniePage')}>
                                                    <Text style={[css.fm, css.whiteC, css.f14]}> Book Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                        <Pressable style={[styles.section]} onPress={() => navigation.navigate('ReferEarnPage')}>
                            <View style={[styles.referEarnSection, css.flexDR]}>
                                <Image source={require(imgPath + "speaker.png")} />
                                <Text style={[css.brandC, css.alignSelfC, css.f18, css.fm, css.marginL10]}> Refer and Earn </Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView >
            }
            <Modal
                isVisible={modalVisible}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
            // coverScreen={true}
            // useNativeDriver={true}
            // useNativeDriver={true}
            // hideModalContentWhileAnimating={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}><Text style={[css.modalNewText, css.f18, css.fm,]}>Promo code copied!</Text></View>
                        <View style={[css.modalNewBody, css.alignCenter,]}>
                            <TouchableOpacity
                                style={[css.yellowBG, css.borderRadius10, css.alignCenter, css.width50, { height: 40 }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View style={[css.alignCenter, { height: 50 }]}><Text style={[css.whiteC, css.fm, css.f18,]}>Continue</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={modalTermsandCondition}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
            // coverScreen={true}
            // useNativeDriver={true}
            // useNativeDriver={true}
            // hideModalContentWhileAnimating={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}>
                            <TouchableOpacity
                                style={[css.flexDR,]}
                                onPress={() => setModalTermsandCondition(!modalTermsandCondition)}
                            >
                                <Image source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                            <FlatList
                                data={termsData}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text>{item.termsCondition}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    screen: {
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
    brand: {
        color: '#2eb0e4'
    },
    offerCopyCode: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#2eb0e4',
        borderWidth: 1,
        width: '35%',
    },
    offerCopyCodeText: {
        letterSpacing: 0.25,
        color: '#2eb0e4',
    },
    offerBooknow: {
        alignItems: 'center',
        justifyContent: 'center',
        //paddingVertical: 10,
        //paddingHorizontal: 5,
        borderRadius: 50,
        backgroundColor: '#f6b700',
        borderColor: '#f6b700',
        borderWidth: 1,
        width: '40%',
    },
    offerBooknowText: {
        fontSize: 12,
        lineHeight: 12,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
    //ModalCss
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
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
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});