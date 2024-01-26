import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'

const SearchInput = () => {
    return (
        <View style={tw`flex-row bg-white w-[80%] px-[10px] py-[8px] rounded-[6px] border border-[#999]`}>
            <IconFontAwesome
                name="search"
                size={18}
                color="#999"
            />
            <Text style={tw`text-[#999] ml-[10px]`}>Nhập để tìm kiếm...</Text>
        </View>
    )
}

export default SearchInput