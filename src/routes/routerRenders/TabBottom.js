import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Text, Dimensions} from 'react-native';
import tw from 'twrnc';
import TabBottomRouters from '../routerConfigs/TabBottom.config';
import {PRIMARY_COLOR} from '../../styles/color.global';
import {useState, useEffect} from 'react';
// import {getAllMyOrder} from '../../stores/dataSlice';
import {useSelector, useDispatch} from 'react-redux';
const Tab = createBottomTabNavigator();

const TabBottom = ({navigation}) => {
  // Check hướng điện thoại
  const {orientation} = useSelector(state => state.other);
  // const {allMyOrder} = useSelector(state => state.data);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const onChange = ({window}) => {
  //     const {width, height} = window;
  //     setOrientation(width > height ? 'landscape' : 'portrait');
  //   };

  //   Dimensions.addEventListener('change', onChange);

  //   return () => {
  //     Dimensions.removeEventListener('change', onChange);
  //   };
  // }, []);

  // // Xóa bớt đơn hàng khi chuyển sang màn hình khác
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log('focus1', allMyOrder.length);
  //     dispatch(getAllMyOrder(allMyOrder.slice(0, 10)));
  //     console.log('focus2', allMyOrder.length);
  //   });

  //   return () => {
  //     // Hủy đăng ký lắng nghe khi component unmount
  //     unsubscribe();
  //   };
  // }, [navigation]);

  return (
    <Tab.Navigator
      initialRouterName="info"
      screenOptions={{headerShown: false}}>
      {TabBottomRouters.map((tab, index) => {
        const {screen, label, tabIconLabel, iconName} = {...tab};

        return (
          <Tab.Screen
            key={index}
            name={label}
            component={screen}
            options={{
              navigationOptions: {
                headerShown: false,
              },
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: 'bold',
              },
              tabBarStyle: {
                height: 54,
                paddingBottom: 5,
              },

              tabBarIcon: ({focused, color, size}) => {
                return (
                  <IconFontAwesome
                    name={iconName}
                    size={16}
                    color={focused ? `${PRIMARY_COLOR}` : '#666'}
                    solid
                  />
                );
              },
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={tw`${focused ? 'text-[#C92127]' : 'text-[#666]'} ${
                      orientation != 'portrait' ? `ml-3` : `ml-0`
                    }`}>
                    {label}
                  </Text>
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabBottom;
