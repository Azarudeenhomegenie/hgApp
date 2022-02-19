import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'native-base';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Whatsapp from '@components/whtsApp';
import Text from '@components/MyText';
import css from '@components/commonCss';
import color from '@constants/colors';
import LoginModal from '@components/modals/login';
import OtpModal from '@components/modals/otp';
import { AUTH_MODEL_LOGIN, AUTH_MODEL_OTP } from '../../constants/modalTypes';
import { IMAGE_PATH } from '../../constants/app';

const AuthHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={css.header}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={[styles.textWhite, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Image resizeMode="contain" source={require('@assets/icons/backArrow.png')} />
        </TouchableOpacity>
        <Text style={[css.headerTitle, css.alignSelfC]}>My Accounts</Text>
      </View>
    </View>
  );
};

const Auth = () => {
  const [activeModel, setActiveModal] = useState(null);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <AuthHeader />
        {/* BODY */}
        <View style={styles.screen}>
          <View style={styles.bgThinBlue}>
            <View style={[styles.flexRowSpace, styles.customPadding]}>
              <View style={[css.flexDRSB, css.imgFull]} >
                <View style={css.flexDR}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={[css.img50, styles.guestIcon]}
                      source={require('@assets/icons/guest-icon.png')}
                    />
                  </View>
                  <Text style={styles.guestLabel}>Guest</Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.container}>
                <Pressable
                  style={[css.flexDR, css.line, styles.accountLinks]}
                  onPress={() => navigation.navigate('SupportPage')}
                >
                  <Image
                    style={[css.marginR10, css.img20]}
                    source={require('@assets/icons/Support.png')}
                  />
                  <Text style={css.text}>Support</Text>
                </Pressable>
                <Pressable
                  style={[css.flexDR, css.line10, styles.accountLinks]}
                  onPress={() => setActiveModal()}
                >
                  <Image style={styles.signinImage} source={require('@assets/icons/signin.png')} />
                  <Text style={css.text}>Login/Signup</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/*   FOOTER  */}
        <View style={styles.screen}>
          <View style={styles.section}>
            <Whatsapp />
            <View style={css.marginT5}>
              <Text style={styles.copyRight}>
                VERSION 1.8.6 Copyright HomeGenie
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.centeredView}>
        <LoginModal isVisible={activeModel === AUTH_MODEL_LOGIN} />
        <OtpModal isVisible={activeModel === AUTH_MODEL_OTP} />
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.white
  },
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
  flexRow: {
    flexDirection: 'row',
  },
  flexRowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWhite: {
    color: color.white,
  },
  signinImage: {
    marginRight: 10,
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  copyRight: {
    ...css.f12,
    ...css.fsb,
    ...css.grayC
  }
  ,
  bgThinBlue: {
    backgroundColor: color.thinblue
  },
  customPadding: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  guestIcon: {
    borderRadius: 50,
    marginRight: 15
  },
  guestLabel: {
    ...css.fbo,
    ...css.f18,
    ...css.blackC,
    ...css.alignSelfC
  },
  accountLinks: {
    borderBottomColor: color.transparentGrey,
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
