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
    Dimensions,
} from "react-native";
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import css from '@components/commonCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';



export default function GetgenieHeader({ props, navigation }) {
    const [cancelModal, setCancelModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('ac-cooling-repair');
    const [items, setItems] = useState([
        { label: 'Ac cooling repair', value: 'ac-cooling-repair' },
        { label: 'Ac noise repair', value: 'ac-noise-repair' },
        { label: 'Ac coil cleaning', value: 'ac-coil-cleaning' },
        { label: 'Ac duct cleaning', value: 'ac-duct-cleaning' },
    ]);

    return (
        <View style={[css.section, styles.fixedContainer]}>
            <View style={[css.container, css.liteBlueBG, styles.fixedHeader]}>
                <View style={[css.flexDRSA]}>
                    <View style={{ width: '10%' }}>
                        <Image style={{ width: 40, height: 40, justifyContent: 'center' }} source={require('@assets/icons/images/acBooking.png')} />
                    </View>
                    <View style={{ width: '50%', flexDirection: 'column' }}>
                        <TextInput
                            style={[styles.genieScreenHeaderSearch], { borderBottomColor: '#525252', borderBottomWidth: 1, marginLeft: 10, fontSize: 18, height: 30 }}
                            value='AC'
                            placeholder="SEARCH FOR ANY SERVICE"
                        />
                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#2eb0e4', borderRadius: 50, width: 80, justifyContent: 'center', alignItems: 'center', height: 25 }}><Text style={{ color: '#fff' }}>Change</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setCancelModal(!cancelModal)}><Text style={{ textAlign: 'right', color: '#2eb0e4', paddingTop: 3, fontFamily: 'PoppinsR', fontSize: 11 }}>Can't find? Search here</Text></TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20 }} source={require('@assets/icons/iconLocationBlue.png')} />
                        <Text style={{ color: '#2eb0e4' }}>Dubai</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={[css.whiteC, css.backButton], { width: 15, height: 15, marginBottom: 10 }}
                            onPress={() => setCancelModal(!cancelModal)}
                        >
                            <Image style={{ width: 15, height: 15, justifyContent: 'center', alignItems: 'center' }} source={require('@assets/icons/close.png')} />
                        </TouchableOpacity>
                        <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={require('@assets/icons/login-icon.png')} />
                    </View>
                </View>
                <View style={[css.flexDRSB, css.spaceT10]}>
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
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                    />
                </View>
            </View>
            <Modal
                isVisible={cancelModal}
                animationIn='flipInX'
                animationInTiming={700}
                animationOut='flipOutX'
                animationOutTiming={700}
                onBackdropPress={() => setCancelModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.modalHeader]}>
                            <Text style={styles.modalText}>Are you sure want to cancel?</Text>
                            <Text style={styles.modalText}>You will loose all information entered.</Text>
                        </View>
                        <View style={[styles.modalBody]}>
                            <View style={[css.flexDRSB]}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, styles.cancelBtn]}
                                    onPress={() => setCancelModal(!cancelModal)}
                                >
                                    <Text style={[styles.textStyle, styles.cancelBtnText]}>Yes, Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, styles.continueBtn]}
                                    onPress={() => setCancelModal(!cancelModal)}
                                >
                                    <Text style={[styles.textStyle, styles.continueBtnText]}>No, Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

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
    //Modal-css
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
        padding: 40,
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
    cancelBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f4f8',
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
        width: '45%'
    },
    cancelBtnText: {
        fontSize: 14,
        fontFamily: 'PoppinsM',
        letterSpacing: 0.25,
        color: '#000000a3',
        textTransform: 'uppercase',
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
        width: '45%',
    },
    continueBtnText: {
        fontSize: 14,
        fontFamily: 'PoppinsM',
        letterSpacing: 0.25,
        color: '#fff',
        textTransform: 'uppercase',
    },
    fixedContainer: { flex: 1, zIndex: 1 },
    fixedHeader: { position: 'absolute', top: 0 },
})