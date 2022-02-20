import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CountryPicker from 'rn-country-picker';
import color from '@constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    width: '90%'
  },
  input: {
    borderColor: color.grey,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 10,
    height: 50,
    paddingLeft: '33%',
    fontFamily: 'PoppinsR'
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontFamily: 'PoppinsM',
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: color.darkgrey,
  },
  pickerStyle: {
    height: 50,
    fontSize: 10,
    width: '32%',
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderRadius: 0,
    borderColor: color.grey,
    position: 'absolute',
    backgroundColor: color.transparent,
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
    color: color.darkgrey,
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'PoppinsR',
    color: color.darkgrey,
    textAlign: 'right',
  }
});

const PhoneInput = (props) => {
  const { onChange, placeholder, prefix } = props;
  const defaultPlaceholder = placeholder || 'Enter Mobile number';
  const [countryPrefix, setCountryPrefix] = useState(prefix || null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    console.log('BINGO: ', phone);
    onChange(phone, countryPrefix);
  }, [phone, countryPrefix, onChange]);

  return (
    <View style={styles.wrapper}>
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
        style={styles.input}
        placeholder={defaultPlaceholder}
        placeholderTextColor={color.black}
        keyboardType="numeric"
        onChange={(text) => setPhone(text.nativeEvent.text)}
      />
    </View>
  );
};

export default PhoneInput;
