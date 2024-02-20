import AsyncStorage from '@react-native-async-storage/async-storage'

export const getData = async (key) => {

    let data = await AsyncStorage.getItem(key)

    data = JSON.parse(data)

    return data
}

export const setData = (key, value) => {

    AsyncStorage.setItem(key, JSON.stringify(value))
}
