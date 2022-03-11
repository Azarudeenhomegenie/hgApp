import React, { Component, useState, useEffect, useCallback } from "react";
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
    Dimensions,
} from "react-native";
import { Searchbar, List } from 'react-native-paper';
import StatusBarAll from "../../components/StatusBar";
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import css from '../../components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';
import { BASE_URL } from '../../base_file';

export default function GetgenieCategories({ props, navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [helpModal, setHelpModal] = useState(false);
    const toggleHelpModal = () => { setHelpModal(!helpModal) };
    const [genieCatNames, setGenieCatNames] = useState([]);
    const [genieSubcatNames, setGenieSubcatNames] = useState([]);
    const [genieSubcatData, setGenieSubcatData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const getGenieCategory = async (categoryNameCheck) => {
        try {
            const response = await fetch('https://api.homegenie.com/api/webapi/getCategorySubCategoryUrlsForSiteMap?city=Dubai&language=en');
            const json = await response.json();
            let datas = json.data;
            console.log('dataJSON', datas);
            console.log('categoryNameCheck', categoryNameCheck);
            if (categoryNameCheck == 'healthandwellness') {
                datas = datas.filter(x => x.category === 'healthandwellness');
            } else if (categoryNameCheck == 'lifestyledecor') {
                datas = datas.filter(x => x.category === 'lifestyledecor');
            } else if (categoryNameCheck == 'others') {
                datas = datas.filter(x => x.category === 'others');
            } else if (categoryNameCheck == undefined || categoryNameCheck == 'dailyutilities') {
                datas = datas.filter(x => x.category === 'dailyutilities');
                console.log('datass', datas);
            }
            let catNames = [];
            let subCatNames = [];
            let subCatData = [];
            for (obj of datas) {
                catNames.push({
                    _id: obj._id,
                    catName: obj.categoryName,
                    category: obj.category
                })
                for (obj2 of obj.categoryIds) {
                    subCatNames.push({
                        cid: obj2._id,
                        image: obj2.imageURL.thumbnail,
                        name: obj2.name,
                    })
                    for (obj3 of obj2.subcategories) {
                        subCatData.push({
                            did: obj3._id,
                            image: obj3.image,
                            name: obj3.subCategoryName,
                        })
                    }
                }
            }
            setGenieSubcatNames(subCatNames);
            setGenieSubcatData(subCatData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    // useEffect(() => {
    //     getGenieCategory();
    // }, []);
    useFocusEffect(
        useCallback(() => {
            getGenieCategory();
        }, [])
    );
    return (
        <View>
            <View style={[css.section]}>
                <View style={[css.container, css.liteBlueBG, { height: 130 }]}>
                    <View style={[css.flexDRSB]}>
                        <View style={[css.flexDRSB, css.img90]}>
                            <TouchableOpacity style={[styles.categoryBtn, styles.activeBtn]} onPress={() => getGenieCategory('dailyutilities')}><Text style={[styles.categoryBtnText, styles.activeText]}>Daily Utilities</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.categoryBtn]}><Text style={[styles.categoryBtnText]} onPress={() => getGenieCategory('lifestyledecor')}>Lifestyle & Decor</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.categoryBtn]}><Text style={[styles.categoryBtnText]} onPress={() => getGenieCategory('healthandwellness')}>Health & Wellness</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.categoryBtn]}><Text style={[styles.categoryBtnText]} onPress={() => getGenieCategory('others')}>Others</Text></TouchableOpacity>
                        </View>
                        <View style={[css.justifyContentC]}>
                            <Image style={[css.img20]} source={require(imgPath + 'login-icon.png')} />
                        </View>
                    </View>
                    <View style={[css.flexDRSB, css.spaceT10]}>
                        <Searchbar
                            placeholder="Search Services"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            IconSource
                            style={[css.width80, css.height40, css.borderRadius50, css.fm, css.grayC, css.f12, { elevation: 0 }]}
                        />
                        <TouchableOpacity
                            style={[css.whiteC, css.backButton]}
                            onPress={() => navigation.goBack()}
                        >
                            <Image style={[css.img15]} source={require(imgPath + 'close.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[css.flexDR, { height: windowHeight - 130, }]}>
                    <View style={{ backgroundColor: '#eff7fc', width: '30%', zIndex: 1 }}>
                        <FlatList
                            data={genieSubcatNames}
                            keyExtractor={(item, index) => {
                                return item.cid;
                            }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => setCategoryShow(!categoryShow) && setCategoryScreen5(true)} style={[css.BGwhite, css.flexDR, css.padding5, css.paddingT10, css.paddingB10, { borderBottomColor: '#d1d1d150', borderBottomWidth: 1 }]}>
                                    <Image style={[css.img20, css.marginR5, { width: 20, height: 20, marginRight: 5 }]} source={{ uri: item.image, }} />
                                    <Text style={[css.f11, css.fr, css.blackC]}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <ScrollView>
                        <View style={[css.padding10, { backgroundColor: '#fafafa' }]}>
                            <Text style={[styles.categoryTite, css.fbo, css.f18, css.blackC]}>AC Title</Text>
                            <View style={[css.flexDR, css.justifyContentFS, css.marginT10, css.flexWrapW, css.imgFull, { marginBottom: 30 }]}>
                                {isLoading ?
                                    <Image style={[css.img50]} source={require(imgPath + 'animateIcons/animateSpin.gif')} />
                                    :
                                    <FlatList
                                        numColumns={2}
                                        //columnWrapperStyle={{ flex: 1 / 2, justifyContent: 'flex-start' }}
                                        data={genieSubcatData}
                                        keyExtractor={(item, index) => {
                                            return item.did;
                                        }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={{ marginBottom: 15, width: 100, marginRight: 20 }} onPress={() => props.navigation.navigate("GetgeniePage1")}>
                                                <Image style={{ width: 110, height: 60, borderRadius: 10, marginBottom: 5 }} source={{ uri: item.image }} />
                                                <Text style={[css.fr, css.f11]}>{item.name > item.name.substring(0, 30) ? item.name.substring(0, 30) + '...' : item.name}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[css.whiteBG, css.imgFull, css.padding10, { position: 'absolute', bottom: 0, borderTopColor: '#bababa', borderTopWidth: 1 }]}>
                        <TouchableOpacity style={[css.flexDRR]} onPress={toggleHelpModal}>
                            <Text style={[css.brandC, css.marginL5, css.f14, css.fr]}>Help</Text>
                            <Image style={[css.img20]} source={require(imgPath + 'service-info.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                isVisible={helpModal}
                animationIn='slideInRight'
                animationInTiming={700}
                animationOut='slideOutRight'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                style={{ margin: 0, }}
                hideModalContentWhileAnimating={true}
            >
                <ScrollView>
                    <View style={bookModal.modalViewFull}>
                        <View style={[bookModal.modalHeader]}>
                            <TouchableOpacity
                                style={[css.flexDR, css.marginT20,]}
                                onPress={() => setHelpModal(!helpModal)}
                            >
                                <Image style={[css.transform180]} source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                            <View style={[css.flexDR, css.alignCenter, css.marginB20]}>
                                <Image style={[css.img30, { resizeMode: 'contain' }]} source={require(imgPath + 'help-icon-medium.png')} />
                                <Text style={[css.f20, css.fm, css.blackC, css.paddingL10]}>HELP</Text>
                            </View>
                        </View>
                        <View style={[bookModal.modalBody]}>
                            <ScrollView>
                                <List.AccordionGroup>
                                    <List.Accordion title="1. Are prices of all the services fixed?" id="1" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>No. Only services which show Fixed Price Service have their prices fixed at the time of booking based on inputs selected by the customer. Other services like Inspection and Survey Based Service require estimates to be prepared to arrive at the price </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="2. What warranty is applicable to a service?" id="2" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>The Pricingsection of the Fixed Price Service provides information on the warranty applicable on the service. For Inspection and Survey Based services, warranty is defined in the estimate sent to the customer on email. Further more details, visit </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="3. Can I book an urgent service or for Friday?" id="3" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>Yes. For a number of services, there is a possibility to book an Emergency Service or Friday Service if selected as an input at the time of the booking. These services come with an additional charge calculated as a percentage of the standard charge.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="4. When will the payment be collected?" id="4" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>With HomeGenie, we collect payment only after completion of the service unless if the service requires a purchase of materials or parts in which case we will request for an advance payment from the customer. This can also be paid through the website or mobile app.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="5. How and who can I pay for the service?" id="5" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>Multiple methods like credit or debit card, cash or bank transfer are available for customers to pay for a service. Credit and debit cards payments are collected on the HomeGenie website or mobile app, however, cash payments are collected by the staff </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="6. What will happen once I confirm the booking?" id="6" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>Once you confirm your booking, a message will be sent to all qualified teams and the one team which accepts first will be assigned the service. Scheduled services are confirmed instantly, however, Emergency and Same Day Service require real-time search to confirm.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="7. How can I get an estimate for the job?" id="7" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>Following an inspection or survey for a service, a detailed estimate will be prepared by the team and sent to the customer via Email and also can be seen on the website and mobile app where the estimate can be approved or rejected, for further review.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="8. How can I get a VAT invoice for the job?" id="8" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>A VAT invoice, alongwith other documents like estimates for the service can be dowloaded from Bookings/Current Bookings/View Details page on the website or mobile app after logging into your account.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="9. After the booking who do I coordinate with?" id="9" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>For every booking, a supervisor contact details will be provided who can be contacted for service further coordination and delivery. If you are facing any issues with service quality, we encourage you reach HomeGenie Customer Experience team.</Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                    <List.Accordion title="10. How to raise a complaint about a service?" id="10" titleStyle={[css.defaultText, { fontSize: 12 }]} style={[styles.helpModalTitle]}>
                                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                                            <View style={[css.flexDR]}>
                                                <Text style={[css.defaultSubText]}>All complaints should be raised via call or WhatsApp HomeGenie Customer Experience team on </Text>
                                            </View>
                                        </View>
                                    </List.Accordion>
                                </List.AccordionGroup>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
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
    categoryBtn: {
        backgroundColor: '#fff',
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10,
        borderColor: '#d1d1d1',
        borderWidth: 1,
        height: 45,
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryBtnText: {
        flexWrap: 'wrap', fontSize: 12, textAlign: 'center', fontFamily: 'PoppinsM'
    },
    activeBtn: {
        backgroundColor: '#2eb0e4',
        borderColor: '#2eb0e4'
    },
    activeText: {
        color: '#fff',
    },
    helpModalTitle: { backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 },
})