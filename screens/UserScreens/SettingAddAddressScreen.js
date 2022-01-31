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
    Pressable,
    Alert,
    FlatList,
    TouchableHighlight,
    Dimensions,
    TextInput,
} from "react-native";
import Modal from 'react-native-modal';
import SocialMedia from "../../components/SocialMedia";
import Whatsapp800 from "../../components/Whatsapp800";
import ModalComingSoon from "../../components/ModalComingSoon";
import css, { whiteBG } from '../../components/commonCss';
import MapView from 'react-native-maps';
import StatusBarAll from "../../components/StatusBar";
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
//import { Picker as SelectPicker } from '@react-native-picker/picker';
let imgPath = '../../assets/'
let imgPathImage = '../../assets/images'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SettingAddAddressScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [modalComingsoon, setModalComingsoon] = useState(false);
    const [addaddressModal, setAddaddressModal] = useState(false);
    const toggleAddaddressModal = () => { setAddaddressModal(!addaddressModal) };
    const [removeaddressModal, setRemoveaddressModal] = useState(false);
    const toggleRemoveaddressModal = () => { setRemoveaddressModal(!removeaddressModal) };
    const [radioChecked, setRadioChecked] = useState('first');
    const [cityDropdown, setCityDropdown] = useState("Dubai");

    const [cityOpen, setCityOpen] = useState(false);
    const [cityValue, setCityValue] = useState(null);
    const [cityItems, setCityItems] = useState([
        { label: 'Dubai', value: 'dubai' },
        { label: 'Abu Dhabi', value: 'adbudhabi' }
    ]);


    const user = 'noAddress';
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
                        <Image source={require("../../assets/backArrow.png")} />
                    </TouchableOpacity>
                    <View style={[css.flexDR_ALC]}>
                        <Image style={[styles.titleIcon]} source={require("../../assets/iconLocationWhite.png")} />
                        <Text style={[css.headerTitle, css.marginL10, css.f24,]}>ADDRESS</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                {user == 'noAddress' ?
                    <View style={[css.section]}>
                        <View style={[css.container, { height: windowHeight - 100 }]}>
                            <View style={[css.flexDCSB, css.alignItemsC, { flex: 1 }]}>
                                <View style={[css.imgBR150, css.whiteBG, css.alignCenter, css.marginT30]}><Image style={[css.img100]} source={require(imgPath + 'iconAddAddress.png')} /></View>
                                <View><Text style={[css.f18, css.textCenter, css.blackC]}>No Addressess yet. {'\n'} Add an address to enjoy {'\n'} a home service</Text></View>
                                <TouchableOpacity style={[css.blueBtn, css.boxShadow, css.imgFull, { height: 50 }]} onPress={() => setAddaddressModal(true)}>
                                    <Text style={[css.whiteC, css.f18, css.textCenter, css.fsb]}>+ ADD ADDRESS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={[css.section]}>
                        <View style={[css.container,]}>
                            <View style={[css.boxShadow, css.whiteBG, css.borderRadius10]}>
                                <Text style={[css.line10, css.blackC, css.f24, css.textCenter, { marginTop: 30, marginBottom: 0, }]}>ADD OR REVIEW</Text>
                                <View style={[css.flexDRSB, css.padding20, css.line]}>
                                    <View style={styles.rbWrapper}>
                                        <TouchableOpacity style={[styles.rbStyle, { alignSelf: 'center', marginRight: 10 }]}>
                                            <View style={styles.selected} />
                                        </TouchableOpacity>
                                        <View style={[css.flexDC, { alignSelf: 'flex-start' }]}>
                                            <Text style={[css.f18, css.fsb, css.blackC,]}>Azaudeen new</Text>
                                            <Text style={[css.f18, css.fsb, css.blackC]}>(Default)</Text>
                                            <Text style={[css.f14, css.fsb, css.greyC]}>Hor al anz, bb1, Dubai</Text>
                                        </View>
                                    </View>
                                    <View style={[css.flexDC]}>
                                        <Pressable style={[css.padding5]} onPress={() => setAddaddressModal(true)}><Image source={require(imgPath + 'edit.png')} /></Pressable>
                                        <Pressable style={[css.padding5]} onPress={() => setRemoveaddressModal(true)}><Image source={require(imgPath + 'delete.png')} /></Pressable>
                                    </View>
                                </View>
                                <View style={[css.flexDRSB, css.padding20, css.line]}>
                                    <View style={styles.rbWrapper}>
                                        <TouchableOpacity style={[styles.rbStyle, { alignSelf: 'center', marginRight: 10 }]}>
                                            <View style={styles.selected} />
                                        </TouchableOpacity>
                                        <View style={[css.flexDC, { alignSelf: 'flex-start' }]}>
                                            <Text style={[css.f18, css.fsb, css.blackC,]}>Azaudeen new</Text>
                                            <Text style={[css.f18, css.fsb, css.blackC]}>(Default)</Text>
                                            <Text style={[css.f14, css.fsb, css.greyC]}>Hor al anz, bb1, Dubai</Text>
                                        </View>
                                    </View>
                                    <View style={[css.flexDC]}>
                                        <Pressable style={[css.padding5]} onPress={() => setAddaddressModal(true)}><Image source={require(imgPath + 'edit.png')} /></Pressable>
                                        <Pressable style={[css.padding5]} onPress={() => setRemoveaddressModal(true)}><Image source={require(imgPath + 'delete.png')} /></Pressable>
                                    </View>
                                </View>
                                <View style={[css.flexDCSB, css.alignItemsC, css.padding20]}>
                                    <TouchableOpacity style={[css.blueBtn, css.boxShadow, css.imgFull, css.marginT5, { height: 50 }]} onPress={() => setAddaddressModal(true)}>
                                        <Text style={[css.whiteC, css.f18, css.textCenter, css.fsb]}>+ ADD ADDRESS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                }
            </ScrollView>
            <Modal
                isVisible={addaddressModal}
                animationIn='fadeInUp'
                animationInTiming={700}
                animationOut='fadeOutDown'
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
                                style={[css.flexDR,]}
                                onPress={() => setAddaddressModal(!addaddressModal)}
                            >
                                <Image style={[css.marginT5]} source={require(imgPath + 'backArrowBlack.png')} />
                                <Text style={[css.marginL10, css.f18, css.fm, css.greyC,]}>Back</Text>
                            </TouchableOpacity>
                            <View style={[css.marginL20,]}>
                                <Text style={[css.blackC, css.f16, css.fbo, css.marginT10, css.textCenter]}>Complete all details to add / edit an address.</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={[bookModal.modalBody]}>
                                <View>
                                    <MapView
                                        style={{ width: '100%', height: 50 }}
                                        initialRegion={{
                                            latitude: 25.06863606639939,
                                            longitude: 55.14505291115706,
                                            latitudeDelta: 25.06863606639939,
                                            longitudeDelta: 55.14505291115706,
                                        }}
                                    />
                                </View>
                                <View style={[css.padding20, css.marginT20]}>
                                    <View style={[css.marginB10]}>
                                        <TextInput
                                            style={[form.input,]}
                                            // onChangeText={onChangeNumber}
                                            // value={number}
                                            placeholder="Search location on map"
                                        //keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={[css.marginB10]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Name"
                                        />
                                    </View>
                                    <View style={[css.flexDR, css.marginB10]}>
                                        <View style={[css.flexDR, css.width50]}>
                                            <RadioButton
                                                value="first"
                                                status={radioChecked === 'first' ? 'checked' : 'unchecked'}
                                                onPress={() => setRadioChecked('first')}
                                                color='#2eb0e4'
                                                uncheckedColor='#ccc'
                                            />
                                            <Text style={[css.alignSelfC, css.greyC, css.fm, css.f16, css.fr]}>Villa</Text>
                                        </View>
                                        <View style={[css.flexDR]}>
                                            <RadioButton
                                                value="second"
                                                status={radioChecked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => setRadioChecked('second')}
                                                color='#2eb0e4'
                                                uncheckedColor='#ccc'
                                            />
                                            <Text style={[css.alignSelfC, css.greyC, css.fm, css.f16, css.fr]}>Apartment</Text>
                                        </View>
                                    </View>
                                    <View style={[css.flexDRSB, css.marginB10]}>
                                        <TextInput
                                            style={[form.input, { width: '48%' }]}
                                            placeholder="Aprt./Villa No."
                                        />
                                        <TextInput
                                            style={[form.input, { width: '48%' }]}
                                            placeholder="Street name"
                                        />
                                    </View>
                                    <View style={[css.marginB10]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Community / Building name"
                                        />
                                    </View>
                                    <View style={[css.flexDR, css.marginB10]}>
                                        <DropDownPicker
                                            style={[form.input, { color: '#ccc' }]}
                                            open={cityOpen}
                                            value={cityValue}
                                            items={cityItems}
                                            setOpen={setCityOpen}
                                            setValue={setCityValue}
                                            setItems={setCityItems}
                                        />
                                    </View>
                                    <View style={[css.flexDR, css.marginB10]}>
                                        <TextInput
                                            style={[form.input,]}
                                            placeholder="Country"
                                        />
                                    </View>
                                    <View style={[css.flexDR]}>
                                        <View style={[css.boxShadow, css.yellowBtn, css.alignItemsC, css.justifyContentC, { height: 50, width: '100%' }]}><Text style={[css.fsb, css.f24, css.whiteC]}>SAVE ADDRESS</Text></View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                isVisible={removeaddressModal}
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
                            <View><Text style={[css.modalNewText, { fontSize: 20, color: '#525252', lineHeight: 26, letterSpacing: 0.2, fontFamily: 'PoppinsM' }]}>Are you sure you want to delete the Address?</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                            <View style={[css.flexDRSE, css.imgFull]}>
                                <TouchableOpacity
                                    onPress={() => setRemoveaddressModal(!removeaddressModal)}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, { backgroundColor: '#f4f4f4', width: '40%', height: 50, borderRadius: 10, }]}
                                >
                                    <Text style={[css.blackC, css.fsb, css.f18]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setRemoveaddressModal(!removeaddressModal)}
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
    input: { borderRadius: 10, borderWidth: 1, borderColor: '#ccc', height: 50, width: '100%', paddingLeft: 20, paddingRight: 20 },
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