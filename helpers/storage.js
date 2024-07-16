import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (valueName, value) => {
    try {
        await AsyncStorage.setItem(valueName, value);
    } catch (e) {
        console.log('storeData error: ', e)
    }
};

export const removeAsyncStorageData = async (valueName) => {
    try {
        await AsyncStorage.removeItem(valueName);
    } catch (e) {
        console.log('removeAsyncStorageData error: ', e)
    }
};

export const getAsyncStorageData = async (valueName) => {
    try {
        const value = await AsyncStorage.getItem(valueName);
        if (value !== null) {
            return value
        }
    } catch (e) {
        console.log('getData error: ', e)
    }
};