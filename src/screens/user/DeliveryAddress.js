import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  PanResponder,
  Touchable,
} from 'react-native';
import React, {memo} from 'react';
import {useState, useEffect} from 'react';
import {Avatar, Icon, ListItem, Dialog, Skeleton, Rating} from '@rneui/themed';

import tw from 'twrnc';
import Header from '../../components/Header/index';
import SwipeToDeleteEditItem from '../../components/SwipeToDeleteEditItem/index';
import {PRIMARY_COLOR} from '../../styles/color.global';
import Button from '../../components/Button/index';
import {useSelector, useDispatch} from 'react-redux';

import {color} from '@rneui/themed/dist/config';
import {apiDeleteFavorites, apiGetFavoritesForMe} from '../../apis/data';
import {getFavorites} from '../../stores/dataSlice';
import CustomDialog from '../../components/CustomDialog';
import {getAddressDelivery} from '../../stores/otherSlice';
const DeliveryAddress = ({navigation}) => {
  const {user, token, isLoggedIn} = useSelector(state => state.user);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isdeleting, setIsdeleting] = useState(false);
  const {addressDelivery, orientation} = useSelector(state => state.other);
  const [deleteItem, setDeleteItem] = useState(null);

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // chờ 1s để hiển thị loading
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const icon = (name, size = 18, color = 'white', onPress) => {
    return (
      <Icon
        name={name}
        type="material"
        color={color}
        size={size}
        style={tw`mr-[5px]`}
        onPress={null}
      />
    );
  };

  const onDelete = item => {
    dispatch(
      getAddressDelivery(addressDelivery.filter(data => data.id != item.id)),
    );
  };

  const updateAddressDelivery = item => {
    // console.log('item12');
    dispatch(
      getAddressDelivery(
        addressDelivery.map(data => {
          return data.id == item.id
            ? {...data, selected: !data.selected}
            : {...data, selected: false};
        }),
      ),
    );
  };

  useEffect(() => {
    console.log('setDeleteItem', deleteItem);
    deleteItem &&
      dispatch(
        getAddressDelivery(
          addressDelivery.filter(data => data.id != deleteItem),
        ),
      );
  }, [deleteItem]);
  // screen khi da dang nhap
  const fameItem = (item, index) => {
    return (
      <View
        key={index}
        style={tw`flex-row justify-between items-center bg-white border-b border-[#f5f5f5]`}>
        <SwipeToDeleteEditItem
          index={index}
          onDelete={onDelete}
          updateAddressDelivery={updateAddressDelivery}
          addressDelivery={addressDelivery}
          func={setDeleteItem}
        />
      </View>
    );
  };

  console.log('addressDelivery2', addressDelivery.length, deleteItem);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Header title="Địa chỉ giao hàng" navigation={navigation} />
      </View>
      {isdeleting ? ( // Hiển thị ActivityIndicator khi đang tải
        <ActivityIndicator
          size="large"
          color={PRIMARY_COLOR}
          style={tw`absolute bg-white mt-[80px] top-0 bottom-0 left-0 right-0 opacity-50`}
        />
      ) : null}
      <View
        style={tw`flex-1 bg-[#f5f5f5] flex-${
          orientation == 'portrait' ? `col` : `row`
        } justify-center`}>
        <ScrollView
          style={tw`flex-10 flex bg-white flex-col `}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[PRIMARY_COLOR]}
            />
          }>
          <View style={tw`flex-1`}>
            {addressDelivery.length ? (
              addressDelivery.map((item, index) => {
                return fameItem(item, index);
              })
            ) : (
              <View style={tw`flex justify-center h-180 items-center`}>
                <Text style={tw`text-[#666] text-base`}>
                  Không có địa chỉ nhận hàng nào!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        {orientation == 'portrait' ? (
          <View
            style={tw`flex-1 flex-row justify-center mt-1 items-center bg-white`}>
            <Button
              title="Thêm địa chỉ"
              type="line"
              size="thin"
              icon={() => icon('add', 20, PRIMARY_COLOR)}
              onPress={() => navigation.navigate('AddDeliveryAddress')}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddDeliveryAddress')}
            style={tw`flex-1 flex-row justify-center bg-red-200 mt-0 items-center`}>
            <Icon
              name="add-circle-outline"
              type="ionicon"
              color={PRIMARY_COLOR}
              size={40}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DeliveryAddress;
