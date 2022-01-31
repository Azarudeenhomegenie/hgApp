import { View, StatusBar, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from "react-native-picker-select";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { connect } from "react-redux";
import { getCity, getPopularService, getOffers } from "../actions/hgAction";

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];

const Header = (props) => {
  const [selectedValues, setSelectedValues] = useState([]);
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={'#2eb0e4'} />
      <View style={styles.searchBoxFull}>
        <View style={styles.headerDropDown}>
          <RNPickerSelect
            placeholder={{}}
            items={props.data}
            onValueChange={(value) => {
              props.getPopularService(value, 'en');
              props.getOffers(value, 'en')
            }}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.headerSearchInput}>
          <Image
            source={require("../assets/icons/searchIcon.png")}
            style={styles.alignCenter}
            style={[styles.alignCenter, styles.SearchInputIcon]}
          />
          <SearchableDropdown
            onItemSelect={(item) => {
              console.log(item)
              setSelectedValues(item)
            }}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 10,
              backgroundColor: '#fff',
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 250, position: 'absolute', width: 200, top: 52, left: -35, zIndex: 99 }}
            items={items}
            defaultIndex={0}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Search..",
                underlineColorAndroid: "transparent",
                style: {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  height: 40,
                  borderWidth: 0,
                  width: '100%',
                },
                onTextChange: text => console.log(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  html: {
    fontFamily: 'lucida grande',
    fontSize: 11,
    color: '#141823',
  },
  header: {
    width: "100%",
    height: 90,
    backgroundColor: "#2eb0e4",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: "#000",
    // fontFamily: 'PoppinsM',
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    // fontFamily: 'PoppinsM',
  },
  searchBoxFull: {
    backgroundColor: "#fff",
    width: "90%",
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    // fontFamily: 'PoppinsM',
  },
  headerDropDown: {
    width: "40%",
    paddingLeft: 10,
    // fontFamily: 'PoppinsM',
  },
  headerDropdownPicker: {
    borderColor: "rgba(158, 150, 150, .0)",
    width: "100%",
    borderRadius: 30,
    // fontFamily: 'PoppinsM',
  },
  headerSearchInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "60%",
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    padding: 10,
    // fontFamily: 'PoppinsM'
  },
  SearchInputIcon: {
    marginRight: 10,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    //borderWidth: 1,
    //borderColor: "gray",
    //borderRadius: 4,
    color: "black",
    width: "100%",
    paddingRight: 0, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: "purple",
    // borderRadius: 8,
    color: "black",
    width: "100%",
    paddingRight: 0, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = (state) => ({
  hg: state.hg,
  error: state.error
})

export default connect(mapStateToProps, { getOffers, getPopularService, getCity })(Header);