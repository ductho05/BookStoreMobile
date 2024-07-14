import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { YELLOW_COLOR } from '../../styles/color.global'
import ProductItem from '../../components/ProductItem'
import { getContinueRecommendationProduct } from '../../stores/productSlice'
import { apigetRecommendProduct } from '../../apis/product'

const Suggest = () => {

    const dispatch = useDispatch()
    const { recommendationProducts } = useSelector(state => state.product)
    const { listTitle } = useSelector(state => state.other)
    const [loadingContinue, setLoadingContinue] = React.useState(false)
    const [titleIndex, setTitleIndex] = React.useState(0)

    const handleEndReached = () => {
        if (titleIndex < listTitle.length) {
            setTitleIndex(prev => prev += 1)
            setLoadingContinue(true)
        }
    }

    const fetchRecommendedProducts = async (title) => {
        const response = await apigetRecommendProduct(title)

        if (response.status === 200) {
            dispatch(getContinueRecommendationProduct(response.data.data))
        }
        setLoadingContinue(false)
    }

    React.useEffect(() => {

        if (titleIndex !== 0) {
            fetchRecommendedProducts(listTitle[titleIndex])
        }
    }, [titleIndex])

    React.useEffect(() => {

        if (titleIndex !== 0) {
            setTitleIndex(0)
        }

    }, [listTitle])

    return (
        <View style={tw`flex-1`}>
            {
                recommendationProducts.length > 0 &&
                <View style={tw`p-[10px]`}>
                    <View style={tw`mt-[40px] items-center justify-center p-[10px] border border-[${YELLOW_COLOR}] rounded-[6px] bg-white`}>
                        <Text style={tw`font-bold text-[#f7941e] text-center`}>
                            Sản phẩm gợi ý dành cho bạn
                        </Text>
                    </View>
                </View>
            }
            <FlatList
                style={tw`flex-1`}
                keyExtractor={(p) => p}
                data={[1]}
                renderItem={() => (
                    <View style={tw`flex-1`}>
                        {
                            recommendationProducts.length > 0
                                ?
                                <FlatList
                                    numColumns={2}
                                    keyExtractor={(p, index) => index}
                                    data={recommendationProducts}
                                    renderItem={({ item }) => <ProductItem product={item} />}
                                    onEndReached={handleEndReached}
                                    onEndReachedThreshold={0}
                                />
                                :
                                <View style={tw`flex-1 items-center justify-center h-[600px]`}>
                                    <View style={tw`items-center justify-center p-[10px] border border-[${YELLOW_COLOR}] rounded-[6px] bg-white`}>
                                        <Text style={tw`font-bold text-[#f7941e] text-center`}>Hãy tương tác với sản phẩm để xem gợi ý dành cho bạn nhé!</Text>
                                    </View>
                                </View>
                        }
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
        </View>
    )
}

export default Suggest