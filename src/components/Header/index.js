import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { PRIMARY_COLOR } from '../../styles/color.global'

const Header = ({ title }) => {
    return (
        <View style={[tw`w-full h-[50px] items-center justify-center mt-[${StatusBar.currentHeight}px]`, { backgroundColor: PRIMARY_COLOR }]}>
            <Text style={tw`font-bold text-white text-[16px]`}>{title}</Text>
        </View>
    )
}

export default Header