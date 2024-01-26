import { View, Text, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import SearchBar from '../components/SearchBar/index'
import HomeHero from '../components/HomeHero/index'
import Swiper from 'react-native-swiper'
import { YELLOW_COLOR } from '../styles/color.global'
import Categories from '../components/Categories/index'
import ProductFrame from '../components/ProductFrame/index'

const Home = () => {

    const flatListRef = React.useRef()
    const { loading, productsHots, categoryBooks, slideList, learnBooks } = useSelector(state => state.data)
    const [scrollPosition, setScrollPosition] = React.useState(0)

    const handleScroll = (event) => {

        const { contentOffset } = event.nativeEvent
        const currentScrollPosition = contentOffset.y

        setScrollPosition(currentScrollPosition)
    }

    return (
        <View style={tw`mt-[${StatusBar.currentHeight}px]`}>
            {
                loading
                    ?
                    <HomeLoading />
                    :
                    <>
                        <SearchBar.SearchBar scrollPosition={scrollPosition} />

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
                                        <ProductFrame.ProductFrame title="Sản phẩm được quan tâm" productList={productsHots} />
                                        <ProductFrame.ProductFrame title="Danh mục nổi bật" productList={categoryBooks} isSlide={true} />
                                        <ProductFrame.ProductFrame title="Đồ dùng học tập" productList={learnBooks} />
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
        <>
            <SearchBar.Loading />

            <FlatList
                data={[1]}
                keyExtractor={(item) => item}
                renderItem={() => (
                    <>
                        <HomeHero.Loading />
                        <View>
                            <Categories.Loading />
                            <ProductFrame.Loading />
                            <ProductFrame.Loading />
                        </View>
                    </>
                )}
            />
        </>
    )
}

export default Home