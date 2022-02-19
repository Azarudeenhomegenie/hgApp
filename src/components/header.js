import { View, StatusBar, StyleSheet, Image, Dimensions, Platform, Pressable, Feather } from 'react-native';
import React, { useState, useEffect, Fragment, useRef, useCallback } from 'react';
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { connect, useDispatch, useSelector } from "react-redux";
import css from './commonCss';
import { getCity, getPopularServices, getOffers } from "../redux/reducers/appSlice";
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';
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
  //const addItem = (item) => { setSelectedItems(item) }
  //   onPress={() => navigation.navigate("JobdetailPage", {
  //     token: token, jobId: item._id
  // })}
  const addItem = (item) => {
    console.log(props.navigation)
    props.navigation.navigate("MyBookingPage", item)
  }


  const [loading, setSearchLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)
  const searchRef = useRef(null)

  const getSuggestions = useCallback(async (q) => {
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setSearchLoading(true)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const items = await response.json()
    const suggestions = items.map((item) => ({
      id: item.id,
      title: item.title
    }))
    setSuggestionsList(suggestions)
    setSearchLoading(false)
  }, [])


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
          {props.data && <RNPickerSelect
            placeholder={{}}
            items={props.data}
            onValueChange={(value) => {
              getPopularServices(value, 'en');
              getOffers(value, 'en')
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
              return <Image style={{ width: 15, height: 15 }} source={require("@assets/icons/downArrowSearch.png")} />;
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
          />}
        </View>
        <View style={styles.headerSearchInput}>
          <Image source={require("@assets/icons/searchIcon.png")} />
          <Fragment>
            <SearchableDropdown
              containerStyle={{ padding: 5 }}
              onTextChange={(text) => console.log(text)}
              onItemSelect={item => alert(JSON.stringify(item))}
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
          {/* <AutocompleteDropdown
            ref={searchRef}
            controller={(controller) => {
              dropdownController.current = controller
            }}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={(item) => {
              item && setSelectedItem(item.id)
            }}
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
            // onClear={onClearPress}
            //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
            // onOpenSuggestionsList={onOpenSuggestionsList}
            loading={loading}
            useFilter={false} // prevent rerender twice
            textInputProps={{
              placeholder: "Type 3+ letters",
              autoCorrect: false,
              autoCapitalize: "none",
              style: {
                borderRadius: 25,
                backgroundColor: "#fff",
                color: "#fff",
                paddingLeft: 18
              }
            }}
            rightButtonsContainerStyle={{
              borderRadius: 25,
              right: 8,
              height: 30,
              top: 10,
              alignSelfs: "center",
              backgroundColor: "#383b42"
            }}
            inputContainerStyle={{
              backgroundColor: "transparent"
            }}
            suggestionsListContainerStyle={{
              backgroundColor: "#383b42"
            }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => (
              <Text style={{ color: "#fff", padding: 15 }}>{item.title}</Text>
            )}
            ChevronIconComponent={
              <Feather name="x-circle" size={18} color="#fff" />
            }
            ClearIconComponent={
              <Feather name="chevron-down" size={20} color="#fff" />
            }
            inputHeight={50}
            showChevron={false}
          //  showClear={false}
          /> */}
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


export default Header;
