import { View, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import tw from 'twrnc'
import HomeHero from '../../components/HomeHero/index'
import Swiper from 'react-native-swiper'
import { YELLOW_COLOR } from '../../styles/color.global'
import Categories from '../../components/Categories/index'
import ProductFrame from '../../components/ProductFrame/index'
import { listPathCategory, listPathHots, listPathLearn } from '../../constants/index'
import { apiGetProductCategory, apiGetProductHots } from '../../apis/data'
import { getLearnBooks, getProductCategory, getProductHots } from '../../stores/dataSlice'
import SearchBar from '../../components/SearchBar/index'
import ScrollToTop from '../../components/ScrollToTop/index'
import notifee from '@notifee/react-native';
import Button from '../../components/Button'
import { useNotification } from '../../hooks/useNotification'
import { useLinkTo } from '@react-navigation/native'
import FlashSale from '../../components/FlashSale'

const Home = ({ navigation }) => {

    const linkTo = useLinkTo()
    const flatListRef = React.useRef()
    const { loading, productsHots, categoryBooks, slideList, learnBooks, productFlashSales } = useSelector(state => state.data)
    const [scrollPosition, setScrollPosition] = React.useState(0)
    const [productSaleHome, setProductSaleHome] = React.useState([])
    const dispatch = useDispatch()
    const { displayNotification } = useNotification()

    const fetchData = async () => {

        listPathHots.forEach(async (item, index) => {

            if (index !== 0) {
                const response = await apiGetProductHots(item.path)

                if (response.status === 200) {
                    dispatch(getProductHots({
                        title: item.title,
                        products: response.data.data
                    }))
                }
            }
        })

        listPathCategory.forEach(async (item, index) => {

            if (index !== 0) {
                const response = await apiGetProductCategory(item.path)

                if (response.status === 200) {
                    dispatch(getProductCategory({
                        title: item.title,
                        products: response.data.data
                    }))
                }
            }
        })

        listPathLearn.forEach(async (item, index) => {

            if (index !== 0) {

                const response = await apiGetProductCategory(item.path)

                if (response.status === 200) {
                    dispatch(getLearnBooks({
                        title: item.title,
                        products: response.data.data
                    }))
                }
            }
        })
    }

    React.useEffect(() => {

        if (!loading) {
            fetchData()
        }
    }, [loading])

    const handleScroll = (event) => {

        const { contentOffset } = event.nativeEvent
        const currentScrollPosition = contentOffset.y

        setScrollPosition(currentScrollPosition)
    }

    const handleToProduct = () => {
        navigation.navigate("Product", { keywords: null, categoryId: null })
    }

    return (
        <View style={tw`mt-[${StatusBar.currentHeight}px]`}>
            {
                loading
                    ?
                    <HomeLoading />
                    :
                    <>
                        <SearchBar.SearchBar navigation={navigation} scrollPosition={scrollPosition} />

                        <FlatList
                            ref={flatListRef}
                            onScroll={handleScroll}
                            data={[1]}
                            keyExtractor={(item) => item}
                            renderItem={() => (
                                <>
                                    <Swiper
                                        loop
                                        autoplay
                                        height={270}
                                        activeDotColor={YELLOW_COLOR}
                                    >
                                        {
                                            slideList.map(slide => (
                                                <HomeHero.HomeHero key={slide._id} slide={slide} />
                                            ))
                                        }
                                    </Swiper>
                                    <View >
                                        <Categories.Categories />
                                        {
                                            productFlashSales.length > 0 &&
                                            <FlashSale products={productFlashSales} />
                                        }
                                        <ProductFrame.ProductFrame
                                            title="Sản phẩm được quan tâm"
                                            productList={productsHots}
                                            onPress={handleToProduct}
                                        />
                                        <ProductFrame.ProductFrame
                                            title="Danh mục nổi bật"
                                            productList={categoryBooks}
                                            isSlide={true}
                                            onPress={handleToProduct}
                                        />
                                        <ProductFrame.ProductFrame
                                            title="Đồ dùng học tập"
                                            productList={learnBooks}
                                            onPress={handleToProduct}
                                        />
                                    </View>
                                </>
                            )}
                        />
                    </>
            }
        </View>
    )
}

const HomeLoading = () => {

    return (
        <View style={tw`items-center justify-center`}>
            <SearchBar.Loading />

            <FlatList
                data={[1]}
                keyExtractor={(item) => item}
                renderItem={() => (
                    <>
                        <HomeHero.Loading />
                        <View style={tw`justify-center`}>
                            <Categories.Loading />
                            <ProductFrame.Loading />
                            <ProductFrame.Loading />
                        </View>
                    </>
                )}
            />
        </View>
    )
}

export default Home