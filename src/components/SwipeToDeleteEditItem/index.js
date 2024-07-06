import React, { useState, useMemo, useEffect, memo, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Touchable,
  TouchableNativeFeedback,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import { PRIMARY_COLOR } from '../../styles/color.global';
import { Icon } from '@rneui/themed';
import { getAddressDelivery } from '../../stores/otherSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomDialog from '../CustomDialog/index';

const SwipeToDeleteEditItem = memo(
  ({ index, updateAddressDelivery, addressDelivery, func }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [panX, setPanX] = useState(0);
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponderCapture: () => true,
          onPanResponderMove: (_, gestureState) => {
            const { dx } = gestureState;
            setPanX(dx);
            Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(
              _,
              gestureState,
            );
          },
          onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx < -100) {
              handleEdit();
            } else if (gestureState.dx > 100) {
              handleDelete();
            } else {
              resetPosition();
            }
          },
        }),
      [addressDelivery],
    );

    const resetPosition = () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        // duration: 400, // Thời gian để di chuyển mục

        useNativeDriver: false,
      }).start();

      // tăng/giảm độ sáng của thanh XÓA
      pan.addListener(value => {
        setPanX(value.x);
      });
    };

    const handleDelete = () => {
      Animated.timing(pan, {
        toValue: { x: Dimensions.get('window').width, y: 0 },
        duration: 400, // Thời gian để di chuyển mục
        useNativeDriver: false,
      }).start(() => {
        resetPosition();
        func(addressDelivery[index].id);
      });
      pan.addListener(value => {
        setPanX(value.x);
      });
    };

    const handleEdit = () => {
      Animated.timing(pan, {
        toValue: { x: -Dimensions.get('window').width, y: 0 },
        duration: 400, // Thời gian để di chuyển mục
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate('AddAddress', {
          address: addressDelivery[index],
        });
        resetPosition();
      });
    };

    const toggleDialog = () => {
      setVisible(!visible);
    };

    return (
      <View style={tw`flex-1 flex-row`}>
        <CustomDialog
          visible={visible}
          title="Xác nhận"
          toggleDialog={toggleDialog}
          text="Bạn muốn đặt làm địa chỉ mặc định?"
          actions={[
            {
              text: 'Hủy',
              onPress: () => {
                toggleDialog();
              },
            },
            {
              text: 'Đồng ý',
              onPress: () => {
                updateAddressDelivery(addressDelivery[index]);
                toggleDialog();
              },
            },
          ]}
        />
        {panX < 0 ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              height: '100%',
              flex: 1,
              backgroundColor: `rgb(${255 + panX * 0.7}, ${255 + panX * 0.7
                }, 255)`,
            }}>
            <Text style={tw`text-white text-8 mr-2`}>Sửa</Text>
            <Icon
              style={tw`text-white mr-8`}
              name="create-outline"
              type="ionicon"
              size={30}
              color="white"
            />
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              flex: 1,
              backgroundColor: `rgb(255, ${255 - panX * 0.8}, ${255 - panX * 0.8
                })`,
            }}>
            <Icon
              style={tw`text-white ml-6`}
              name="trash-outline"
              type="ionicon"
              size={30}
              color="white"
            />
            <Text style={tw`text-white text-8 ml-2`}>Xóa</Text>
          </View>
        )}
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }],
          }}
          {...panResponder.panHandlers}>
          <TouchableOpacity
            // chỉnh độ opacity khi click vào item
            onPress={
              addressDelivery[index].selected
                ? null
                : () => {
                  setVisible(true);
                }
            }
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <View style={tw`px-2 py-1 border-b border-gray-200 flex flex-row`}>
              <View style={tw`flex-3 flex-col flex py-[10px] px-[7px]`}>
                <View style={tw`flex-row justify-between items-center mb-3`}>
                  <View
                    style={tw`flex-3 flex-col flex justify-center items-start`}>
                    <Text
                      numberOfLines={2}
                      style={[tw`text-[#333] flex-8 font-bold text-base`]}>
                      Mã địa chỉ:{' '}
                      {addressDelivery[index]?.id == null
                        ? 'Không có thông tin '
                        : addressDelivery[index]?.id}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[tw`text-[#333] flex-8 font-bold text-5.5`]}>
                      {addressDelivery[index]?.name == null
                        ? 'Không có thông tin '
                        : addressDelivery[index]?.name}
                    </Text>
                  </View>
                  {addressDelivery[index].selected && (
                    <Text
                      style={tw`text-[${PRIMARY_COLOR}] w-20 text-sm border border-[${PRIMARY_COLOR}] rounded-[5] py-1 px-2 text-center`}>
                      Mặc định
                    </Text>
                  )}
                </View>
                <Text style={tw`text-[#666] text-sm`}>
                  SĐT:{' '}
                  {addressDelivery[index].phone == null
                    ? '[Không có thông tin]'
                    : '(+84) ' + addressDelivery[index].phone.slice(1)}
                </Text>

                <Text style={tw`text-[#666] text-sm`}>
                  Địa chỉ:{' '}
                  {`${addressDelivery[index].street}, ${addressDelivery[index].ward}, ${addressDelivery[index].district}, ${addressDelivery[index].province}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  },
);

export default SwipeToDeleteEditItem;
