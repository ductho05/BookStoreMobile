import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import RenderHtml from 'react-native-render-html'
import { BLUE_COLOR } from '../../styles/color.global'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

const ProductInfo = ({ product }) => {

    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    const html = product?.desciption.substring(0, 600)

    const handleToProductInfo = () => {

        navigation.navigate("ProductInfo", {
            product: product
        })
    }

    return (
        <View style={tw`p-[10px]`}>
            <View style={tw`flex-row gap-[40px] items-center pt-[20px]`}>
                <Text style={tw`text-[#333] w-[100px]`} >
                    Mã hàng
                </Text>
                <Text style={tw`text-[#333]`} >
                    {product?._id}
                </Text>
            </View>
            <View style={tw`flex-row gap-[40px] items-center pt-[20px]`}>
                <Text style={tw`text-[#333] w-[100px]`} >
                    Tác giả
                </Text>
                <Text style={tw`text-[#333]`} >
                    {product?.author}
                </Text>
            </View>
            <View style={tw`flex-row gap-[40px] items-center pt-[20px]`}>
                <Text style={tw`text-[#333] w-[100px]`} >
                    Ngày xuất bản
                </Text>
                <Text style={tw`text-[#333]`} >
                    {product?.published_date}
                </Text>
            </View>
            <View style={tw`flex-row gap-[40px] items-center pt-[20px]`}>
                <Text style={tw`text-[#333] w-[100px]`} >
                    Đã bán
                </Text>
                <Text style={tw`text-[#333]`} >
                    {product?.sold}
                </Text>
            </View>
            <View >
                <RenderHtml
                    contentWidth={width}
                    source={{ html: html + "..." || "" }}
                    renderersProps={{
                        img: {
                            enableExperimentalPercentWidth: true
                        }
                    }}
                    enableExperimentalMarginCollapsing={true}
                />
                <View style={tw`w-full flex-row justify-center`}>
                    <TouchableOpacity onPress={handleToProductInfo} style={tw`flex-row items-center`}>
                        <Text style={[{ color: BLUE_COLOR }, tw`font-bold mr-[4px]`]}>Xem thêm</Text>
                        <IconFont
                            name="angle-right"
                            size={16}
                            color={BLUE_COLOR}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductInfo