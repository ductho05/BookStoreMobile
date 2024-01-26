import { StyleSheet, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import tw from 'twrnc'

export default function Loading() {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <View style={tw`w-full h-[40%] items-center`}>
                <LottieView
                    source={require('../../assets/jsons/Loading.json')}
                    autoPlay={true}
                    loop
                    style={{ flexGrow: 1, width: '20%' }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
    }
})