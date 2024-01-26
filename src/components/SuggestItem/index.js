import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const SuggestItem = ({ product }) => {
    return (
        <View style={tw`py-[16px] items-center flex-row border-b border-[#C8C2C2]`}>
            <Image
                source={{ uri: product.images }}
                style={[tw`w-[50px] h-[50px]`, { objectFit: 'contain' }]}
            />
            <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={tw`ml-[10px] text-[#333] flex-1`}
            >
                {product.title}
            </Text>
        </View>
    )
}

export default SuggestItem