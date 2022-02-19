import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import Whatsapp from '@components/whtsApp';
import Text from '@components/MyText';
import SocialMedia from '@components/socialMedia';
import LoginModal from '@components/modals/login';
import css from '@components/commonCss';
import {
  sendOTP,
  verifyOTP,
  logout,
  getLoggedInStatus,
  getUser
} from '../../redux/reducers/userSlice';

const imgPath = '@assets/icons/';

function Login(props) {
  const isLoggedIn = useSelector(getLoggedInStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [loginModal, setLoginModal] = useState(false);
  const [addcardModal, setAddcardModal] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    toggleAddcardModal();
  };

  const toggleAddcardModal = () => { setAddcardModal(!addcardModal) };
  return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={css.header}>
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        style={[styles.textWhite, styles.backButton]}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            style={{}}
                            source={require("@assets/icons/backArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={[css.headerTitle, css.alignSelfC]}>My Accounts</Text>
                </View>
            </View>
            <ScrollView style={styles.ScrollView}>
                {user ?
                    <View style={[styles.screen]}>
                        <View style={[styles.bgLiteBlue]}>
                            <View style={[css.flexDRSB, { padding: 15, paddingTop: 5, paddingBottom: 5 }]} >
                                <View style={[css.flexDR]}>
                                    <View>
                                        {displayProfilePic ?
                                            <Image
                                                resizeMode="cover"
                                                style={[{ borderRadius: 500, width: 60, height: 60, marginRight: 15 }]}
                                                source={{ uri: displayProfilePic }} />
                                            :
                                            <Image
                                                resizeMode="contain"
                                                style={[css.img50, { borderRadius: 50, marginRight: 15 }]}
                                                source={require("@assets/icons/guest-icon.png")}
                                            />
                                        }
                                    </View>
                                    <View style={[css.flexDC, css.alignSelfC]}>
                                        <Text style={[css.fbo, css.f16, css.blackC,]}>
                                            {userData ? userData.name : ''}
                                        </Text>
                                        <Text style={[css.fm, css.f12, css.blackC,]}>
                                            {userData ? userData.email : ''}
                                        </Text>
                                    </View>
                                </View>
                                <Pressable
                                    style={[css.alignSelfC]}
                                    onPress={() => props.navigation.navigate('NotificationPage')}
                                >
                                    <Image
                                        //resizeMode="contain"
                                        source={require("@assets/icons/notify.png")}
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.section]}>
                            <View style={[styles.container]}>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => props.navigation.navigate('Bookings', {
                                      paramKey: token,
                                    })}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/booking-history.png")}
                                    />
                                    <Text style={[css.text]}>Bookings</Text>
                                </Pressable>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => props.navigation.navigate('Offers')}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/offer-icon.png")}
                                    />
                                    <Text style={[css.text]}>Offers</Text>
                                </Pressable>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => props.navigation.navigate('WalletPage')}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/wallet.png")}
                                    />
                                    <Text style={[css.text]}>Wallet</Text>
                                </Pressable>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => props.navigation.navigate('SettingPage')}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/settings.png")}
                                    />
                                    <Text style={[css.text]}>Settings</Text>
                                </Pressable>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => props.navigation.navigate('SupportPage')}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/Support.png")}
                                    />
                                    <Text style={[css.text]}>Support</Text>
                                </Pressable>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => toggleAddcardModal()}
                                //onPress={() => setUser(false)}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/logout.png")}
                                    />
                                    <Text style={[css.text, css.brandC, css.fsb,]}>SIGNOUT</Text>
                                </Pressable>
                            </View>
                        </View>
                        <SocialMedia />
                    </View>
                  :                    <View style={[styles.screen]}>
                        <View style={[styles.bgLiteBlue]}>
                            <View
                                style={[
                                  styles.flexRowSpace,
                                  { padding: 15, paddingTop: 10, paddingBottom: 10 },
                                ]}
                            >
                                <View style={[css.flexDRSB, css.imgFull]} >
                                    <View style={[css.flexDR]}>
                                        <View>
                                            <Image
                                                resizeMode="contain"
                                                style={[css.img50, { borderRadius: 50, marginRight: 15 }]}
                                                source={require("@assets/icons/guest-icon.png")}
                                            />
                                        </View>
                                        <Text style={[css.fbo, css.f18, css.blackC, css.alignSelfC]}>Guest</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.section]}>
                            <View style={[styles.container]}>
                                <Pressable
                                    style={[
                                      css.flexDR, css.line, styles.accountLinks,
                                    ]}
                                    onPress={() => props.navigation.navigate('SupportPage')}
                                >
                                    <Image
                                        style={[css.marginR10, css.img20]}
                                        source={require("@assets/icons/Support.png")}
                                    />
                                    <Text style={[css.text]}>Support</Text>
                                </Pressable>
                                <Pressable
                                    style={[css.flexDR, css.line10, styles.accountLinks,]}
                                    onPress={() => setLoginModal(true)}
                                >
                                    <Image
                                        style={{
                                          marginRight: 10,
                                          width: 18,
                                          height: 18,
                                          resizeMode: "contain",
                                        }}
                                        source={require("@assets/icons/signin.png")}
                                    />
                                    <Text style={[css.text]}>Login/Signup</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
                <View style={[styles.screen]}>
                    <View style={[styles.section]}>
                        <Whatsapp />
                        <View style={[css.marginT5]}><Text style={[css.f12, css.fsb, css.grayC]}>VERSION 1.8.6 Copyright HomeGenie</Text></View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.centeredView}>
                {
                    loginModal
                    && <LoginModal
                        changeData={loginModal}
                        falseData={(data) => setLoginModal(data)}
                        getEmail={(e) => setDisplayEmail(e)}
                        getName={(e) => setDisplayName(e)}
                        getPhone={(e) => setDisplayPhone(e)}
                        getToken={(e) => setToken(e)}
                        userData={(data) => setUser(data)}
                    />
                }
            </View>
            <Modal
                isVisible={addcardModal}
                animationIn='fadeIn'
                animationInTiming={700}
                animationOut='fadeOut'
                animationOutTiming={700}
                coverScreen
                useNativeDriver
                useNativeDriver
                hideModalContentWhileAnimating
            >
                <View style={css.centeredView}>
                    <View style={css.modalNewView}>
                        <View style={[css.modalNewHeader]}>
                            <View><Text style={[css.modalNewText, { fontSize: 18, color: '#525252', fontFamily: 'PoppinsSB' }]}>Logout</Text></View>
                        </View>
                        <View style={[css.modalNewBody, css.alignItemsC, css.justifyContentC]}>
                            <View><Text>Are you sure you want to Logout?</Text></View>
                            <View style={[css.flexDRSE, css.imgFull]}>
                                <Pressable
                                    onPress={() => { handleLogout() }}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, {
                                      backgroundColor: '#f4f4f4', width: '40%', height: 50, borderRadius: 10, 
                                    }]}
                                >
                                    <Text style={[css.blackC, css.fsb, css.f16]}>Yes</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => toggleAddcardModal()}
                                    style={[css.boxShadow, css.alignItemsC, css.justifyContentC, css.spaceT20, {
                                      backgroundColor: '#f6b700', width: '40%', height: 50, borderRadius: 10, 
                                    }]}
                                >
                                    <Text style={[css.whiteC, css.fsb, css.f16]}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
  );
}

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
    height: 780,
    paddingLeft: 20,
    backgroundColor: "#2eb0e4",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: "#000",
    color: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    // fontFamily: 'PoppinsSB',
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
  textCenter: {
    textAlign: 'center'
  },
  backButton: {
    marginRight: 10,
    //marginTop: 17,
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderColor: '#2eb0e4',
    borderWidth: 1,
    width: '40%',
    marginTop: 10,
    marginBottom: 15
  },
  offerCopyCodeText: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#2eb0e4',
  },
  offerBooknow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 50,
    backgroundColor: '#f6b700',
    borderColor: '#f6b700',
    borderWidth: 1,
    width: '90%',
    height: 40,
    marginTop: 10,
    marginBottom: 15,
  },
  offerBooknowText: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#fff',
  },
  //ModalCss
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
  //country picker style
  titleText: {
    color: '#000',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  pickerStyle: {
    height: 60,
    width: '30%',
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
  accountLinks: {
    borderBottomColor: "#C9C9C920",
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 5,
  },
  accountLinkText: {
    fontFamily: 'PoppinsM',
    color: '#525252',
    fontSize: 14
  }
});

export default Login;