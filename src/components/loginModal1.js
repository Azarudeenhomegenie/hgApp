import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Alert,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import CountryPicker from 'rn-country-picker';
import OtpInput from './formElements/OtpInput';
import PhoneInput from './formElements/PhoneInput';
import Text from './MyText';
import css from './commonCss';

import { sendOTP, verifyOTP, register } from '../redux/reducers/userSlice';

function LoginModal(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [nameCheck, setNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [phoneNo, setPhoneNo] = useState(null);
  const [otp, setOtp] = useState(null);
  const [countryPrefix, setCountryPrefix] = useState('971');



    const handleOtpVerification = async () => {
        console.log('verifying otp');
        let otpData = String(OtpCodeOne) + String(OtpCodeTwo) + String(OtpCodeThree) + String(OtpCodeFour);
        const data = {
            deviceType: "WEBSITE",
            deviceToken: "151",
            phoneNo: phone,
            countryCode: countryPlus + countryCodeNew,
            timezone: "Asia/Calcutta",
            latitude: "17.3753",
            longitude: "78.4744",
            OTPCode: otpData
        };
        //const otpfailed = await dispatch(VERIFY_OTP_FAIL())
        const resp = await dispatch(verifyOTP(data));
        console.log(resp);
        setOtpModal(false)
        setUser('in')
        props.userData(true)
        setOtpCodeOne(null);
        setOtpCodeTwo(null);
        setOtpCodeThree(null);
        setOtpCodeFour(null);
        setDisplayEmail(resp.userDetails.email);
        setDisplayName(resp.userDetails.name);
        props.falseData(false)
        console.log('accessToken', resp.accessToken);
    };

  const getCountryPrefix = () => {
    return `+${countryPrefix}`;
  };

  const handleLogin = async () => {
    const data = await dispatch(sendOTP({ phoneNo, countryCode: getCountryPrefix() }));
    if (data.isRegistered) {
      setOtpModal(true);
    } else {
      setRegisterModal(true);
    }
  };

  const handleOtpVerification = async () => {
    console.log('verifying otp');

    const otp = `${OtpCodeOne}${OtpCodeTwo}${OtpCodeThree}${OtpCodeFour}`;
    const otpData = {
      deviceType: 'WEBSITE',
      deviceToken: '151',
      phoneNo: phone,
      countryCode: getCountryPrefix(),
      timezone: 'Asia/Calcutta',
      latitude: '17.3753',
      longitude: '78.4744',
      OTPCode: otp
    };

    const data = await dispatch(verifyOTP(otpData));
    setOtpModal(false);
    setUser('in');
    resetForm();
    // setDisplayEmail(resp.userDetails.email);
    // setDisplayName(resp.userDetails.name);
  };

  const resetForm = () => {
    setOtpCodeOne(null);
    setOtpCodeTwo(null);
    setOtpCodeThree(null);
    setOtpCodeFour(null);
  };

  const signup = async () => {
    if (userName == null) {
      setNameCheck(true);
    } if (email == null) {
      setEmailCheck(true);
    } else {
      setNameCheck(false);
      setEmailCheck(false);
      const params = new FormData();
      params.append('name', userName);
      params.append('email', email);
      params.append('phoneNo', phone);
      params.append('countryCode', getCountryPrefix());
      params.append('deviceType', 'WEBSITE');
      params.append('appVersion', '100');
      params.append('timezone', 'Asia/Calcutta');
      params.append('country', 'Dubai');
      params.append('latitude', '17.3753');
      params.append('longitude', '78.4744');
      params.append('deviceToken', '151');

      const data = await dispatch(register(params));
      if (data === 'Success') {
        setRegisterModal(false);
        setOtpModal(true);
      } else {
        console.log('User Already Exist !!!');
      }
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        isVisible={props.changeData}
        hasBackdrop
      >
        <View>
          <View style={[styles.modalView], { padding: 15 }}>
            <View style={[styles.signupModalContainer], { borderRadius: 10, backgroundColor: '#fff' }}>
              <View style={[styles.modalHeader], {
                backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20
              }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => props.falseData(false)}
                >
                  <Image
                                        // resizeMode="contain"
                                        // style={{ width: 20, height: 20 }}
                    source={require('@assets/icons/backArrowBlack.png')}
                  />
                </Pressable>
                <Text
                  style={[
                    css.fm,
                    css.f18,
                    css.blackC,
                    css.marginT20,
                    css.textCenter
                  ]}
                >
                  Login/Signup to HomeGenie
                </Text>
                <Text
                  style={[
                    css.fm,
                    css.f14,
                    css.greyC,
                    css.marginT5,
                    css.textCenter
                  ]}
                >
                  Login/Signup to access your stored addressess and service booking details.
                </Text>
              </View>
              <View style={{ alignItems: 'center', padding: 20 }, [styles.modalBody]}>
                <View style={[styles.flexRow, css.alignItemsC, { width: '90%' }]}>
                  <PhoneInput prefix={countryPrefix} onChange={onPhoneInputChange} />
                </View>
                <Pressable
                  style={styles.offerBooknow}
                  onPress={() => handleLogin()}
                >
                  <Text style={[styles.textStyle, styles.offerBooknowText]}>Login/Signup</Text>
                </Pressable>

              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        isVisible={registerModal}
        hasBackdrop
      >
        <View>
          <View style={[styles.modalView], { padding: 15 }}>
            <View style={[styles.signupModalContainer], { borderRadius: 10, backgroundColor: '#fff' }}>
              <View style={[styles.modalHeader], {
                backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20
              }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setRegisterModal(!registerModal)}
                >
                  <Image source={require('@assets/icons/backArrowBlack.png')} />
                </Pressable>
                <Text
                  style={[
                    css.fm,
                    css.f18,
                    css.blackC,
                    css.marginT20,
                    css.textCenter
                  ]}
                >
                  SIGNUP
                </Text>
                <Text
                  style={[
                    css.fm,
                    css.f14,
                    css.greyC,
                    css.marginT5,
                    css.textCenter
                  ]}
                >
                  Signup and enjoy all the features including our amazing offers.
                </Text>
              </View>
              <View style={[styles.modalBody], { alignItems: 'center', padding: 20 }}>
                <TextInput
                  style={styles.input}
                  id="Name"
                  placeholder="Name"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorMessage="please enter your name."
                  onChange={(text) => setUserName(text.nativeEvent.text)}
                  value={userName}
                />
                {nameCheck && <Text style={css.errorText}>Please enter your name</Text>}
                <TextInput
                  style={styles.input}
                  id="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  required
                  autoCapitalize="none"
                  errorMessage="please enter your email-id."
                  onChange={(text) => setEmail(text.nativeEvent.text)}
                  value={email}
                />
                {emailCheck && <Text style={css.errorText}>Please enter your Email</Text>}
                <Pressable
                  style={styles.offerBooknow}
                  onPress={() => signup()}
                >
                  <Text style={styles.offerBooknowText}>SIGNUP</Text>
                </Pressable>
              </View>
              <View style={[styles.modalFooter], {
                backgroundColor: '#F4F4F4', padding: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              >
                <Pressable
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}
                  onPress={() => { setRegisterModal(!registerModal); }}
                >
                  <Text style={[css.text, css.textCenter, { color: '#7e7e7e', fontSize: 12 }]}>
                    <Text>Already have an account?</Text>
                    <Text style={[css.brandC, css.fm, css.f12]}>Login</Text>
                  </Text>

                </Pressable>
              </View>

            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        isVisible={otpModal}
        hasBackdrop
      >
        <View>
          <View style={[styles.modalView], { padding: 15 }}>
            <View style={[styles.signupModalContainer], { borderRadius: 10, backgroundColor: '#fff' }}>
              <View style={[styles.modalHeader], {
                backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20
              }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setOtpModal(!otpModal)}
                >
                  <Image
                                        // resizeMode="contain"
                                        // style={{ width: 20, height: 20 }}
                    source={require('@assets/icons/backArrowBlack.png')}
                  />
                </Pressable>
                <Text style={[css.fm, css.f18, css.blackC, css.marginT20, css.textCenter]}>ONE TIME PASSCODE (OTP)</Text>
                <Text style={[css.fm, css.f14, css.greyC, css.marginT5, css.textCenter]}>Please enter 4 digit code sent via SMS</Text>
              </View>
              <View style={[styles.modalBody], { alignItems: 'center', padding: 20 }}>
                <View style={styles.flexRow}>
                  <TextInput
                    style={{
                      borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center'
                    }}
                    placeholder=""
                    keyboardType="numeric"
                    value={OtpCodeOne}
                    maxLength={1}
                    onChange={(text) => {
                      setOtpCodeOne(text.nativeEvent.text);
                      secondOtp.current.focus();
                    }}
                  />
                  <TextInput
                    style={{
                      borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center'
                    }}
                    placeholder=""
                    keyboardType="numeric"
                    value={OtpCodeTwo}
                    maxLength={1}
                    onChange={(text) => {
                      setOtpCodeTwo(text.nativeEvent.text);
                      thirdOtp.current.focus();
                    }}
                    ref={secondOtp}
                  />
                  <TextInput
                    style={{
                      borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center'
                    }}
                    placeholder=""
                    keyboardType="numeric"
                    value={OtpCodeThree}
                    maxLength={1}
                    onChange={(text) => {
                      setOtpCodeThree(text.nativeEvent.text);
                      fourthOtp.current.focus();
                    }}
                    ref={thirdOtp}
                  />
                  <TextInput
                    style={{
                      borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '15%', padding: 10, marginRight: 10, textAlign: 'center'
                    }}
                    placeholder=""
                    keyboardType="numeric"
                    value={OtpCodeFour}
                    maxLength={1}
                    onChange={(text) => setOtpCodeFour(text.nativeEvent.text)}
                    ref={fourthOtp}
                  />
                </View>

                <Pressable
                  style={styles.offerBooknow}
                                    // onPress={() => onSubmitLogin()}
                  onPress={() => handleOtpVerification()}
                >
                  <Text style={[styles.textStyle, styles.offerBooknowText]}>CONFIRM</Text>
                </Pressable>
                {/* <Text style={{ color: 'green' }}>{otpSend ? 'OTP Sent' : 'OTP Sent Again'}</Text> */}
                <Text style={[css.fm, css.f14, { color: 'green' }]}>{otpSend ? 'OTP Sent' : 'OTP Sent Again'}</Text>
              </View>
              <View style={[styles.modalFooter], { paddingBottom: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Pressable
                  style={styles.brand}
                  onPress={() => ResetOtpApi()}
                >
                  <Text style={[css.fm, css.f14, css.brandC, css.textCenter]}>Resend OTP</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>

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
    width: '100%',
    height: 70,
    paddingLeft: 20,
    backgroundColor: '#2eb0e4',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    color: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    // fontFamily: 'PoppinsSB',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWhite: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center'
  },
  backButton: {
    marginRight: 10,
    justifyContent: 'center',
  },
  bgLiteBlue: {
    backgroundColor: '#eff7fc',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
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
    marginTop: 20,
    marginBottom: 15,
  },
  offerBooknowText: {
    fontSize: 14,
    fontFamily: 'PoppinsM',
    color: '#fff',
  },
  // ModalCss
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
    textAlign: 'center'
  },
  modalContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // country picker style
  titleText: {
    color: '#525252',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  
  

  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    height: 40,
    marginTop: 20,
    padding: 5,
    fontFamily: 'PoppinsM',
    fontSize: 14,
    color: '#525252'
  },
});

export default LoginModal;
