import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { generateVoucherCode, get7DaysLater } from '../../helper';
import { apiCreateVoucher } from '../../apis/data';
import { apiUpdateUser } from '../../apis/user';
import { update } from '../../stores/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loaders/Loading';
import Toast from 'react-native-toast-message';

const TimelineItem = ({ title, description, onPress, achieved, index }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center w-full my-2`}>
      <View
        style={tw`w-7 h-7 rounded-full bg-${achieved ? 'green' : 'gray'
          }-400 shadow-lg mr-2`}
      />
      <View style={tw`flex-1 border-b border-gray-100 pb-2`}>
        <Text style={tw`font-bold mb-1 text-[#333]`}>{title}</Text>
        <Text style={tw`text-[#333]`}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Timeline = ({ point, setLoading }) => {
  const timelineData = [
    {
      title: 'Mốc 10 điểm',
      description: 'Phiếu giảm giá 20% đơn hàng bất kỳ',
      achieved: point >= 10 ? true : false,
    },
    {
      title: 'Mốc 100 điểm',
      description: 'Phiếu giảm giá 50% đơn hàng bất kỳ',
      achieved: point >= 100 ? true : false,
    },
    {
      title: 'Mốc 1000 điểm',
      description: 'Phiếu giảm giá 80% đơn hàng bất kỳ',
      achieved: point >= 1000 ? true : false,
    },
  ];

  const { user, token } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleGetVoucher = async (index) => {
    const voucherCode = generateVoucherCode()
    const voucher = {
      code: voucherCode,
      discount: index === 0 ? 20 : index === 1 ? 50 : 80,
      user: user._id,
      expried: get7DaysLater()
    }

    setLoading(true)
    const response = await apiCreateVoucher(voucher)
    if (response.status === 200) {
      const value = index === 0 ? 10 : index === 1 ? 100 : 1000
      const calPoint = user.point - value
      const formData = new FormData()
      formData.append('point', calPoint)
      const res = await apiUpdateUser(formData, user._id, token)
      if (res.status === 200) {
        Toast.show({ type: 'success', text1: 'Bạn đã nhận được voucher mới!' })
        dispatch(update(res.data.data))
      }
    }
    setLoading(false)
  }

  return (
    <View style={tw`flex-1`}>

      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          description={item.description}
          achieved={item.achieved}
          onPress={() => handleGetVoucher(index)}
        />
      ))}
    </View>
  );
};

export default Timeline;
