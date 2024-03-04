import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { PRIMARY_COLOR } from '../../styles/color.global'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'

const Header = ({ title, navigation }) => {

    const handleGoBack = () => {

        navigation.goBack()
    }

    return (
        <View style={[tw`w-full px-[20px] flex-row h-[50px] items-center mt-[${StatusBar.currentHeight}px]`, { backgroundColor: PRIMARY_COLOR }]}>
            {
                navigation &&
                <TouchableOpacity onPress={handleGoBack}>
                    <IconFontAwesome
                        name="arrow-left"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            }
            <Text style={tw`font-bold flex-1 text-center text-white text-[16px]`}>{title}</Text>
        </View>
    )
}

export default Header