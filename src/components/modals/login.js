import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  Pressable
} from 'react-native';
import Modal from 'react-native-modal';
import PhoneInput from '@components/formElements/PhoneInput';
import Text from '@components/MyText';
import css from '@components/commonCss';
import color from '@constants/colors';
import BackButton from '@components/BackButton';
import { AUTH_MODEL_OTP, AUTH_MODEL_REGISTER } from '@constants/modalTypes';
import { sendOTP } from '../../redux/reducers/userSlice';

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const { isVisible, setActiveModal } = props;
  const [countryPrefix, setCountryPrefix] = useState('971');
  const [phoneNo, setPhoneNo] = useState();

  const getCountryPrefix = () => {
    return `+${countryPrefix}`;
  };

  const handleLogin = async () => {
    const data = await dispatch(sendOTP({ phoneNo, countryCode: getCountryPrefix() }));
    if (data.isRegistered) {
      setActiveModal(AUTH_MODEL_OTP);
    } else {
      setActiveModal(AUTH_MODEL_REGISTER);
    }
  };

  const onPhoneInputChange = (phone, prefix) => {
    setCountryPrefix(prefix);
    setPhoneNo(phone);
  };

  return (
    <Modal
      animationType="fade"
      isVisible={isVisible}
      hasBackdrop
    >

      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalHeader, styles.customHeader]}>
            <BackButton style={styles.backButton} handleClick={() => setActiveModal(null)} />
            <Text style={styles.modalHeading}>
              Login/Signup to HomeGenie
            </Text>
            <Text style={styles.modalSubHeading}>
              Login/Signup to access your stored addressess and service booking details.
            </Text>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.flexRow}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  offerBooknow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 50,
    backgroundColor: color.yellow,
    borderColor: color.yellow,
    borderWidth: 1,
    width: '100%',
    height: 40,
    marginTop: 20,
    marginBottom: 15,
  },
  offerBooknowText: {
    fontSize: 14,
    fontFamily: 'PoppinsM',
    color: color.white,
    width: '100%'
  },

  // New,
  modalHeading: {
    ...css.fm,
    ...css.f18,
    ...css.blackC,
    ...css.marginT20,
    ...css.textCenter,
  },
  modalSubHeading: {
    ...css.fm,
    ...css.f14,
    ...css.greyC,
    ...css.marginT5,
    ...css.textCenter,
    paddingHorizontal: 20
  },
  modal: {
    padding: 0,
    margin: 0,
    backgroundColor: color.white,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  modalContainer: {
    borderRadius: 10,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customHeader: {
    backgroundColor: color.lightgrey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    // paddingVertical: 20,
    width: '100%'
  },
  modalBody: {
    alignItems: 'center',
    paddingVertical: 20,
    // backgroundColor: color.grey,
    display: 'flex',
    width: '100%'
  }
});

export default LoginModal;
