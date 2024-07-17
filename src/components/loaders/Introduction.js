import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import LottieView from 'lottie-react-native'
import { PRIMARY_COLOR, YELLOW_COLOR } from '../../styles/color.global'

const Introduction = () => {
    const imgLogo = require('../../assets/images/logos/TA.png')
    return (
        <View style={tw`flex-1`}>
            <View
                style={[
                    tw`w-full h-[60%] items-center`,
                    { backgroundColor: 'rgb(45, 50, 80)' },
                ]}>
                <LottieView
                    source={require('../../assets/jsons/loginRegister.json')}
                    autoPlay={true}
                    loop
                    style={{ flexGrow: 1, width: '60%' }}
                />
            </View>
            <View style={tw`flex-1 flex-row items-center mb-1 justify-center`}>
                <Image source={imgLogo} style={tw`w-10 h-10`} />
                <Text style={tw`text-[${PRIMARY_COLOR}] ml-2 text-2xl font-bold`}>
                    TA Book Store
                </Text>
            </View>
            <Text style={tw`text-[${YELLOW_COLOR}] text-center text-lg mb-20`}>Loading...</Text>
        </View>
    )
}

export default Introduction