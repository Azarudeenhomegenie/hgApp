import * as SecureStore from 'expo-secure-store';


export const setItem = async(key, value) => {
    const val = typeof value !== 'string' ? JSON.stringify(value) : value; 
    await SecureStore.setItemAsync(key, val);
};

export const getItem = async(key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result && key === 'user') {
        try {
            return JSON.parse(result);
        } catch(e) {
            console.log(e);
            return null;
        }
    }
    return result || null;
};

export const removeItem = async(key) => {
    await SecureStore.deleteItemAsync(key);
    console.log('Deleting key: ', key);
};