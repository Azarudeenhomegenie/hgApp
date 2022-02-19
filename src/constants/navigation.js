import color from './colors';

export const ROUTE_HOME = 'Home';
export const ROUTE_BOOKINGS = 'Bookings';
export const ROUTE_GETGENIE = 'GetgenieScreen';
export const ROUTE_OFFERS = 'Offers';
export const ROUTE_USER = 'Account';

export const NAVIGATION_ICONS = {
  [ROUTE_HOME]: require('@assets/icons/homeIcon.png'),
  [ROUTE_BOOKINGS]: require('@assets/icons/bookings.png'),
  [ROUTE_GETGENIE]: require('@assets/icons/genieNavbar.png'),
  [ROUTE_OFFERS]: require('@assets/icons/offers-menu.png'),
  [ROUTE_USER]: require('@assets/icons/userInfo.png'),
};

export const NAVIGATION_ICONS_STYLE = {
  [ROUTE_HOME]: {
    borderColor: color.grey,
    borderRightWidth: 1
  },
  [ROUTE_GETGENIE]: {
    width: 70,
    height: 70,
    marginTop: -15
  },
  [ROUTE_BOOKINGS]: {},
  [ROUTE_OFFERS]: {},
  [ROUTE_USER]: {}
};
