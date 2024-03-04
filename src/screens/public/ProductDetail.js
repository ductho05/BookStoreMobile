import { View, StatusBar, TouchableOpacity, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { BORDER_COLOR, PRIMARY_COLOR, YELLOW_COLOR } from '../../styles/color.global'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'
import { apiGetProductByCategory, apiGetProductById, apiGetProductComment, apiGetProductRate } from '../../apis/product'
import { Rating } from 'react-native-ratings'
import numeral from 'numeral'
import { useSelector, useDispatch } from 'react-redux'
import ProductFrame from '../../components/ProductFrame/index'
import Skeleton from "@thevsstech/react-native-skeleton"
import ProductInfo from '../../components/ProductInfo/index'
import CommentInfo from '../../components/CommentInfo/index'
import AddProductToCartBar from '../../components/AddProductToCartBar/index'
import Toast from 'react-native-toast-message'
import { add } from '../../stores/cartSlice'

const ProductDetail = ({ route, navigation }) => {

    const useRef = React.useRef()
    const { productId } = route.params
    const { productsHots } = useSelector(state => state.data)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [product, setProduct] = React.useState()
    const [rate, setRate] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [productCategory, setProductCategory] = React.useState([])
    const [comments, setComments] = React.useState([])
    const [quantity, setQuantity] = React.useState(0)

    const handleGoBack = () => {

        navigation.goBack()
    }

    const handleToSearchProduct = () => {

        navigation.navigate("SearchProduct")
    }

    const handleToHome = () => {

        navigation.navigate("TabBottom")
    }

    const handleToCart = () => {

        navigation.navigate("Cart", { single: true })
    }

    const handleToTop = () => {
        useRef.current.scrollToOffset({ animated: true, offset: 0 })
    }

    const handleMinus = () => {

        setQuantity(prev => prev !== 0 ? prev - 1 : 0)
    }

    const handlePlus = () => {

        if (product?.quantity !== 0) {

            if (product?.quantity > quantity) {

                setQuantity(prev => prev + 1)
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'Số lượng sản phẩm trong kho không đủ!'
                })
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'Sản phẩm hiện đã hết hàng!'
            })
        }
    }

    const handleAddToCart = () => {

        if (quantity > 0) {
            if (product?.quantity !== 0) {

                if (product?.quantity > quantity) {

                    dispatch(add({
                        data: {
                            product,
                            quantity
                        },
                        userId: user?._id
                    }))
                    Toast.show({
                        type: 'success',
                        text1: 'Thêm vào giỏ hàng thành công!'
                    })
                } else {
                    Toast.show({
                        type: 'info',
                        text1: 'Số lượng sản phẩm trong kho không đủ!'
                    })
                }
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'Sản phẩm hiện đã hết hàng!'
                })
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'Vui lòng chọn số lượng sản phẩm!'
            })
        }
    }

    const fetchProduct = async (id) => {

        setLoading(true)
        const response = await apiGetProductById(id)

        if (response.status === 200) {

            setProduct(response.data.data)
        }
    }

    const fetchProductCategory = async (categoryId, categoryName) => {

        const response = await apiGetProductByCategory(categoryId)
        setLoading(false)

        if (response.status === 200) {

            setProductCategory([{
                title: categoryName,
                products: response.data.data
            }])
        }
    }

    const fetchRate = async (id) => {

        const response = await apiGetProductRate(id)

        if (response.status === 200) {

            setRate(response.data.data)
        }
    }

    const fetchCommentList = async (id) => {

        const response = await apiGetProductComment(id)

        if (response.status === 200) {

            setComments(response.data.data)
        }
    }

    React.useEffect(() => {

        handleToTop()
        fetchProduct(productId)
        fetchRate(productId)
        fetchCommentList(productId)
        setQuantity(0)
    }, [productId])

    React.useEffect(() => {

        fetchProductCategory(product?.categoryId?._id, product?.categoryId?.name)
    }, [product])

    return (
        <View style={tw`relative mb-[50px]`}>
            <View style={[tw`w-full px-[20px] flex-row h-[50px] items-center mt-[${StatusBar.currentHeight}px]`, { backgroundColor: PRIMARY_COLOR }]}>
                <TouchableOpacity style={tw`flex-1`} onPress={handleGoBack}>
                    <IconFontAwesome
                        name="arrow-left"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
                <View style={tw`flex-row items-center gap-[30px]`}>
                    <TouchableOpacity onPress={handleToSearchProduct}>
                        <IconFontAwesome
                            name="search"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToHome} >
                        <IconFontAwesome
                            name="home"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToCart}>
                        <IconFontAwesome
                            name="cart-plus"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                ref={useRef}
                keyExtractor={(item) => item}
                data={[0]}
                renderItem={() => (
                    <>
                        {
                            loading
                                ?
                                <Loading />
                                :
                                <View style={tw`w-full pb-[80px]`}>
                                    <View style={tw`bg-white py-[10px] px-[14%]`}>
                                        {
                                            product?.images &&
                                            <Image
                                                style={[tw`w-full h-[300px] bg-white`, styles.image]}
                                                source={{ uri: product?.images }}
                                            />
                                        }
                                    </View>
                                    <View style={tw`bg-white py-[10px] px-[16px]`}>
                                        <Text style={tw`text-[#333] text-[16px]`}>
                                            {product?.title}
                                        </Text>
                                        <View style={tw`items-center flex-row my-[6px]`}>
                                            <View style={tw`items-center flex-row flex-1`}>
                                                <Rating imageSize={15} startingValue={product?.rate} readonly />
                                                <Text style={tw`ml-[10px] pr-[10px] text-[${YELLOW_COLOR}] border-r border-[${BORDER_COLOR}]`}>
                                                    ({rate?.total} đánh giá)
                                                </Text>
                                                <Text style={tw`pl-[10px]`}>
                                                    Đã bán {product?.sold}
                                                </Text>
                                            </View>
                                            <TouchableOpacity style={tw`mr-[20px]`}>
                                                <IconFontAwesome
                                                    name="heart"
                                                    size={20}
                                                    color={YELLOW_COLOR}
                                                    solid={false}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={tw`items-center flex-row my-[6px]`}>
                                            <Text style={[tw`font-bold text-[20px]`, { color: PRIMARY_COLOR }]}>
                                                {numeral(product?.price).format('0,0')} đ
                                            </Text>
                                            <Text style={[tw`text-[14px] mx-[10px]`, { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>
                                                {numeral(product?.old_price).format('0,0')} đ
                                            </Text>
                                            <View style={[tw`ml-[6px] px-[6px] rounded-[4px]`, { backgroundColor: PRIMARY_COLOR }]}>
                                                <Text style={tw`text-white text-[14px]`}>
                                                    -{(((product?.old_price - product?.price) / product?.old_price).toFixed(2)) * 100} %
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={tw`rounded-[4px] flex-row items-center`}>
                                            <View style={[tw`flex-row mr-[10px] p-[4px] rounded-[6px]`, styles.status]}>
                                                <View style={tw`bg-[${PRIMARY_COLOR}] p-[4px] rounded-[50px]`}>
                                                    <IconFontAwesome
                                                        name={product?.quantity > 0 ? "check" : "ban"}
                                                        size={10}
                                                        solid
                                                        color={"#fff"}
                                                    />
                                                </View>
                                                <Text style={tw`text-[14px] ml-[4px] text-[${PRIMARY_COLOR}]`}>
                                                    {product?.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                                                </Text>
                                            </View>
                                            <Text style={tw`text-[14px]`}>
                                                {product?.quantity} sản phẩm có sẵn
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={tw`bg-white mt-[10px]`}>
                                        <Text style={tw`uppercase px-[10px] pt-[10px] text-[#333] font-bold`}>
                                            Sản phẩm liên quan
                                        </Text>
                                        <ProductFrame.ProductFrame productList={productCategory} isSlide />
                                    </View>
                                    <View style={tw`bg-white mt-[10px]`}>
                                        <Text style={tw`uppercase px-[10px] pt-[10px] text-[#333] font-bold`}>
                                            TA BOOKSTORE giới thiệu
                                        </Text>
                                        <ProductFrame.ProductFrame productList={productsHots} isSlide />
                                    </View>
                                    <View style={tw`bg-white mt-[10px]`}>
                                        <Text style={tw`uppercase px-[10px] pt-[10px] text-[#333] font-bold`}>
                                            Thông tin sản phẩm
                                        </Text>
                                        <ProductInfo product={product} />
                                    </View>
                                    <View style={tw`bg-white mt-[10px]`}>
                                        <Text style={tw`uppercase px-[10px] pt-[10px] text-[#333] font-bold`}>
                                            Khách hàng nhận xét ({rate?.total} đánh giá)
                                        </Text>
                                        <CommentInfo stattisticRate={rate} rate={product?.rate} comments={comments} />
                                    </View>
                                </View>
                        }
                    </>
                )}
            />
            <AddProductToCartBar quantity={quantity} minus={handleMinus} plus={handlePlus} addToCart={handleAddToCart} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        objectFit: 'contain'
    },

    status: {
        backgroundColor: "rgba(201, 33, 39, 0.1)"
    }
})

export const Loading = () => {

    return (
        <View style={tw`w-full`}>
            <View style={tw`bg-white py-[10px] px-[14%] items-center`}>
                <Skeleton>
                    <Skeleton.Item width={200} height={300} />
                </Skeleton>
            </View>
            <View style={tw`bg-white py-[10px] px-[16px]`}>
                <Skeleton>
                    <Skeleton.Item width={300} height={16} marginBottom={10} borderRadius={10} />
                    <Skeleton.Item width={300} height={16} marginBottom={10} borderRadius={10} />
                    <Skeleton.Item width={300} height={16} marginBottom={10} borderRadius={10} />
                </Skeleton>
            </View>
            <View style={tw`bg-white mt-[10px]`}>
                <Skeleton>
                    <Skeleton.Item width={300} height={16} marginTop={10} marginLeft={10} borderRadius={10} />
                </Skeleton>
                <ProductFrame.Loading />
            </View>
        </View>
    )
}

export default ProductDetail