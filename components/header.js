import { View, StatusBar, StyleSheet, Image, Dimensions, Platform, Pressable, } from 'react-native';
import React, { useState, useEffect, Fragment } from 'react';
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { connect } from "react-redux";
import css from './commonCss';
import { getCity, getPopularService, getOffers } from "../actions/hgAction";
let imgPath = '../assets/icons/';
let imgPathImage = '../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const items = [
  { id: 1, name: 'JavaScript', },
  { id: 2, name: 'Java', },
  { id: 3, name: 'Ruby', },
  { id: 4, name: 'React Native', },
  { id: 5, name: 'PHP', },
  { id: 6, name: 'Python', },
  { id: 7, name: 'Go', },
  { id: 8, name: 'Swift', },
];



const Header = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const addItem = (item) => { setSelectedItems(item) }


  const getSearchData = async () => {
    try {
      const response = await fetch('https://api.homegenie.com/api/customer/getCategorySubcategoryName');
      const json = await response.json();
      let datas = json.data;
      //console.log('datas', datas);
      let arrayData = [];
      for (obj of datas) {
        arrayData.push({
          "_id": obj._id,
          "name": obj.name
        })
        for (obj2 of obj.subcategories) {
          arrayData.push({
            "_id": obj2._id,
            "name": obj2.subCategoryName
          })
        }
      }
      //console.log('arrayData', arrayData);
      setSearchData(arrayData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getSearchData();
  }, []);

  return (
    <View style={[styles.header]}>
      {/* <StatusBar backgroundColor={'#2eb0e4'} /> */}
      <View style={styles.searchBoxFull}>
        <View style={styles.headerDropDown}>
          <RNPickerSelect
            placeholder={{}}
            items={props.data}
            onValueChange={(value) => {
              props.getPopularService(value, 'en');
              props.getOffers(value, 'en')
            }}
            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
              },
              iconContainer: {
                top: 5,
                right: 15,
              },
            }}
            // InputAccessoryView={() => null}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ color: '#525252', fontFamily: 'PoppinsM', fontSize: 11, top: 3 }}
            Icon={() => {
              return <Image style={{ width: 15, height: 15 }} source={require(imgPath + "downArrowSearch.png")} />;
            }}
            // style={
            //   Platform.OS === 'ios'
            //     ? pickerSelectStyles.inputIOS
            //     : pickerSelectStyles.inputAndroid
            // }
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 2,
                right: -5,
              },
            }}
          />
        </View>
        <View style={styles.headerSearchInput}>
          <Image source={require(imgPath + "searchIcon.png")} />
          <Fragment>
            <SearchableDropdown
              containerStyle={{ padding: 5 }}
              onTextChange={(text) => console.log(text)}
              onItemSelect={item => alert(JSON.stringify(item))}
              onItemSelect={addItem}
              items={searchData}
              defaultIndex={1}
              textInputStyle={{ color: '#525252', fontFamily: 'PoppinsM', fontSize: 11, textTransform: 'uppercase', }}
              itemStyle={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#d1d1d1',
                backgroundColor: '#fff',
              }}
              itemTextStyle={{ color: '#525252', fontFamily: 'PoppinsM', fontSize: 11, }}
              itemsContainerStyle={{ maxHeight: 220, position: 'absolute', width: 180, top: 52, left: -35, zIndex: 99, }}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "SEARCH FOR ANY SERVICE",
                  underlineColorAndroid: "transparent",
                  style: {
                    height: 40,
                    borderWidth: 0,
                    width: '100%',
                    fontSize: 11,
                    fontFamily: 'PoppinsM',
                    color: '#bababa',
                    zIndex: 2,
                    paddingLeft: 2,
                  },
                  //onTextChange: text => console.log(text)
                }
              }
            >
            </SearchableDropdown>
          </Fragment>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    backgroundColor: "#2eb0e4",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: 'PoppinsM',
  },
  searchBoxFull: {
    backgroundColor: "#fff",
    width: "90%",
    height: 40,
    padding: 10,
    borderRadius: 30,
    flexDirection: "row",
  },
  headerDropDown: {
    width: "25%",
    paddingLeft: 5,
  },
  headerDropdownPicker: {
    borderColor: "rgba(158, 150, 150, .0)",
    //width: "100%",
    borderRadius: 30,
  },
  headerSearchInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "75%",
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    padding: 10,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "#525252",
    width: "100%",
    paddingRight: 0,
    fontFamily: 'PoppinsR',
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: "#525252",
    width: "100%",
    fontFamily: 'PoppinsR',
    paddingRight: 0,
  },
});

const mapStateToProps = (state) => ({
  hg: state.hg,
  error: state.error
})

export default connect(mapStateToProps, { getOffers, getPopularService, getCity })(Header);