import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { BORDER_COLOR, PRIMARY_COLOR } from '../../styles/color.global'
import numeral from 'numeral'

const ProductItem = ({ product, isSlide }) => {

    return (
        <View style={[tw`p-[10px] border mb-[10px] mx-[5px] rounded-[6px] ${isSlide ? "w-[166px]" : "w-[47%]"}`, { borderColor: BORDER_COLOR }]}>
            <View style={tw`w-full items-center`}>
                <Image
                    source={{ uri: product.images }}
                    style={[tw`w-[100px] h-[150px]`, { objectFit: 'contain' }]}
                />
            </View>

            <Text
                numberOfLines={2}
                style={tw`mt-[10px] text-[#333]`}
            >
                {product.title}
            </Text>
            <View style={tw`mt-[6px] flex-row`}>
                <Text style={[tw`font-bold`, { color: PRIMARY_COLOR }]}>
                    {numeral(product.price).format('0,0')} đ
                </Text>
                <View style={[tw`ml-[6px] px-[6px] rounded-[4px]`, { backgroundColor: PRIMARY_COLOR }]}>
                    <Text style={tw`text-white text-[13px]`}>
                        -{(product.old_price / product.price).toFixed(0)} %
                    </Text>
                </View>
            </View>
            <Text style={[tw`text-[12px]`, { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>
                {numeral(product.old_price).format('0,0')} đ
            </Text>
            <View style={tw`flex-row items-center justify-end`}>
                <Text style={[tw`text-[12px]`]}>
                    Đã bán:
                </Text>
                <Text style={tw`text-[12px] font-bold ml-[4px]`}>
                    {product.sold}
                </Text>
            </View>
        </View>
    )
}

export default ProductItem