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
    Dimensions,
    TextInput,
} from "react-native";
import moment from 'moment';
import 'moment-timezone';
import Modal from 'react-native-modal';
import SocialMedia from "../components/SocialMedia";
import Whatsapp800 from "../components/Whatsapp800";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = "../assets/";
let imgPathImages = "../assets/images/"
export default function WalletScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [addcreditModal, setAddcreditModal] = useState(false);
    const toggleAddcreditModal = () => { setAddcreditModal(!addcreditModal) };
    let todayDate = moment().format('DD-MM-YYYY');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBarAll />
            <View style={css.header}>
                <View style={[css.flexDR]}>
                    <TouchableOpacity
                        style={[css.whiteC, css.justifyContentC]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            source={require(imgPath + 'backArrow.png')}
                        />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle, css.alignSelfC, css.marginL20, css.f24]}>Wallet</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[css.section,]}>
                    <View style={[css.container,]}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                            <View style={[css.boxShadow, css.whiteBG, css.borderRadius10, css.padding20]}>
                                <View style={[css.brandBG, css.padding20, css.flexDRSB, css.borderRadius10]}>
                                    <View style={[css.flexDC]}>
                                        <Text style={[css.fm, css.f18, css.whiteC]}>Wallet Balance</Text>
                                        <Text style={[css.fbo, css.f13, css.whiteC]}>as on  {todayDate}</Text>
                                    </View>
                                    <View style={[css.alignSelfC, css.flexDR]}>
                                        <Text style={[css.whiteC, css.f30, css.fbo, { color: '#FFFFFF77' }]}>AED </Text>
                                        <Text style={[css.whiteC, css.f30, css.fbo,]}> 0</Text>
                                    </View>
                                </View>
                                <View><Text style={[css.blackC, css.spaceT10]}>Wallet credit can be used only with card payment. </Text></View>
                                <View><Text style={[css.blackC, css.spaceT10, css.f18, css.spaceT10, css.spaceB10, css.fm]}>History </Text></View>
                                <View style={[css.flexDRSB]}>
                                    <Text style={[css.brandC, css.f18, css.fsb]}>EARNED</Text>
                                    <Text style={[css.f18, css.fsb, { color: '#ccc' }]}>AED</Text>
                                </View>
                                <View style={[css.flexDRSB]}>
                                    <Text style={[css.yellowC, css.f18, css.fsb,]}>USED</Text>
                                    <Text style={[css.f18, css.fsb, { color: '#ccc' }]}>AED</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={[css.yellowBG, css.alignItemsC, css.justifyContentC, css.borderRadius10, css.padding10, css.marginT30,]}
                                    onPress={() => setAddcreditModal(true)}
                                >
                                    <Text style={[css.f24, css.whiteC, css.fbo]}>+ ADD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={addcreditModal}
                animationIn='flipInX'
                animationInTiming={700}
                animationOut='flipOutX'
                animationOutTiming={700}
                coverScreen={true}
                useNativeDriver={true}
                //style={{ margin: 0, }}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}>
                            <TouchableOpacity
                                style={[css.flexDR,]}
                                onPress={() => setAddcreditModal(!addcreditModal)}
                            >
                                <Image source={require(imgPath + 'backArrowBlack.png')} />
                            </TouchableOpacity>
                            <View><Text style={[css.modalNewTitle]}>+ Add Credit to Your Wallet</Text></View>
                            <View><Text style={[css.modalNewText]}>Please enter your voucher or referral code to {"\n"} add credit to your account.</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                            <TextInput
                                placeholder="Enter Voucher / Referral Code"
                                style={{ borderRadius: 10, borderColor: '#2eb0e4', width: '90%', borderColor: '#ccc', borderWidth: 1, padding: 10 }}
                            />
                            <TouchableOpacity
                                onPress={() => setAddcreditModal(!addcreditModal)}
                                style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, { backgroundColor: '#2eb0e4', width: '25%', height: 40, borderRadius: 10, }]}
                            >
                                <Text style={[css.whiteC, css.fsb, css.f18]}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});