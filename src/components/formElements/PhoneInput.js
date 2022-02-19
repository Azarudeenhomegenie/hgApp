/* eslint-disable react-native/no-color-literals */
import { StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import CountryPicker from 'rn-country-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const inputStyle = {
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  width: '100%',
  padding: 10,
  height: 60,
  paddingLeft: '33%',
  fontFamily: 'PoppinsR',
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
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
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontFamily: 'PoppinsM',
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#525252',
  },
  pickerStyle: {
    height: 60,
    fontSize: 10,
    width: '32%',
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderRadius: 0,
    borderColor: '#ccc',
    // backgroundColor: 'white',
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    zIndex: 4,
    fontFamily: 'PoppinsR'
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 12,
    fontFamily: 'PoppinsR',
    color: '#525252',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'PoppinsR',
    color: '#525252',
    textAlign: 'right',
  }
});

function PhoneInput(props) {
  const { onChange, placeholder, prefix } = props;
  const defaultPlaceholder = placeholder || 'Enter Mobile number';
  const [countryPrefix, setCountryPrefix] = useState(prefix || null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    console.log('BINGO: ', phone)
    onChange(phone, countryPrefix);
  }, [phone, countryPrefix, onChange]);

  return (
    <SafeAreaView>
      <CountryPicker
        disable={false}
        animationType="fade"
        containerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle="Country Picker"
        searchBarPlaceHolder="Search......"
        hideCountryFlag={false}
        hideCountryCode={false}
        searchBarStyle={styles.searchBarStyle}
        countryCode={countryPrefix}
        selectedValue={(index) => setCountryPrefix(index)}
      />
      <TextInput
        style={inputStyle}
        placeholder={defaultPlaceholder}
        keyboardType="numeric"
        onChange={setPhone}
      />
    </SafeAreaView>
  );
}

export default PhoneInput;
