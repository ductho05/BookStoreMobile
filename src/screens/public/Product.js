import { View, Text, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR } from '../../styles/color.global'
import SearchInput from '../../components/SearchInput/index'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import tw from 'twrnc'
import { apiGetProduct } from '../../apis/product'
import ProductItem from '../../components/ProductItem/index'
import Skeleton from "@thevsstech/react-native-skeleton"

const Product = ({ navigation, route }) => {

    const [products, setProducts] = React.useState([])
    const { keywords } = route.params
    const [loadingContinue, setLoadingContinue] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [loading, setLoading] = React.useState(false)

    const handleBackToHome = () => {

        navigation.navigate("TabBottom")
    }

    const handleToSearch = () => {

        navigation.navigate("SearchProduct")
    }

    const fetchProduct = async (keywords) => {

        if (currentPage === 1) {
            setLoading(true)
        }
        const response = await apiGetProduct({
            title: keywords,
            page: currentPage,
            perPage: 10
        })
        setLoading(false)
        setLoadingContinue(false)

        if (response.status == 200) {

            setProducts(prev => {

                return [...prev, ...response.data.data.products]
            })
        }
    }

    React.useEffect(() => {

        fetchProduct(keywords)
    }, [keywords, currentPage])

    const handleEndReached = () => {

        setLoadingContinue(true)
        setCurrentPage(prev => prev += 1)
    }

    return (
        <View style={tw`mt-[${StatusBar.currentHeight}px]`}>
            <View style={[tw`pt-[20px] pb-[10px] h-[66px] px-[20px] flex-row items-center gap-[20px]`, { backgroundColor: PRIMARY_COLOR }]}>
                <TouchableOpacity onPress={handleBackToHome}>
                    <IconFontAwesome
                        name='angle-left'
                        size={26}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-1`} onPress={handleToSearch}>
                    <SearchInput searchText={keywords} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={tw`flex-row justify-between py-[10px] px-[40px] mb-[10px] bg-white`}>
                    <View style={tw`relative`}>
                        <TouchableOpacity style={tw`flex-row items-center`}>
                            <Text style={tw`text-[#333] font-bold mr-[4px]`}>Sắp xếp</Text>
                            <IconFontAwesome
                                name='sort'
                                size={16}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <View style={[tw`p-[10px] bg-white z-10 absolute top-[20px] left-0 right-0`]}>
                            <Text>
                                Giá thấp nhất
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`flex-row items-center`}>
                        <Text style={tw`text-[#333] font-bold mr-[4px]`}>Lọc</Text>
                        <IconFontAwesome
                            name='filter'
                            size={16}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {
                    loading
                        ?
                        <Loading />
                        :
                        <FlatList
                            keyExtractor={(p) => p}
                            data={[1]}
                            renderItem={() => (
                                <View style={tw`pb-[260px] z-1`}>
                                    <FlatList
                                        numColumns={2}
                                        keyExtractor={(p, index) => index}
                                        data={products}
                                        renderItem={({ item }) => <ProductItem product={item} />}
                                        onEndReached={handleEndReached}
                                        onEndReachedThreshold={0}
                                    />
                                    {
                                        loadingContinue
                                            ?
                                            <ActivityIndicator size="large" color="#C92127" />
                                            :
                                            <Text></Text>
                                    }
                                </View>
                            )}
                        />
                }
            </View>
        </View>
    )
}

const Loading = () => {

    return (
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
    )
}

export default Product