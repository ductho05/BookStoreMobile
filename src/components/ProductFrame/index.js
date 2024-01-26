import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { BORDER_COLOR, PINK_COLOR, YELLOW_COLOR } from '../../styles/color.global'
import ProductItem from '../ProductItem/index'
import Button from '../Button/index'
import Skeleton from "@thevsstech/react-native-skeleton"

const RenderSlideList = (products) => {

    return (
        <FlatList
            horizontal={true}
            pagingEnabled
            keyExtractor={(p) => p._id}
            data={products}
            renderItem={({ item }) => <ProductItem isSlide product={item} />}
        />
    )
}

const RenderGridList = (products) => {

    return (
        <FlatList
            numColumns={2}
            keyExtractor={(p) => p._id}
            data={products}
            renderItem={({ item }) => <ProductItem product={item} />}
        />
    )
}

const ProductFrame = ({ isSlide, productList, title }) => {

    return (
        <View style={tw`mt-[10px] rounded-[12px] bg-white pb-[20px]`}>
            <View style={[tw`flex-row items-center p-[10px]`, { backgroundColor: PINK_COLOR }]}>
                <Image style={tw`w-[20px] h-[20px]`} source={require('../../assets/images/icons/ico_dealhot.png')} />
                <Text style={tw`ml-[6px] font-bold`}>
                    {title}
                </Text>
            </View>
            <View style={[tw`p-[10px] flex-row border-b`, { borderColor: BORDER_COLOR }]}>
                {
                    productList.map((category) => (
                        <TouchableOpacity key={category.title}>
                            <View style={[tw`px-[10px] rounded-[6px] py-[4px] border`, { borderColor: YELLOW_COLOR, width: 'max-content' }]}>
                                <Text style={[tw``, { color: YELLOW_COLOR }]}>
                                    {category.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
                <View></View>
            </View>
            <View style={tw`py-[10px]`}>
                <FlatList
                    data={productList}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <View>
                            {
                                isSlide ? RenderSlideList(item.products) : RenderGridList(item.products)
                            }
                        </View>
                    )}
                />
            </View>
            <View style={tw`mx-[35%]`}>
                <Button title="Xem thêm" type="line" size="small" />
            </View>
        </View>
    )
}

const Loading = () => {

    return (
        <View style={tw`mt-[10px] rounded-[12px] bg-white pb-[20px]`}>
            <View style={tw`flex-row items-center p-[10px]`}>
                <Skeleton>
                    <Skeleton.Item flexDirection="row" alignItems="center">
                        <Skeleton.Item width={25} height={25} borderRadius={100} />
                        <Skeleton.Item width={200} height={16} marginLeft={10} />
                    </Skeleton.Item>
                </Skeleton>
            </View>
            <View style={[tw`p-[10px] flex-row border-b`, { borderColor: BORDER_COLOR }]}>
                <Skeleton>
                    <Skeleton.Item width={100} height={40} borderRadius={12} />
                </Skeleton>
                <View></View>
            </View>
            <View style={tw`py-[10px]`}>
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    renderItem={() => (
                        <Skeleton>
                            <Skeleton.Item
                                width={168}
                                height={250}
                                borderRadius={6}
                                marginLeft={5}
                                marginBottom={10}
                                marginRight={5}
                            />
                        </Skeleton>
                    )}
                />
            </View>
            <View style={tw`mx-[35%]`}>
                <Skeleton>
                    <Skeleton.Item
                        width={100}
                        height={40}
                        borderRadius={100}
                    />
                </Skeleton>
            </View>
        </View>
    )
}

export default { ProductFrame, Loading }
