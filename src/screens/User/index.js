import { useSelector } from 'react-redux';
import React from 'react';
import Account from './Account';
import Auth from './Auth';

import { getLoggedInStatus } from '../../redux/reducers/userSlice';

function User() {
  const isLoggedIn = useSelector(getLoggedInStatus);
  return isLoggedIn ? <Account /> : <Auth />;
}

export default User;
