import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import FontIcon from 'react-native-vector-icons/FontAwesome6'
import tw from 'twrnc'

function formatNumber(number) {
    if (number < 10) {
        // Nếu số nhỏ hơn 10, thêm số 0 phía trước và chuyển thành chuỗi
        return '0' + number;
    } else {
        // Nếu số lớn hơn hoặc bằng 10, giữ nguyên số và chuyển thành chuỗi
        return number.toString();
    }
}

const TimeItem = ({ time }) => {

    return <View style={tw`p-[10px] w-[50px] h-[50px] rounded-[6px] bg-[#FFA823] mx-[5px] items-center justify-center`}>
        <Text style={tw`text-[#000] text-[18px] font-bold`}>{time}</Text>
    </View>
}

const CustomCountDown = ({ isDetail }) => {
    const { loading } = useSelector(state => state.data)

    const moment = require('moment-timezone');

    // Đặt múi giờ cho Việt Nam
    const vietnamTimeZone = 'Asia/Ho_Chi_Minh';

    // Lấy thời gian hiện tại ở Việt Nam
    const currentTimeInVietnam = moment().tz(vietnamTimeZone);

    // Lấy số giờ hiện tại
    const currentHourInVietnam = currentTimeInVietnam.get('hours');
    const [countdown, setCountdown] = useState(null);
    const [h, setH] = useState(0)
    const [m, setM] = useState(0)
    const [s, setS] = useState(0)
    useEffect(() => {
        let countDownDate = null;
        countDownDate = new Date().setHours((Math.floor(currentHourInVietnam / 3) + 1) * 3, 0, 0);
        console.log('countDownDate', countDownDate);
        // new Date().setHours(17, new Date().getMinutes() + 1, 0);
        // Cập nhật đồng hồ đếm ngược mỗi 1 giây
        const x1 = setInterval(() => {
            // Lấy thời gian hiện tại
            const now = new Date().getTime();

            // Tính thời gian còn lại giữa thời gian hiện tại và thời gian kết thúc đếm ngược
            const distance = countDownDate - now;

            // Tính toán thời gian cho giờ, phút và giây
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Hiển thị đồng hồ đếm ngượ

            setH(formatNumber(hours))
            setM(formatNumber(minutes))
            setS(formatNumber(seconds))

            // Nếu đếm ngược kết thúc, dừng cập nhật
            if (distance < 0) {
                clearInterval(x1);
                reload && reload();
                setCountdown('ĐÃ KẾT THÚC');
            }
        }, 1000);

        // Clear interval khi component unmount
        return () => clearInterval(x1);
    }, [loading]);

    const styles = StyleSheet.create({
        bg: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: `${isDetail ? "#ff6c6b" : "#fff"}`
        }
    })

    return (
        <TouchableOpacity disable={isDetail} style={[tw`p-[10px] ${isDetail ? '' : 'mx-[5px] rounded-[10px]'} mb-[10px] flex-row items-center justify-between`, styles.bg]}>
            <View style={tw`flex-row items-center`}>
                <Image
                    source={require('../../assets/images/FlashSale.jpg')}
                    style={[tw`w-[100px] h-[50px] mr-[20px]`, { objectFit: 'cover' }]}
                />
                <View style={tw`flex-row items-center`}>
                    <TimeItem time={h} />
                    <TimeItem time={m} />
                    <TimeItem time={s} />
                </View>
            </View>
            {
                !isDetail &&
                <FontIcon name="angle-right" size={20} color="#333" />
            }
        </TouchableOpacity>
    )
}

export default CustomCountDown