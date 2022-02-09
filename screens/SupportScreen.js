import React, { Component, useState } from "react";
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
import Text from "../components/MyText";
import ModalComingSoon from "../components/ModalComingSoon";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let imgPath = "../assets/icons/";
let imgPathImages = "../assets/icons/images/"
const FirstRoute = () => {
    const [modalComingsoon, setModalComingsoon] = useState(false);
    return (
        <View style={[styles.scene, styles.bookingTabs]}>
            <View style={[styles.bookingTabsContent,], { alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View style={{
                    width: 150, height: 150,
                    borderRadius: 200,
                    backgroundColor: '#fff', justifyContent: 'center',
                    alignItems: 'center', marginTop: 50,
                }}>
                    <Image
                        style={[styles.bookingTabsImage], { width: 75, height: 75, }}
                        source={require(imgPath + 'support_smiley.png')}
                    />
                </View>
                <Text style={[styles.bookingTabsText]} >No complaint yet. {"\n"}Add a complaint we {"\n"}can help address.</Text>
                <Pressable style={[styles.button]}
                    onPress={() => setModalComingsoon(true)}
                >
                    <Text style={[styles.buttonText]}> + ADD COMPLAINT</Text>
                </Pressable>
            </View>
            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={[css.modalText, css.fm, css.f16, css.blackC]}>Coming soon - stay tuned</Text>
                        <Pressable
                            style={[css.yellowBtn]}
                            onPress={() => setModalComingsoon(false)}
                        >
                            <Text style={[css.whiteC, css.f16, css.fm]}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const SecondRoute = () => {
    const [expanded, setExpanded] = useState(false)
    return (
        <ScrollView style={[styles.scene, styles.bookingTabs]}>
            <View style={[css.borderRadius10, css.whiteBG, css.padding10, css.marginT20]}>
                <List.AccordionGroup>
                    <List.Accordion
                        title="1. What is a home service?"
                        id="1"
                        titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
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
                    <List.Accordion title="2. What is HomeGenie and who is a Genie?" id="2" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View style={[css.flexDR]}>
                                <Text>HomeGenie is an online on-demand home services 'managed' marketplace. The term ‘managed’ differentiates it from other open marketplaces as we do not just connect customers with verified and vetted service company “professionals” or "Genie" but also enable a world-class end-to-end home services experience for all. A Genie is a service professional who has undergone a thorough background check from HomeGenie to ensure he/she has the appropriate legal approval, skill and customer rating required to perform the customer job adhering to all prescribed safety and security protocols.</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="3. What all home services does HomeGenie offer?" id="3" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>HomeGenie offers over 200+ home services within the following service categories - AC, Plumbing, Electrical, Masonry, Carpentry, Handyman, Cleaning, Specialized Cleaning, Pest Control, Appliances, Gardening, Electronics, Gardening, Pool and more. All these services are grouped under Daily Utilities, Health and Wellness, Lifestyle and Decor and Others. For more details, kindly visit </Text>
                                <Text style={[css.brandC, css.fm, css.f12]} onPress={() => Linking.openURL('https://www.homegenie.com/en/dubai/services')}>https://www.homegenie.com/en/dubai/services</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="4. How do I Book a HomeGenie service?" id="4" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>Customers can book a HomeGenie service using the following methods –</Text>
                                <View style={[css.flexDR, css.marginL10]}>
                                    <Text>{'\u2022'}{'  '}</Text>
                                    <Text>Book from our website <Text style={[css.fm, css.f14, css.brandC]} onPress={() => Linking.openURL('https://www.homegenie.com')}>(www.homegenie.com)</Text></Text>
                                </View>
                                <View style={[css.flexDR, css.marginL10]}>
                                    <Text>{'\u2022'}{'  '}</Text>
                                    <Text >Use HomeGenie
                                        <Text style={[css.fm, css.f14, css.brandC]} onPress={() => Linking.openURL('https://itunes.apple.com/ae/app/homegenie/id1116094473?mt=8')}> iOS </Text>
                                        and
                                        <Text style={[css.fm, css.f14, css.brandC]} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.homegenie')}> Android </Text>
                                        mobile apps
                                    </Text>
                                </View>
                                <Text>We recommend downloading and using our Android and iOS mobile apps, for the best user end-to-end experience and special in-app discounts and offers.</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="5. Does You Offer An Emergency Service?" id="5" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>Yes. We do have an Emergency Service providing services within 2 hours. The service is available 24x7 at an additional Emergency charge</Text>
                                <View style={[css.flexDR, css.marginT5]}>
                                    <Text >Look for
                                        <Image style={[css.img20]} source={require(imgPath + 'emergency.png')} />
                                        on the website or mobile apps to book an Emergency Service.
                                    </Text>
                                </View>
                                <View style={[css.flexDR, css.marginT5]}>
                                    <Text>
                                        <Text style={[css.fsb, css.blackC, css.f14]}>NOTE: </Text>
                                        Kindly note that not all HomeGenie services are offered as Emergency due to building or community security restrictions and regulatory restrictions, within your city.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="6. Can A Customer Book A Service For A Later Date/ Time?" id="6" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>Customers can book a Scheduled Service offered during standard office hours (8 am to 8 pm) on all working days from Sat to Thu, except public holidays. Such bookings can be scheduled up to a month in advance and not before 24 hours from the date and time of the booking being done.</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="7. Are The Services Available After Office Hours, Fridays Or On Public Holidays?" id="7" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>Yes. Our Scheduled Services are offered on Fridays, however, for Public Holidays and After Office hours services are only available as an Emergency Service.</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="8. I Saw Same Day Service On Your Website. What Is It?" id="8" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View style={[css.flexDR]}>
                                <Text>We also offer Same Day Services, for anyone who is flexible on the timing but wants the Service within the day and not necessarily as an Emergency. The same day service does not come with a fixed arrival time commitment but with the earliest availability option on the same day within office hours (8 am to 8 pm). You can click on Same Day button on the website or mobile app, to book the Same Day Service.</Text>
                            </View>
                            <View style={[css.marginT5]}><Text>Kindly note the Same Day service can only be booked between 8 AM to 12 noon, on the same day.</Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="9. How Does HomeGenie Ensure The Best Price For The Services?" id="9" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <Text>Services, unlike products, are more complicated and unfortunately require an inspection or basic survey to determine the price, as prices cannot be offered at a fixed price. Therefore, in most instances, after a service is booked, the assigned Genie visits your location to inspect the issue or survey your requirement and provide you with the best cost and day/time estimate for your approval. HomeGenie regularly conducts independent checks on market prices and estimates submitted by our partners to ensure customers are not overcharged.</Text>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="10. What Is A Fixed Price, Inspection Based And Survey-Based Services On Your Website?" id="10" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>HomeGenie services are of 3 types, based on their name:</Text></View>
                            <View style={[css.flexDR, css.marginL10]}>
                                <Text style={[css.fsb,]}>{'\u2022'}{'  '}</Text>
                                <Text><Text style={[css.fsb, css.blackC, css.f14]}>Fixed price service - </Text>a service delivered in the safety and comfort of a customers’ home which otherwise might have required customers to travel e.g.salon, pet grooming, etc.</Text>
                            </View>
                            <View style={[css.flexDR, css.marginL10]}>
                                <Text style={[css.fsb,]}>{'\u2022'}{'  '}</Text>
                                <Text><Text style={[css.fsb, css.blackC, css.f14]}>Inspection based service - </Text>This type of service requires the Genie to mandatory visit the customer location to inspect and diagnose the issue and propose a solution and provide an estimate of material and labour required e.g. AC repair service. There is an inspection call-out charge for this service.</Text>
                            </View>
                            <View style={[css.flexDR, css.marginL10]}>
                                <Text style={[css.fsb,]}>{'\u2022'}{'  '}</Text>
                                <Text><Text style={[css.fsb, css.blackC, css.f14]}>Survey-based service - </Text>This type of service requires the Genie to call, message or visit the customer location to survey and ascertain the requirements and preferences before an estimate for material and labour can be provided e.g. fabrication of curtains or blinds service. The Survey is free of charge.</Text>
                            </View>
                            <View><Text>Kindly always note the type of service you are booking a service to understand the charges.</Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="11. Where Can I Find Scope And Pricing Details For A Particular Service, While Booking?" id="11" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>While on the HomeGenie website, you can find the pricing and service details on individual service pages. However, at the time of booking a service, on the website or mobile app, you could click on the following buttons to view the required details, before confirming a booking.</Text></View>
                            <View style={[css.flexDR, css.marginL10]}>
                                <Text style={[css.fsb,]}>{'\u2022'}{'  '}</Text>
                                <Text style={[css.flexDR, css.blackC, css.fm, css.f14,]}><Image style={[css.img20, { width: 20, height: 20 }]} source={require(imgPath + 'priceverification.png')} /> view the type of service and the applicable pricing details; and</Text>
                            </View>
                            <View style={[css.flexDR, css.marginL10]}>
                                <Text style={[css.fsb,]}>{'\u2022'}{'  '}</Text>
                                <Text style={[css.flexDR, css.blackC, css.fm, css.f14,]}><Image style={[css.img20, { width: 20, height: 20 }]} source={require(imgPath + 'expert.png')} /> This type of service requires the Genie to mandatory visit the customer location to inspect and diagnose the issue and propose a solution and provide an estimate of material and labour required e.g. AC repair service. There is an inspection call-out charge for this service.</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="12. How Does HomeGenie Ensure The Quality Of Its Services?" id="12" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>We identify, vet and select only quality home service companies and their professionals within your city to become HomeGenie partners. Our partners share with us a common vision, core values and commitment towards bringing a change in the home services industry. We work directly with their service professionals, enable them with state-of-the-art tools, train them on interpersonal skills before getting them on board as a ‘Genie’, and send them to our customers. The Genies are rated on every job and only the best continue working with HomeGenie while the others are weeded out regularly. mandatory</Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="13. If I Am Facing Some Issue With The Service Can I Contact HomeGenie?" id="13" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>HomeGenie ensures every service is delivered seamlessly to the best of the customers’ satisfaction. We have therefore set up a dedicated Customer Experience Team available on call and WhatsApp on toll-free number <Text style={[css.brandC, css.f14, css.fm]} onPress={() => Linking.openURL('tel:+971800443643')}>+971(0)80 0443643 (HGENIE)</Text> and <Text style={[css.brandC, css.f14, css.fm]} onPress={() => Linking.openURL('mailto: support@homegenie.com')}>support@homegenie.com</Text> from 8 AM to 8 PM (SAT to THU) to address all customer queries and complaints.</Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="14. How Can I Reach The Genie Assigned To My Booking?" id="14" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>Once a Genie has been assigned to a customer, a customer can call the Supervisor of the Genie by clicking on the number provided on the website or the mobile app. This avoids the hassle of saving numbers for a professional every time you take home service. Alternately, you could reach out to the HomeGenie team as mentioned on.</Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="15. Can I Cancel A HomeGenie Service? How?" id="15" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>Yes. A customer can cancel a service at any time after the booking from the website or the mobile apps. As you would understand that once you book a service, one or more Genie are reserved for you for the date and time of your service and they are not assigned to another customer booking, a cancellation closer to the date and time of the service can result in loss of income for them. Considering this we have a cancellation charge for cancellations not providing us enough time to reassign the Genie and avoid any loss of income to them and at least cover their costs.</Text></View>
                            <View style={[css.marginT5]}><Text>For details on the cancellation policy, please refer to our pricing policy on <Text style={[css.fm, css.f14, css.brandC]} onPress={() => Linking.openURL('https://www.homegenie.com/pricing-policies/')}>https://www.homegenie.com/pricing-policies/</Text></Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="16. Can A Customer Reschedule A HomeGenie Booking? How?" id="16" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>A customer can reschedule a HomeGenie service, following a discussion with the assigned Supervisor for the service. Kindly go to My Bookings, View Details and Call the mobile number provided for the required booking.</Text></View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="17. How And When Do I Pay For A HomeGenie Service?" id="17" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>You can pay for a service by the following methods, upon completion of service or as advance, in case the job requires advance payment.</Text></View>
                            <View style={[css.flexDR]}>
                                <Text>{'\u2022'}{'  '}</Text>
                                <Text>Credit card/ debit card - paid on the HomeGenie website or mobile apps</Text>
                            </View>
                            <View style={[css.flexDR]}>
                                <Text>{'\u2022'}{'  '}</Text>
                                <Text>Cash - to the Genie who delivered the service</Text>
                            </View>
                            <View style={[css.flexDR]}>
                                <Text>{'\u2022'}{'  '}</Text>
                                <Text>Account transfer- paid to HomeGenie account or</Text>
                            </View>
                            <View>
                                <Text><Text style={[css.fsb, css.f14, css.blackC]}>NOTE: </Text>Advance payment is only generally required for jobs that need procurement of parts and materials.</Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="18. How Can I Get A Refund Against A Complaint On A HomeGenie Service?" id="18" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>You will need to raise a complaint by calling us on
                                    <Text style={[css.brandC, css.f14, css.fm]} onPress={() => Linking.openURL('tel:+971800443643')}> +971(0)800443643 </Text>
                                    , writing to us on
                                    <Text style={[css.brandC, css.f14, css.fm]} onPress={() => Linking.openURL('mailto:support@homegenie.com')}> support@homegenie.com </Text>
                                    mentioning the JOBID. Once the complaint is investigated, generally, within 5 working days, the refunds, if approved, are processed and take up to 15 working days to be transferred back to the customer bank account.
                                </Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="19. What Is The HomeGenie Warranty Policy?" id="19" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View>
                                <Text>For every service we deliver, we offer a service warranty which means that if what we fixed is reported faulty again within the warranty period, we will come back and try to fix it for free without charging for any labour. In case the issue is with the parts and materials, any return on that will be dependent on the warranty that comes from the supplier as parts do not come with a warranty when bought standalone.</Text>
                            </View>
                            <View style={[css.marginT5]}>
                                <Text>For details on the cancellation policy, please refer to our pricing policy on <Text style={[css.fm, css.brandC, css.f14]} onPress={() => Linking.openURL('https://www.homegenie.com/pricing-policies/')}>https://www.homegenie.com/pricing-policies/</Text></Text>
                            </View>
                        </View>
                    </List.Accordion>
                    <List.Accordion title="20. Where Can I Find HomeGenie Services Terms And Conditions?" id="20" titleStyle={[css.brandC, css.fsb, css.f14]}
                        style={[css.whiteBG, css.line, { paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }]}
                        right={props => <Image style={{ position: 'absolute', right: -20, top: -35, transform: [{ rotate: "0deg" }] }} source={require(imgPath + 'arrowDown_hg.png')} />}
                    >
                        <View style={[css.liteBlueBG, css.borderRadius20, css.padding20]}>
                            <View><Text>Our customer needs to familiarize themselves with HomeGenie terms and conditions, before using our service. We continuously update our policy and send out updates to our customers on the same.</Text></View>
                            <View style={[css.marginT5]}>
                                <Text>Please find our detailed terms of use on <Text style={[css.fm, css.brandC, css.f14]} onPress={() => Linking.openURL('https://www.homegenie.com/pricing-policies/')}>https://www.homegenie.com/term-of-use/</Text></Text>
                            </View>
                        </View>
                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        </ScrollView >
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
    // const renderTabBar = (props) => (
    //     <TabBar
    //         {...props}
    //         activeColor={[css.brandC]}
    //         inactiveColor={[css.blackC]}
    //         style={{ marginTop: 25, fontSize: 12, fontFamily: 'PoppinsM' }}
    //     />
    // );
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
                            source={require(imgPath + "backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle]}>Support</Text>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color, fontFamily, fontSize }) => (
                            <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'PoppinsR' }}>{route.title}</Text>
                        )}
                        activeColor={{ color: '#2eb0e4', fontFamily: 'PoppinsBO', fontSize: 14, }}
                        inactiveColor={{ color: '#525252', fontFamily: 'PoppinsR', fontSize: 14, }}
                        labelStyle={{ color: '#2eb0e4', fontFamily: 'PoppinsBO', fontSize: 14, }}
                        indicatorStyle={{ backgroundColor: 'rgba(46,176,228,.2)', height: 4, alignSelf: 'center', borderRadius: 3 }}
                        style={{ backgroundColor: 'transparent', width: '50%', alignSelf: 'center', elevation: 0 }}
                    />
                )}
                onIndexChange={setIndex}
                style={[styles.container, css.marginT20]}
            />
            <Modal
                animationType="fade"
                isVisible={modalComingsoon}
                hasBackdrop={true}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={[css.modalText, css.fbo, css.f14]}>Coming soon - stay tuned</Text>
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
        fontFamily: 'PoppinsSB'
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
    bookingTabsText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 22,
        marginVertical: 20,
        color: '#525252',
        fontFamily: 'PoppinsM'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        backgroundColor: '#2eb0e4',
        marginVertical: 80,
        width: '90%'
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'PoppinsBO',
        letterSpacing: 0.25,
        color: 'white',
    },
});