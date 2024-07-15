import React, { memo, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { getAuthInstance } from '../../utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Icon, Skeleton, Rating, ListItem } from '@rneui/themed';
import tw from 'twrnc';
import { PRIMARY_COLOR } from '../../styles/color.global';
import Clipboard from '@react-native-clipboard/clipboard';
import { set } from 'react-hook-form';
import { apiGetAllOrderForMe } from '../../apis/data';
import { getAllMyOrder } from '../../stores/dataSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useMemo } from 'react';

const ItemFlatList = memo(({ item, index }) => {
  // console.log('day ne troi ', item, index);

  const navigation = useNavigation()

  const formatToVND = number => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(number);
  };

  const handleToOrderDetail = () => {
    navigation.navigate('OrderDetail', {
      orderId: item._id
    })
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
  // console.log('item1222 ', index);
  return (
    <TouchableOpacity
      onPress={handleToOrderDetail}
      key={index}
      style={tw`px-2 py-1 h-38 bg-white border-b border-gray-100 flex flex-row`}>
      <View style={tw`flex-3 flex-col flex py-[10px] px-[7px]`}>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[#333] flex-2 font-bold text-base`]}>
            STT {index + 1}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              tw`text-[#333] flex-8 font-bold text-base`,
              { height: 25, overflow: 'hidden' },
            ]}>
            Mã đơn:{' '}
            {item?._id == null ? '[Sản phẩm không còn tồn tại]' : item?._id}
          </Text>
          <TouchableOpacity style={tw`flex-col items-center flex-1`}>
            <Icon
              name={'copy-outline'}
              type="ionicon"
              color="gray"
              size={22}
              style={tw`mr-[1px]`}
              onPress={() => {
                ToastAndroid.show(
                  'Đã sao chép mã đơn hàng',
                  ToastAndroid.SHORT,
                );
                Clipboard.setString(item?._id);
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-[#666] text-sm`}>
          Người nhận: {!item?.name ? '[không có thông tin]' : item?.name}
        </Text>
        <Text style={tw`text-[#666] text-sm`}>
          Thời gian đặt:{' '}
          {item?.date == null ? '[không có thông tin]' : item?.date}
        </Text>
        <Text style={tw`text-[#666] text-sm`}>
          Số lượng:{' '}
          {item?.quantity == null ? '[không có thông tin]' : item?.quantity} sản
          phẩm
        </Text>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={[tw`text-[#666] text-xl `, { color: PRIMARY_COLOR }]}>
            Thành tiền:{' '}
            {!item?.price == null ? '[Trống]' : formatToVND(item?.price)}
          </Text>
          <TouchableOpacity
            disabled={true}
            style={[
              tw`flex-row w-32 items-center rounded h-10 justify-center`,
              {
                backgroundColor:
                  item?.status == 'CHOXACNHAN'
                    ? '#FFA500'
                    : item?.status == 'DANGGIAO'
                      ? '#FF4500'
                      : item?.status == 'HOANTHANH'
                        ? '#32CD32'
                        : '#FF0000',
              },
            ]}>
            {icon(
              (name =
                item?.status == 'CHOXACNHAN'
                  ? 'cube-outline'
                  : item?.status == 'DANGGIAO'
                    ? 'airplane-outline'
                    : item?.status == 'HOANTHANH'
                      ? 'checkmark-circle-outline'
                      : 'close-circle-outline'),
              (size = 20),
            )}
            <Text style={tw`text-white text-sm`}>
              {item?.status == 'CHOXACNHAN'
                ? 'Chờ xác nhận'
                : item?.status == 'DANGGIAO'
                  ? 'Đang giao'
                  : item?.status == 'HOANTHANH'
                    ? 'Hoàn thành'
                    : 'Đã hủy'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default ItemFlatList;
