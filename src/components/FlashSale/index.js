import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { FLASHSALE_BG_COLOR } from '../../styles/color.global'
import FlashSaleItem from '../FLashSaleItem'
import CustomCountDown from '../CustomCountDown'

const FlashSale = ({ products }) => {

    return (
        <View style={[{ backgroundColor: FLASHSALE_BG_COLOR }, tw`pt-[10px]`]}>
            <CustomCountDown isDetail={false} />
            <FlatList
                horizontal={true}
                pagingEnabled
                keyExtractor={(p) => p._id}
                data={products}
                renderItem={({ item }) => <FlashSaleItem key={item._id} isSlide flashItem={item} />}
            />
        </View>
    )
}

export default FlashSale