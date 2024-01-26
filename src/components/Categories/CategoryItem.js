import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const CategoryItem = ({ category }) => {
    return (
        <View style={tw`items-center mx-[10px]`}>
            <Image
                source={{ uri: category.image }}
                style={tw`w-[50px] h-[50px]`}
            />
            <Text style={tw`text-[13px] text-center mt-[10px] max-w-[100px]`}>
                {category.title}
            </Text>
        </View>
    )
}

export default CategoryItem