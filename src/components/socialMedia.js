import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Linking,
  Button,
  TouchableOpacity,
} from "react-native";
import Text from "./MyText";
import css from './commonCss';
const SocialMedia = (props) => {
  return (
    <View style={styles.socialMedia}>
      <Text style={[css.textCenter, css.fm, css.f14, css.blackC, css.marginB10]}>
        Follow us on social media
      </Text>
      <View style={[css.flexDR, css.justifyContentC]} >
        <View style={[styles.flexRowSpace, { width: "60%" }]}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/homegenieuae/")
            }
          >
            <Image
              style={[styles.socialImages]}
              source={require("@assets/icons/fb.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com/homegenie_me")}
          >
            <Image source={require("@assets/icons/twitter.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/homegenie_uae/")
            }
          >
            <Image source={require("@assets/icons/Instagram.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/c/HomeGenie_Home_Maintenance_In_Dubai"
              )
            }
          >
            <Image source={require("@assets/icons/youtube.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  flexRowSpace: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textCenter: {
    textAlign: "center",
  },
});

export default SocialMedia;
