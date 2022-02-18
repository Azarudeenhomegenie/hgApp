import * as SecureStore from 'expo-secure-store';

const USER_STATE = 'user';

export const setItem = async (key, value) => {
  const val = typeof value !== 'string' ? JSON.stringify(value) : value;
  await SecureStore.setItemAsync(key, val);
};

export const getItem = async (key) => {
  const result = await SecureStore.getItemAsync(key);
  return result || null;
};

export const removeItem = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export const loadState = async () => {
  try {
    const serializedState = await getItem(USER_STATE);
    if (serializedState === null) {
      return undefined;
    }
    console.log('Loading State:', serializedState);
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    setItem(USER_STATE, serializedState);
    console.log('Saving State:', serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const resetStorage = async () => {
  await removeItem(USER_STATE);
};
