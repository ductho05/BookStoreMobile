import { View, Text, Image, TextInput, Button } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import tw from 'twrnc'
import { Rating } from 'react-native-ratings'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { apiEvaluate, apiGetProductById } from '../../apis/product'
import { updateLoadComment } from '../../stores/dataSlice'
import Loading from '../../components/loaders/Loading'
import { BORDER_COLOR } from '../../styles/color.global'

const EvaluateProduct = ({ route, navigation }) => {
    const { id, orderId } = route.params || null
    const { token, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)
    const [product, setProduct] = React.useState()
    const [rate, setRate] = React.useState()
    const [content, setContent] = React.useState()

    const fetchProduct = async () => {
        const response = await apiGetProductById(id)
        if (response.status === 200) {
            setProduct(response.data.data)
        }
    }

    const onRatingFinish = (rate) => {
        setRate(rate)
    }

    const handleSend = async () => {
        const data = {
            product: id,
            user: user._id,
            comment: content,
            rate: rate,
            orderId: orderId
        }
        setLoading(true)
        const response = await apiEvaluate(token, data)
        if (response.status === 200) {
            dispatch(updateLoadComment())
            Toast.show({
                text1: 'Đánh giá sản phẩm thành công!',
                type: 'success'
            })
            navigation.goBack()
        } else {
            Toast.show({
                text1: response.message,
                type: 'error'
            })
        }
        setLoading(false)
    }

    React.useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <View style={tw`flex-1 bg-white`}>
            {loading && <Loading />}
            <Header title="Đánh giá" />
            <View style={tw`p-[10px]`}>
                <View style={tw`items-center`}>
                    {product && <Image
                        source={{ uri: product?.images }}
                        style={[tw`w-[150px] h-[150px]`, { objectFit: 'contain' }]}
                    />}
                    <Text style={tw`text-[#333] font-bold`}>{product?.title}</Text>
                </View>
                <View style={tw`mt-[20px]`}>
                    <Rating
                        startingValue={0}
                        ratingCount={5}
                        imageSize={40}
                        showRating
                        onFinishRating={onRatingFinish}
                    />
                </View>
                <View style={tw`mt-[20px]`}>
                    <TextInput
                        onChangeText={setContent}
                        multiline={true}
                        numberOfLines={10}
                        placeholder='Nhập nội dung đánh giá...'
                        style={[tw`border border-[${BORDER_COLOR}] rounded-[6px] px-[10px]`, { height: 150, textAlignVertical: 'top', }]}
                    />
                </View>
                <View style={tw`mt-[20px]`}>
                    <Button disabled={!rate || !content} title='Gửi' color="#1679AB" onPress={handleSend} />
                </View>
            </View>
        </View>
    )
}

export default EvaluateProduct