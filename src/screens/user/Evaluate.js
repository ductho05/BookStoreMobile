import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Header from '../../components/Header/index';
import CustomTab from '../../components/CustomTab';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment } from '../../stores/asyncAction';
import { Skeleton } from '@rneui/themed';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR } from '../../styles/color.global';
import { fetchEvaluate } from '../../stores/asyncActions';
import { formatToVND } from '../../helper/index'

const LoadingItem = (index) => {

    return (
        <View
            key={index}
            style={tw`pl-2 pr-2 py-1 bg-white border-b border-gray-100  flex flex-row`}>
            <View style={tw`flex-3 flex-row flex py-[10px] bg-[#eee] px-[7px]`}>
                <Skeleton
                    animation="pulse"
                    width={80}
                    height={80}
                    style={tw`bg-[#eee]`}
                    skeletonStyle={tw`bg-[#ddd]`}
                />

                <View style={tw`ml-[10px]`}>
                    <Skeleton
                        animation="pulse"
                        width={180}
                        height={20}
                        style={tw`mt-1.2 bg-[#eee] `}
                        skeletonStyle={tw`bg-[#ddd]`}
                    />

                    <Skeleton
                        animation="pulse"
                        width={180}
                        height={20}
                        style={tw`mt-1.2 bg-[#eee]`}
                        skeletonStyle={tw`bg-[#ddd]`}
                    />
                </View>
            </View>
        </View>
    )
}

const CommentedItem = ({ comment }) => {

    const navigation = useNavigation()

    const handleToProduct = () => {
        navigation.navigate("ProductDetail", {
            productId: comment.product._id,
            isGoToComment: true
        })
    }

    return (
        <View
            style={tw`pl-2 pr-2 py-1 bg-white border-b border-gray-100  flex flex-row`}>
            <View style={tw`flex-3 flex-row flex py-[10px] px-[7px]`}>
                <Image
                    source={{ uri: comment?.product?.images }}
                    style={[tw`w-[80px] h-[80px]`, { objectFit: 'contain' }]}
                />

                <View style={tw`ml-[10px] flex-1 items-start gap-[10px]`}>
                    <Text style={tw`text-[#333]`} numberOfLines={2}>{comment?.comment}</Text>
                    <Rating
                        imageSize={14}
                        reviews={[]}
                        readonly={true}
                        startingValue={comment.rate}
                    />
                    <Text onPress={handleToProduct} style={[tw`underline`, { color: PRIMARY_COLOR }]}>Chi tiết</Text>
                </View>
            </View>
        </View>
    )
}

const ProductItem = ({ item }) => {

    const navigation = useNavigation()

    const handleToProduct = () => {
        navigation.navigate("ProductDetail", {
            id: item.product._id,
            isGoToComment: false
        })
    }

    const handleToEvaluate = () => {
        navigation.navigate("EvaluateProduct", {
            id: item.product._id,
            orderId: item.orderId
        })
    }

    return (
        <TouchableOpacity onPress={handleToProduct}
            key={item.product._id}
            style={tw`px-2 py-1 bg-white border-b border-gray-100 flex flex-row`}>
            <Image
                source={
                    {
                        uri: item?.product?.images,
                    }
                }
                style={[tw`flex justify-center items-center flex-2 w-[95px] h-full`, { objectFit: 'contain' }]}
            />
            <View style={tw`flex-3 flex-col flex py-[10px] px-[7px] gap-[6px]`}>
                <View style={tw`flex-row justify-between items-start`}>
                    <Text
                        numberOfLines={2}
                        style={[
                            tw`text-[#333] flex-8 font-bold text-sm`,
                        ]}>
                        {item?.product?.title == null
                            ? '[Sản phẩm không còn tồn tại]'
                            : item?.product?.title}
                    </Text>
                </View>
                <View style={tw`flex flex-row items-center`}>
                    <Text style={[tw`text-sm font-bold `, { color: PRIMARY_COLOR }]}>
                        {item.product?.price == null
                            ? '[Trống]'
                            : formatToVND(item.product?.price)}
                    </Text>
                </View>

                <Button onPress={handleToEvaluate} title='Viết đánh giá' color="#1679AB" />
            </View>
        </TouchableOpacity>
    )
}

const ListCommented = () => {

    const { listCommented, loadingCommented } = useSelector(state => state.data)

    return (
        <>
            {
                loadingCommented
                    ?
                    (Array.from({ length: 6 }).map((_, index) => LoadingItem(index)))
                    :
                    <View style={tw`p-[10px]`}>
                        {
                            listCommented.length > 0
                                ?
                                <FlatList
                                    numColumns={1}
                                    keyExtractor={(item) => item._id}
                                    data={listCommented}
                                    renderItem={({ item }) => <CommentedItem comment={item} />}
                                />
                                :
                                <Text style={tw`text-[#333]`}>Bạn chưa đánh giá sản phẩm nào</Text>
                        }
                    </View>
            }
        </>
    )
}

const ListNotYetCommented = () => {

    const { loadingCommented, listNotYetComment } = useSelector(state => state.data)
    return (
        <>
            {
                loadingCommented
                    ?
                    (Array.from({ length: 6 }).map((_, index) => LoadingItem(index)))
                    :
                    <View style={tw`p-[10px]`}>
                        {
                            listNotYetComment.length > 0
                                ?
                                <FlatList
                                    numColumns={1}
                                    keyExtractor={(item) => item.orderId}
                                    data={listNotYetComment}
                                    renderItem={({ item }) => <ProductItem item={item} />}
                                />
                                :
                                <Text style={tw`text-[#333]`}>Không có sản phẩm nào cần đánh giá</Text>
                        }
                    </View>
            }
        </>
    )
}

const Evaluate = () => {

    const { token } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { loadingCommented, listCommented, listNotYetComment } = useSelector(state => state.data)
    console.log(Dimensions.get("window").width)

    React.useEffect(() => {

        if (loadingCommented) {
            dispatch(fetchEvaluate(token))
        }
    }, [loadingCommented])

    const data = [
        {
            title: `Sản phẩm cần đánh giá (${listNotYetComment.length})`,
            icon: 'create-outline',
            content: <ListNotYetCommented />
        },
        {
            title: `Sản phẩm đã đánh giá (${listCommented.length})`,
            icon: 'laptop-outline',
            content: <ListCommented />
        }
    ]

    return (
        <View style={tw`flex-1`}>
            <Header title="Đánh giá sản phẩm" />
            <CustomTab data={data} tabWidth={Dimensions.get("window").width / 2} />
        </View>
    );
};

export default Evaluate;
