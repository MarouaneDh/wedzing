import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (valueName, value) => {
    try {
        await AsyncStorage.setItem(valueName, value);
    } catch (e) {
        console.log('storeData error: ', e)
    }
};

export const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch (e) {
        console.log('getAllKeys error: ', e)
    }

    console.log(keys)
}

export const removeAsyncStorageData = async () => {
    try {
        await AsyncStorage.clear().then((e) => {
            console.log(e)
        });
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