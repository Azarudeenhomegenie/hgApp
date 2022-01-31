import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

export default function autoNav(props) {
  useEffect(()=>{
      props.navigation.navigate("GetgeniePage")
  },[])
  return (
    <View>
      
    </View>
  );
}
