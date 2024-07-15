import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { PRIMARY_COLOR } from '../../styles/color.global'
import numeral from 'numeral'
import { useNavigation } from '@react-navigation/native'
import { LinearProgress } from '@rneui/themed';

const FlashSaleItem = ({ flashItem, isSlide }) => {

    const navigation = useNavigation()

    const handleToDetail = () => {

        navigation.navigate('ProductDetail', {
            productId: flashItem.product._id,
        })
    }

    return (
        <TouchableOpacity onPress={handleToDetail} style={[tw`p-[10px] z-1 bg-white  mb-[10px] mx-[5px] rounded-[6px] ${isSlide ? "w-[166px]" : "w-[47%]"}`]}>
            <View style={tw`w-full items-center`}>
                <Image
                    source={{ uri: flashItem.product.images }}
                    style={[tw`w-[100px] h-[150px]`, { objectFit: 'contain' }]}
                />
            </View>

            <Text
                numberOfLines={2}
                style={tw`mt-[10px] text-[#333]`}
            >
                {flashItem.product.title}
            </Text>
            <View style={tw`mt-[6px] flex-row`}>
                <Text style={[tw`font-bold`, { color: PRIMARY_COLOR }]}>
                    {numeral(flashItem.product.price).format('0,0')} đ
                </Text>
                <View style={[tw`ml-[6px] px-[6px] rounded-[4px]`, { backgroundColor: PRIMARY_COLOR }]}>
                    <Text style={tw`text-white text-[13px]`}>
                        -{flashItem.current_sale}%
                    </Text>
                </View>
            </View>
            <Text style={[tw`text-[12px]`, { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>
                {numeral(flashItem.product.old_price).format('0,0')} đ
            </Text>

            <View style={tw`mt-[10px]`}>
                <LinearProgress value={flashItem.sold_sale > 0 ? (flashItem.sold_sale / flashItem.num_sale.toFixed(1)) : 0} style={{ height: 10, borderRadius: 6 }} />
                <Text style={tw`text-[13px] font-bold`}>Đã bán {flashItem.sold_sale}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default FlashSaleItem