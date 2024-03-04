import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import tw from "twrnc"
import { PRIMARY_COLOR } from '../../styles/color.global'
import IconFont from 'react-native-vector-icons/FontAwesome5'

// type: linear, primary, line
// size: large, small
const Button = ({ type = "primary", title, onPress, size = "large", icon }) => {

    const Button = type == "linear" ? LinearGradient : View

    return (
        <TouchableOpacity onPress={onPress}>
            <Button
                colors={['#FA7B05', '#FA7B05', '#FA7B05', '#FA4005']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.5, 0.7523, 1]}
                style={[
                    tw`w-full ${type === 'linear' ? "" : "border"} flex-row items-center rounded-[100px] ${size == "small" ? "px-[10px] py-[6px]" : "px-[40px] py-[12px]"}`,
                    { backgroundColor: `${type == 'primary' ? PRIMARY_COLOR : "#fff"}`, borderColor: PRIMARY_COLOR }]}
            >
                <Text
                    style={[tw`font-bold mr-[10px]`, { color: `${type == 'line' ? PRIMARY_COLOR : "#fff"}` }]}
                >
                    {title}
                </Text>
                {
                    icon &&
                    <IconFont
                        name={icon}
                        size={16}
                        color={`${type == 'line' ? PRIMARY_COLOR : "#fff"}`}
                    />
                }
            </Button >
        </TouchableOpacity>
    )
}

export default Button