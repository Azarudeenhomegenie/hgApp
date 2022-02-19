import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

const HeaderTitle = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>My Accounts</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 120,
        paddingTop: 36,
        backgroundColor: '#2eb0e4',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#52006A',
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    },
    searchBoxFull: {
        backgroundColor: '#fff',
        width: '90%',
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
    },
    headerDropDown: {
        width: '35%',
        paddingLeft: 10
    },
    headerDropdownPicker: {
        borderColor: 'rgba(158, 150, 150, .0)',
        width: '100%',
        borderRadius: 30,
    },
    // searchIcon: {
    //     justifyContent: 'center', //Centered horizontally
    //     alignItems: 'center', //Centered vertically
    //     flex:1
    // },
    headerSearchInput: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '65%',
    },
    SearchInputIcon: {
        marginRight: 10,
        //flex: 1,
        //width: 30,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default HeaderTitle;