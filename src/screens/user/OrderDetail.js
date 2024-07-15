import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@rneui/themed'
import { formatDate, formatPaymentMethod, formatToVND } from '../../helper/index'
import { appPath, cancelOrderImage, orderImages, STATUS } from '../../constants/index'
// import { updateLoaded } from '../../stores/orderSlice'
import Toast from 'react-native-toast-message'

import { BORDER_COLOR, PRIMARY_COLOR } from '../../styles/color.global'
import Loading from '../../components/loaders/Loading'
import { apiGetOrderbyId, apiGetOrderItembyOrder, apiupdateOrder } from '../../apis/user'
import { getCancelMyOrder, getCompleteMyOrder, getConfirmMyOrder, getDeliveryMyOrder, setReloadOrder } from '../../stores/dataSlice'
import { apiGetStatusOrderForMe, apiSendNotification } from '../../apis/data'

const Item = ({ item, border = true }) => {

    return (
        <View style={tw`flex-row py-[10px] ${border ? `border-b border-[${BORDER_COLOR}]` : ''}`}>
            <Image
                source={{ uri: item?.product?.images }}
                style={[tw`w-[100px] h-[100px]`, { objectFit: 'contain' }]}
            />
            <View style={tw`flex-1 ml-[10px]`}>
                <Text numberOfLines={2} style={tw`text-[#333] font-bold`}>{item?.product?.title}</Text>
                <View style={tw`flex-row flex-1 items-center justify-between`}>
                    <Text style={{ color: PRIMARY_COLOR }}>{formatToVND(item?.product.price)}</Text>
                    <Text>x{item?.quantity}</Text>
                </View>
            </View>
        </View>
    )
}

const OrderDetail = ({ route, navigation }) => {

    const { orderId, isOrderSuccess } = route.params || null
    const { token, user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [order, setOrder] = React.useState()
    const [orderItems, setOrderItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const fetchOrder = async () => {

        const response = await apiGetOrderbyId(token, orderId)
        if (response.status === 200) {
            setOrder(response.data.data)
        }
    }

    const fetchOrderItems = async () => {

        const response = await apiGetOrderItembyOrder(token, orderId)
        if (response.status === 200) {
            setOrderItems(response.data.data)
        }
    }

    const reloadData = async () => {
        const confirmMyOrder = await apiGetStatusOrderForMe('01' + '0' + token + user?._id)
        const deliveryMyOrder = await apiGetStatusOrderForMe('01' + '1' + token + user?._id)
        const completeMyOrder = await apiGetStatusOrderForMe('01' + '2' + token + user?._id)
        const cancelMyOrder = await apiGetStatusOrderForMe('01' + '3' + token + user?._id)

        dispatch(getConfirmMyOrder(confirmMyOrder.data.data))
        dispatch(getDeliveryMyOrder(deliveryMyOrder.data.data))
        dispatch(getCompleteMyOrder(completeMyOrder.data.data))
        dispatch(getCancelMyOrder(cancelMyOrder.data.data))
    }

    const icon = (name, size = 18, color = 'white', onPress) => {
        return (
            <Icon
                name={name}
                type="ionicon"
                color={color}
                size={size}
                style={tw`mr-[5px]`}
                onPress={null}
            />
        );
    };

    const reBuyOrder = async () => {
        setLoading(true)
        const response = await apiupdateOrder(token, orderId, { status: STATUS.CHOXACNHAN })

        if (response.status === 200) {
            const filter = 'admin'
            const notification = {
                title: 'Thông báo đơn hàng',
                description: `Khách hàng ${user.fullName} vừa mua lại đơn hàng mã ${orderId}`,
                image: orderImages,
                url: `${appPath}/account/order/detail/${orderId}`,
                user: user._id,
                largeImage: orderItems[0].product.images,
                linking: 'null'
            }
            await apiSendNotification(token, {
                filter: filter,
                notification: notification
            })

            await reloadData()
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Mua lại đơn hàng thành công!'
            })
            setTimeout(() => {
                navigation.goBack()
            }, 1000)
        } else {
            Toast.show({
                text1: 'Lỗi khi mua đơn hàng',
                type: 'error'
            })
        }
    }

    const onCancel = async () => {

        setLoading(true)
        const response = await apiupdateOrder(token, orderId, { status: STATUS.DAHUY })

        if (response.status === 200) {

            const filter = 'admin'
            const notification = {
                title: 'Thông báo đơn hàng',
                description: `Khách hàng ${user.fullName} vừa hủy đơn hàng mã ${orderId}`,
                image: cancelOrderImage,
                url: `${appPath}/account/order/detail/${orderId}`,
                user: user._id,
                largeImage: orderItems[0].product.images,
                linking: 'null'
            }
            await apiSendNotification(token, {
                filter: filter,
                notification: notification
            })
            await reloadData()
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Hủy đơn hàng thành công!'
            })
            setTimeout(() => {
                navigation.goBack()
            }, 1000)
        } else {
            Toast.show({
                text1: 'Lỗi khi hủy đơn hàng',
                type: 'error'
            })
        }
    }

    const handleToChooseAddress = () => {

        Alert.alert('Thông báo', "Xác nhận mua lại đơn hàng", [
            {
                text: 'OK',
                onPress: reBuyOrder
            },
            {
                text: 'Hủy',
                onPress: () => { }
            }
        ])
    }

    const handleCancelOrder = () => {
        Alert.alert('Thông báo', "Xác nhận hủy đơn hàng", [
            {
                text: 'OK',
                onPress: onCancel
            },
            {
                text: 'Hủy',
                onPress: () => { }
            }
        ])
    }

    React.useEffect(() => {

        if (orderId) {
            fetchOrder()
            fetchOrderItems()
        }
    }, [orderId])


    return (
        <View style={tw`flex-1 relative`}>
            {
                loading && <Loading />
            }
            <Header navigation={navigation} title="Chi tiết đơn hàng" isOrderSuccess={isOrderSuccess} />
            <ScrollView style={tw`flex-1`}>
                <View style={tw`px-[20px] py-[10px] bg-white`}>
                    <View style={tw`flex-row justify-start items-center`}>
                        <Icon
                            name="location-outline"
                            type="ionicon"
                            color="gray"
                            size={20}
                        />
                        <Text style={tw`pr-[10px] font-bold text-[#333] border-r border-[${BORDER_COLOR}]`}>
                            {order?.name}
                        </Text>
                        <Text style={tw`font-bold text-[#333] pl-[10px]`}>
                            {order?.phone}
                        </Text>
                    </View>
                    <Text style={tw`mt-[6px] text-[#333]`}>{`${order?.address}, ${order?.wards}, ${order?.districs}, ${order?.city}`}</Text>
                </View>
                <View style={tw`px-[20px] py-[10px] bg-white mt-[10px]`}>
                    {
                        orderItems.map((item, index) =>
                            <Item key={index} border={index + 1 !== orderItems?.length} item={item} />
                        )
                    }
                </View>
                <View style={tw`px-[20px] py-[10px] bg-white mt-[10px]`}>
                    <Text style={tw`font-bold text-[#333]`}>Tổng quan đơn hàng</Text>
                    <View style={tw`flex-row py-[6px] justify-between`}>
                        <Text style={tw`text-[#333]`}>Phí vận chuyển</Text>
                        <Text style={tw`text-[#333]`}>{formatToVND(order?.shippingCost)}</Text>
                    </View>
                    <View style={tw`flex-row py-[6px] justify-between`}>
                        <Text style={tw`font-bold text-[#333]`}>Tổng</Text>
                        <Text style={tw`font-bold text-[#333]`}>{formatToVND(order?.price)}</Text>
                    </View>
                </View>
                <View style={tw`px-[20px] py-[10px] bg-white mt-[10px] pb-[100px]`}>
                    <Text style={tw`font-bold text-[#333]`}>Chi tiết đơn hàng</Text>
                    <View style={tw`flex-row py-[6px] justify-between`}>
                        <Text style={tw`text-[#333]`}>Mã đơn hàng</Text>
                        <Text style={tw`text-[#333]`}>{order?._id}</Text>
                    </View>
                    <View style={tw`flex-row py-[6px] justify-between`}>
                        <Text style={tw`text-[#333]`}>Ngày đặt hàng</Text>
                        <Text style={tw`text-[#333]`}>{order?.createdAt}</Text>
                    </View>
                    <View style={tw`flex-row py-[6px] justify-between`}>
                        <Text style={tw`text-[#333]`}>Phương thức thanh toán</Text>
                        <Text style={tw`w-[200px] text-right text-[#333]`}>{order?.payment_method}</Text>
                    </View>
                    <View style={tw`flex-row py-[6px] justify-between`}>
                        <Text style={tw`text-[#333]`}>Phương thức vận chuyển</Text>
                        <Text style={tw`text-[#333]`}>{order?.shipping_method}</Text>
                    </View>
                    <View style={tw`flex-row py-[6px] justify-between items-center`}>
                        <Text style={tw`text-[#333]`}>Trạng thái</Text>
                        <View
                            disabled={true}
                            style={[
                                tw`flex-row w-36 items-center rounded h-10 justify-center`,
                                {
                                    backgroundColor:
                                        order?.status == 'CHOXACNHAN'
                                            ? '#FFA500'
                                            : order?.status == 'DANGGIAO'
                                                ? '#FF4500'
                                                : order?.status == 'HOANTHANH'
                                                    ? '#32CD32'
                                                    : '#FF0000',
                                },
                            ]}>
                            {icon(
                                (name =
                                    order?.status == 'CHOXACNHAN'
                                        ? 'cube-outline'
                                        : order?.status == 'DANGGIAO'
                                            ? 'airplane-outline'
                                            : order?.status == 'HOANTHANH'
                                                ? 'checkmark-circle-outline'
                                                : 'close-circle-outline'),
                                (size = 20),
                            )}
                            <Text style={tw`text-white text-sm`}>
                                {order?.status == 'CHOXACNHAN'
                                    ? 'Chờ xác nhận'
                                    : order?.status == 'DANGGIAO'
                                        ? 'Đang giao'
                                        : order?.status == 'HOANTHANH'
                                            ? 'Hoàn thành'
                                            : 'Đã hủy'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={tw`absolute bottom-0 left-0 right-0 p-[20px] bg-white flex-row gap-[20px]`}>
                <TouchableOpacity
                    onPress={handleToChooseAddress}
                    disabled={order?.status !== STATUS.HOANTHANH && order?.status !== STATUS.DAHUY}
                    style={tw`border flex-1 items-center border-[${BORDER_COLOR}] rounded-[4px] px-[20px] py-[10px] ${order?.status !== STATUS.HOANTHANH && order?.status !== STATUS.DAHUY ? "bg-[#ddd] opacity-50" : "bg-white"}`}
                >
                    <Text style={tw`text-[#333]`}>Mua lại đơn hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCancelOrder}
                    disabled={order?.status !== STATUS.CHOXACNHAN}
                    style={tw`border flex-1 items-center border-[${BORDER_COLOR}] rounded-[4px] px-[20px] py-[10px] ${order?.status !== STATUS.CHOXACNHAN ? `bg-[#ddd] opacity-50` : "bg-white"}`}
                >
                    <Text style={tw`text-[#333]`}>Hủy đơn hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: '#ddd',
        opacity: '0.5'
    }
})

export default OrderDetail