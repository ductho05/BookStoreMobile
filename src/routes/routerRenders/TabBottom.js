import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Text } from 'react-native';
import tw from 'twrnc'
import TabBottomRouters from '../routerConfigs/TabBottom.config';
import { PRIMARY_COLOR } from '../../styles/color.global';
import Cart from '../../screens/user/Cart';
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

// key: cart, notification
const TabBottom = () => {

    const { user } = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const [cartData, setCartData] = React.useState([])

    React.useEffect(() => {

        setCartData(cart[user._id])
    }, [cart])

    return (
        <Tab.Navigator
            initialRouterName="info"
            screenOptions={{ headerShown: false }}
        >
            {
                TabBottomRouters.map((tab, index) => {
                    const {
                        screen,
                        label,
                        tabIconLabel,
                        iconName,
                        badge
                    } = { ...tab }

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
                                    fontWeight: 'bold'
                                },
                                tabBarStyle: {
                                    height: 54,
                                    paddingBottom: 5
                                },

                                tabBarIcon: ({ focused, color, size }) => {
                                    return (
                                        <IconFontAwesome
                                            name={iconName}
                                            size={16}
                                            color={
                                                focused ? `${PRIMARY_COLOR}` : '#666'
                                            }
                                            solid
                                        />
                                    )
                                },
                                tabBarLabel: ({ focused }) => {
                                    return (
                                        <Text style={tw`${focused ? 'text-[#C92127]' : 'text-[#666]'}`}>
                                            {label}
                                        </Text>
                                    )
                                }
                            }}

                        />
                    )
                })
            }
            {
                cartData.length > 0
                    ?
                    <Tab.Screen
                        name='Cart'
                        component={Cart}
                        options={{
                            navigationOptions: {
                                headerShown: false,
                            },
                            tabBarLabelStyle: {
                                fontSize: 13,
                                fontWeight: 'bold'
                            },
                            tabBarStyle: {
                                height: 54,
                                paddingBottom: 5
                            },
                            tabBarBadge: `${cartData.length}`,

                            tabBarIcon: ({ focused, color, size }) => {
                                return (
                                    <IconFontAwesome
                                        name='cart-plus'
                                        size={16}
                                        color={
                                            focused ? `${PRIMARY_COLOR}` : '#666'
                                        }
                                        solid
                                    />
                                )
                            },
                            tabBarLabel: ({ focused }) => {
                                return (
                                    <Text style={tw`${focused ? 'text-[#C92127]' : 'text-[#666]'}`}>
                                        Giỏ hàng
                                    </Text>
                                )
                            }
                        }}

                    />
                    :
                    <Tab.Screen
                        name='Giỏ hàng'
                        component={Cart}
                        options={{
                            navigationOptions: {
                                headerShown: false,
                            },
                            tabBarLabelStyle: {
                                fontSize: 13,
                                fontWeight: 'bold'
                            },
                            tabBarStyle: {
                                height: 54,
                                paddingBottom: 5
                            },

                            tabBarIcon: ({ focused, color, size }) => {
                                return (
                                    <IconFontAwesome
                                        name='cart-plus'
                                        size={16}
                                        color={
                                            focused ? `${PRIMARY_COLOR}` : '#666'
                                        }
                                        solid
                                    />
                                )
                            },
                            tabBarLabel: ({ focused }) => {
                                return (
                                    <Text style={tw`${focused ? 'text-[#C92127]' : 'text-[#666]'}`}>
                                        Giỏ hàng
                                    </Text>
                                )
                            }
                        }}

                    />
            }
        </Tab.Navigator>
    )
}

export default TabBottom