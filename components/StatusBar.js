import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Linking,
    Button,
    TouchableOpacity,
    StatusBar
} from "react-native";

const StatusBarAll = (props) => {
    return (
        <StatusBar animated={true}
            backgroundColor="#2eb0e4"
            barStyle='dark-content'
            showHideTransition='fade'
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
            style="dark"
        />
    );
};

export default StatusBarAll;
