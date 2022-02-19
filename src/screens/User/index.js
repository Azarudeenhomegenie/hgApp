import { useSelector } from 'react-redux';
import React from 'react';
// import { Text, View } from 'react-native';
import Account from './Account';
import Auth from './Auth';

import { getLoggedInStatus } from '../../redux/reducers/userSlice';

const User = () => {
  const isLoggedIn = useSelector(getLoggedInStatus);
  return isLoggedIn ? <Account /> : <Auth />;
};

export default User;
