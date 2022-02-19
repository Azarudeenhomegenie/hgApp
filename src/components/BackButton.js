/* eslint-disable global-require */

import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 10,
    justifyContent: 'center',
  }
});

function BackButton(props) {
  const { handleClick } = props;
  return (
    <Pressable
      style={[styles.button, styles.buttonStyle]}
      onPress={() => handleClick()}
    >
      <Image source={require('@assets/icons/backArrowBlack.png')} />
    </Pressable>
  );
}

export default BackButton;
