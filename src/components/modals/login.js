import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  Pressable
} from 'react-native';
import Modal from 'react-native-modal';
import PhoneInput from '../formElements/PhoneInput';
import Text from '../MyText';
import css from '../commonCss';

import { sendOTP } from '../../redux/reducers/userSlice';
import color from '@constants/colors';
import BackButton from '../BackButton';
import { AUTH_MODEL_OTP, AUTH_MODEL_REGISTER } from '../../constants/modalTypes';

function LoginModal(props) {
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
      <View>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <BackButton handleClick={() => setActiveModal(null)} />
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
      </View>
    </Modal>
  );
}

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
    width: '90%',
    height: 40,
    marginTop: 20,
    marginBottom: 15,
  },
  offerBooknowText: {
    fontSize: 14,
    fontFamily: 'PoppinsM',
    color: color.white,
  },

  // New,
  modalHeading: {
    ...css.fm,
    ...css.f18,
    ...css.blackC,
    ...css.marginT20,
    ...css.textCenter
  },
  modalSubHeading: {
    ...css.fm,
    ...css.f14,
    ...css.greyC,
    ...css.marginT5,
    ...css.textCenter
  },
  modal: {
    padding: 15,
    margin: 20,
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
  modalHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    width: '100%',
    height: 70,
    paddingLeft: 20,
    backgroundColor: color.lightblue,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: color.black,
    color: color.white,
  },
  modalBody: {
    alignItems: 'center',
    padding: 20,
  }
});

export default LoginModal;
