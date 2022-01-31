import React, { Component, useState } from "react";
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
    Dimensions,
    StatusBar,
    Pressable,
    Alert,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AccordionList } from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import Modal from 'react-native-modal';
import { List } from 'react-native-paper';
import ModalComingSoon from "../components/ModalComingSoon";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";

const FirstRoute = () => {
    const [modalComingsoon, setModalComingsoon] = useState(false);
    return (
        <View style={[styles.scene, styles.bookingTabs]}>
            <View style={[styles.bookingTabsContent], { alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View style={{ width: 150, height: 150, marginVertical: 10, borderRadius: 200, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={[styles.bookingTabsImage], { width: 100, height: 100, }}
                        source={require('../assets/support_smiley.png')}
                    />
                </View>
                <Text style={[styles.bookingTabsText], { textAlign: 'center', fontSize: 16, lineHeight: 22, marginVertical: 20, color: '#303030' }} >No complaint yet. {"\n"}Add a complaint we {"\n"}can help address.</Text>
                <Pressable style={[styles.button], {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 10,
                    elevation: 3,
                    backgroundColor: '#2eb0e4',
                    marginVertical: 80,
                    width: '90%'
                }}
                    onPress={() => setModalComingsoon(true)}
                >
                    <Text style={[styles.text], {
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        color: 'white',
                    }}> + ADD COMPLAINT</Text>
                </Pressable>
            </View>
        </View>
    );
}

const SecondRoute = () => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    return (
        <ScrollView style={[styles.scene, styles.bookingTabs]}>
            <View style={{ backgroundColor: '#fff', margin: 20 }}>
                <List.AccordionGroup>
                    <List.Accordion title="1. What is a home service?" id="1">
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
                    <List.Accordion title="2. What is HomeGenie and who is a Genie?" id="2">
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View style={[css.flexDR]}>
                                <Text>HomeGenie is an online on-demand home services 'managed' marketplace. The term ‘managed’ differentiates it from other open marketplaces as we do not just connect customers with verified and vetted service company “professionals” or "Genie" but also enable a world-class end-to-end home services experience for all. A Genie is a service professional who has undergone a thorough background check from HomeGenie to ensure he/she has the appropriate legal approval, skill and customer rating required to perform the customer job adhering to all prescribed safety and security protocols. </Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="3. What all home services does HomeGenie offer?" id="3">
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>HomeGenie offers over 200+ home services within the following service categories - AC, Plumbing, Electrical, Masonry, Carpentry, Handyman, Cleaning, Specialized Cleaning, Pest Control, Appliances, Gardening, Electronics, Gardening, Pool and more. All these services are grouped under Daily Utilities, Health and Wellness, Lifestyle and Decor and Others. For more details, kindly visit </Text>
                                <Pressable><Text style={[css.brandC]}>https://www.homegenie.com/en/dubai/services</Text></Pressable>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="4. What all home services does HomeGenie offer?" id="4">
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>HomeGenie offers over 200+ home services within the following service categories - AC, Plumbing, Electrical, Masonry, Carpentry, Handyman, Cleaning, Specialized Cleaning, Pest Control, Appliances, Gardening, Electronics, Gardening, Pool and more. All these services are grouped under Daily Utilities, Health and Wellness, Lifestyle and Decor and Others. For more details, kindly visit </Text>
                                <Pressable><Text style={[css.brandC]}>https://www.homegenie.com/en/dubai/services</Text></Pressable>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="5. What all home services does HomeGenie offer?" id="5">
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>HomeGenie offers over 200+ home services within the following service categories - AC, Plumbing, Electrical, Masonry, Carpentry, Handyman, Cleaning, Specialized Cleaning, Pest Control, Appliances, Gardening, Electronics, Gardening, Pool and more. All these services are grouped under Daily Utilities, Health and Wellness, Lifestyle and Decor and Others. For more details, kindly visit </Text>
                                <Pressable><Text style={[css.brandC]}>https://www.homegenie.com/en/dubai/services</Text></Pressable>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="6. What all home services does HomeGenie offer?" id="6">
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>HomeGenie offers over 200+ home services within the following service categories - AC, Plumbing, Electrical, Masonry, Carpentry, Handyman, Cleaning, Specialized Cleaning, Pest Control, Appliances, Gardening, Electronics, Gardening, Pool and more. All these services are grouped under Daily Utilities, Health and Wellness, Lifestyle and Decor and Others. For more details, kindly visit </Text>
                                <Pressable><Text style={[css.brandC]}>https://www.homegenie.com/en/dubai/services</Text></Pressable>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="7. What all home services does HomeGenie offer?" id="7">
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>HomeGenie offers over 200+ home services within the following service categories - AC, Plumbing, Electrical, Masonry, Carpentry, Handyman, Cleaning, Specialized Cleaning, Pest Control, Appliances, Gardening, Electronics, Gardening, Pool and more. All these services are grouped under Daily Utilities, Health and Wellness, Lifestyle and Decor and Others. For more details, kindly visit </Text>
                                <Pressable><Text style={[css.brandC]}>https://www.homegenie.com/en/dubai/services</Text></Pressable>
                            </View>
                        </View>
                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        </ScrollView>
    );
}



export default function SupportScreen({ navigation }) {
    const [modalComingsoon, setModalComingsoon] = useState(false);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'SUPPORT' },
        { key: 'second', title: 'FAQ' },
    ]);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{ marginTop: 25, backgroundColor: 'red' }}
        />
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFBFF" }}>
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
                            source={require("../assets/backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle]}>Support</Text>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color }) => (
                            <Text style={{ color: 'black', margin: 8 }}>
                                {route.title}
                            </Text>
                        )}
                        activeColor={{ color: 'green', backgroundColor: 'yellow' }}
                        indicatorStyle={{ backgroundColor: 'rgba(46,176,228,.2)', height: 4 }}
                        style={{ backgroundColor: 'transparent' }}
                    />
                )}
                onIndexChange={setIndex}
                style={[styles.container]}
            />
            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Coming soon - stay tuned</Text>
                        <Pressable
                            style={[css.yellowBtn]}
                            onPress={() => setModalComingsoon(false)}
                        >
                            <Text style={[css.whiteC, css.f16]}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    scene: {
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        width: '100%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalContentContainer: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
});