import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import SearchInput from '../components/SearchInput/index'
import tw from "twrnc"
import { PRIMARY_COLOR } from '../styles/color.global'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import SuggestItem from '../components/SuggestItem/index'

const SearchProduct = ({ navigation }) => {

    const { keywords, suggestionProducts } = useSelector(state => state.product)

    const handleBackToHome = () => {

        navigation.goBack()
    }

    return (
        <View style={tw`mt-[${StatusBar.currentHeight}px]`}>
            <View style={[tw`pt-[20px] pb-[10px] px-[20px] flex-row items-center gap-[20px]`, { backgroundColor: PRIMARY_COLOR }]}>
                <TouchableOpacity onPress={handleBackToHome}>
                    <IconFontAwesome
                        name='angle-left'
                        size={26}
                        color="#fff"
                    />
                </TouchableOpacity>
                <SearchInput isSearch />
            </View>
            <View style={tw`px-[20px]`}>
                {
                    keywords
                        ?
                        <View style={tw`pt-[20px]`}>
                            <View style={tw`flex-row items-center`}>
                                <Text style={tw`text-[16px] font-bold flex-1 text-[#333]`}>Gợi ý</Text>

                            </View>
                            {
                                suggestionProducts.length > 0
                                    ?
                                    <FlatList
                                        data={suggestionProducts}
                                        renderItem={({ item }) => (
                                            <SuggestItem product={item} />
                                        )}
                                        keyExtractor={item => item._id}
                                    />
                                    :
                                    <Text style={tw`mt-[10px]`}>Không tìm thấy kết quả phù hợp</Text>
                            }
                        </View>
                        :
                        <View style={tw`pt-[20px]`}>
                            <View style={tw`flex-row items-center`}>
                                <Text style={tw`text-[16px] font-bold flex-1 text-[#333]`}>Tìm kiếm gần đây</Text>
                                <IconFontAwesome
                                    name="trash"
                                    size={20}
                                    color="#999"
                                />
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`flex-row items-center mt-[20px]`}>
                                <Text style={tw`text-[16px] font-bold flex-1 text-[#333]`}>Đề xuất cho bạn</Text>
                                <View style={tw`flex-row gap-[10px]`}>
                                    <Text>Thay đổi</Text>
                                    <IconFontAwesome
                                        name="retweet"
                                        size={20}
                                        color="#999"
                                    />
                                </View>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                            <View style={tw`py-[14px] border-b border-[#C8C2C2]`}>
                                <Text style={tw`text-[#333]`}>
                                    Không diệt không sinh xin đừng sợ hãi
                                </Text>
                            </View>
                        </View>
                }
            </View>
        </View>
    )
}

export default SearchProduct